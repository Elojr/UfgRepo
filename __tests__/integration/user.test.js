/* eslint-disable no-undef */
import request from 'supertest';

import app from '../../src/app';
import truncate from '../truncate';
import User from '../../src/app/models/User';

import {
  generateUser,
  generateUserWithAvatar,
  generateUserUpdate,
  generateEmailUpdate,
} from '../faker';

beforeEach(async () => {
  await truncate();
});

describe('UserController', () => {
  it("Should create an user and return it's id", async () => {
    const user = generateUser();
    const response = await request(app)
      .post('/users')
      .send(user)
      .expect(200);

    expect(response.body).toHaveProperty('id');
  });

  it('Should create an user with a small length password and return an error', async () => {
    const user = generateUser(7);

    const response = await request(app)
      .post('/users')
      .send(user)
      .expect(400);

    expect(response.body).toHaveProperty('error');
  });

  it('Denying the creation of a duplicated user', async () => {
    const user = generateUser();
    await request(app)
      .post('/users')
      .send(user)
      .expect(200);

    const response = await request(app)
      .post('/users')
      .send(user)
      .expect(400);

    expect(response.body).toHaveProperty('error');
  });

  it('Should not create an user linked to a nonexisting avatar', async () => {
    const user = generateUserWithAvatar();
    const response = await request(app)
      .post('/users')
      .send(user)
      .expect(400);

    expect(response.body).toEqual({ error: 'O avatar informado não existe.' });
  });

  it('Should not allow the creation of an admin user', async () => {
    const user = generateUser();
    const response = await request(app)
      .post('/users')
      .send({ ...user, is_admin: true })
      .expect(400);

    expect(response.body).toEqual({ error: 'Requisição inválida.' });
  });

  it('Should create an user an update it', async () => {
    const user = generateUser();
    const update = generateUserUpdate();
    await request(app)
      .post('/users')
      .send(user)
      .expect(200);

    const { email, password } = user;
    const { body } = await request(app)
      .post('/login')
      .send({ email, password })
      .expect(200);

    const response = await request(app)
      .put('/users')
      .set('Authorization', `Bearer ${body.token}`)
      .send(update)
      .expect(200);

    expect(response.body).toHaveProperty('id');
  });

  it('Should not allow updating email with missing or wrong password', async () => {
    const user = generateUser();
    let update = generateEmailUpdate('');
    await request(app)
      .post('/users')
      .send(user)
      .expect(200);

    const { email, password } = user;
    const { body } = await request(app)
      .post('/login')
      .send({ email, password })
      .expect(200);

    let response = await request(app)
      .put('/users')
      .set('Authorization', `Bearer ${body.token}`)
      .send(update)
      .expect(400);

    expect(response.body).toHaveProperty('error');

    update = generateEmailUpdate(`${password}a`);
    response = await request(app)
      .put('/users')
      .set('Authorization', `Bearer ${body.token}`)
      .send(update)
      .expect(401);

    expect(response.body).toEqual({ error: 'Senha incorreta.' });
  });

  it('An admin user should be able to delete an user', async () => {
    const user = generateUser();
    const userToDelete = generateUser();
    const { email, password } = user;
    await User.create({ ...user, is_admin: true });

    const { body } = await request(app)
      .post('/login')
      .send({ email, password })
      .expect(200);

    const responseToDelete = await request(app)
      .post('/users')
      .send(userToDelete)
      .expect(200);

    const { token } = body;

    const response = await request(app)
      .delete(`/users/${responseToDelete.body.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(response.body).toHaveProperty('id');
  });

  it('A non admin user should not be able to delete another user', async () => {
    const user = generateUser();
    const userToBeDeleted = generateUser();

    await request(app)
      .post('/users')
      .send(user)
      .expect(200);

    await request(app)
      .post('/users')
      .send(userToBeDeleted)
      .expect(200);

    const { email, password } = user;

    const { body } = await request(app)
      .post('/login')
      .send({ email, password })
      .expect(200);

    const { token } = body;
    const response = await request(app)
      .delete(`/users/${userToBeDeleted.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(403);

    expect(response.body).toHaveProperty('error');
  });
});
