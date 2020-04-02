/* eslint-disable no-undef */
import request from 'supertest';
import jwt from 'jsonwebtoken';

import app from '../../src/app';
import { generateUser, generateUserUpdate } from '../faker';

const secret = process.env.AUTH_SECRET;

describe('Login', () => {
  it('Should create an user and get a valid jwt token', async () => {
    const user = generateUser();
    await request(app)
      .post('/users')
      .send(user)
      .expect(200);

    const { email, password } = user;
    const response = await request(app)
      .post('/login')
      .send({ email, password })
      .expect(200);

    const { token } = response.body;
    expect(jwt.verify(token, secret)).toHaveProperty('id');
  });

  it('Should block non registered users', async () => {
    const { email, password } = generateUser();
    const response = await request(app)
      .post('/login')
      .send({ email, password })
      .expect(401);

    expect(response.body).toEqual({ error: 'Usuário não econtrado.' });
  });

  it('Should block login with wrong password', async () => {
    const user = generateUser();
    await request(app)
      .post('/users')
      .send(user)
      .expect(200);
    const { email, password } = user;

    const response = await request(app)
      .post('/login')
      .send({ email, password: `${password}a` })
      .expect(401);

    expect(response.body).toEqual({ error: 'Senha incorreta.' });
  });

  it('Should not access a blocked route with blank or invalid token.', async () => {
    const user = generateUser();
    const update = generateUserUpdate();

    await request(app)
      .post('/users')
      .send(user)
      .expect(200);

    let response = await request(app)
      .put('/users')
      .send(update)
      .expect(401);

    expect(response.body).toEqual({ error: 'Autenticação requerida.' });

    response = await request(app)
      .put('/users')
      .set('Authorization', 'Bearer someInvalidToken')
      .send(update)
      .expect(401);

    expect(response.body).toEqual({ error: 'Autenticação inválida.' });
  });
});
