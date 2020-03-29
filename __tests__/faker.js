import faker from 'faker';

export function generateUser(passwordLength = 8, complete = false) {
  const password = faker.internet.password(passwordLength);
  const user = {
    name: faker.name.findName(),
    email: faker.internet.email(),
    password,
    passwordConfirm: password,
    course: faker.name.jobArea(),
    birthday: faker.date.past(),
  };

  if (complete) {
    user.description = faker.lorem.sentence(10);
  }

  return user;
}

export function generateUserWithAvatar(avatarId = 1) {
  const password = faker.internet.password(8);
  return {
    name: faker.name.findName(),
    email: faker.internet.email(),
    password,
    passwordConfirm: password,
    course: faker.name.findName(),
    birthday: faker.date.past(),
    avatar_id: avatarId,
  };
}

export function generateUserUpdate() {
  return {
    name: faker.name.findName(),
    birthday: faker.date.past(),
    course: faker.name.findName(),
  };
}

export function generateEmailUpdate(password) {
  return {
    email: faker.internet.email(),
    oldPassword: password,
  };
}
