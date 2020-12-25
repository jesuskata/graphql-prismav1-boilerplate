// Dependencies
import '@babel/polyfill/noConflict';
import 'cross-fetch/polyfill';
import bcrypt from 'bcryptjs';

export const userOne = {
  input: {
    name: 'Eloisa',
    email: 'eloisa@example.com',
    password: bcrypt.hashSync('P4ssw0rd!')
  },
  user: undefined,
  jwt: undefined
};

export const userTwo = {
  input: {
    name: 'Jesus',
    email: 'jesus@example.com',
    password: bcrypt.hashSync('P4ssw0rd!')
  },
  user: undefined,
  jwt: undefined
};
