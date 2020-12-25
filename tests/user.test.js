/* eslint-disable no-undef */
// Dependecies
import '@babel/polyfill/noConflict';
import 'cross-fetch/polyfill';
import jwt from 'jsonwebtoken';

// Prisma
import { prisma } from '../src/prisma';

// Operations
import {
  createUser, getProfile, getUsers, login
} from './utils/operations';

// Utils
import {
  userOne, userTwo
} from './utils';
import { getClient } from './utils/getClient';

const client = getClient();

beforeEach(async () => {
  // Delete test data
  await prisma.mutation.deleteManyUsers();

  // Create user one
  userOne.user = await prisma.mutation.createUser({
    data: userOne.input
  });
  userOne.jwt = await jwt.sign({ userId: userOne.user.id }, process.env.JWT_SECRET);

  // Create user two
  userTwo.user = await prisma.mutation.createUser({
    data: userTwo.input
  });
  userTwo.jwt = await jwt.sign({ userId: userTwo.user.id }, process.env.JWT_SECRET);
}, 30000);

test('Should create a new user', async () => {
  const variables = {
    data: {
      name: 'Aleisa',
      email: 'aleisa@example.com',
      password: 'P4ssw0rd!'
    }
  };

  const response = await client.mutate({
    mutation: createUser,
    variables
  });
  const userExists = await prisma.exists.User({
    id: response.data.createUser.user.id
  });
  expect(userExists).toBeTruthy();
});

test('Should expose public author profile', async () => {
  const response = await client.query({
    query: getUsers
  });
  expect(response.data.users.length).toBe(2);
  expect(response.data.users[0].email).toBe(null);
  expect(response.data.users[0].name).toBe('Eloisa');
});

test('Should not login with bad credentials', async () => {
  const variables = {
    data: {
      email: 'eloisa@example.com',
      password: 'BAD-P4ssw0rd!'
    }
  };

  await expect(
    client.mutate({
      mutation: login,
      variables
    })
  ).rejects.toThrow();
});

test('Should not signup user with invalid password', async () => {
  const variables = {
    data: {
      name: 'Jana',
      email: 'jana@example.com',
      password: '123'
    }
  };

  await expect(
    client.mutate({
      mutation: createUser,
      variables
    })
  ).rejects.toThrow();
});

test('Should fetch user profile', async () => {
  const newClient = getClient(userOne.jwt);

  const { data } = await newClient.query({ query: getProfile });

  expect(data.me.id).toBe(userOne.user.id);
  expect(data.me.name).toBe(userOne.user.name);
  expect(data.me.email).toBe(userOne.user.email);
});
