// Dependencies
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export const getUserId = (request, requiredAuth = true) => {
  const header = request.request
    ? request.request.headers.authorization
    : request.connection.context.Authorization;

  if (header) {
    const token = header.replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    return decoded.userId;
  }

  if (requiredAuth) {
    throw new Error('Authentication required');
  }

  return null;
};

export const generateToken = (userId) => jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7 days' });

export const hashPassword = (password) => {
  if (password.length < 8) {
    throw new Error('Password must be 8 characters or longer');
  }

  return bcrypt.hash(password, 10);
};

export const getFirstName = (fullName) => fullName.split(' ')[0];

export const isValidPassword = (password) => password.length >= 8 && !password.toLowerCase().includes('password');
