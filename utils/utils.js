// eslint-disable-next-line max-classes-per-file
const jwt = require('jsonwebtoken');

const SECRET_KEY = 'dev_secret';

const httpStatus = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  INTERNAL_ERROR: 500,
};

const handleError = (err, res) => {
  switch (err.name) {
    case 'ValidationError':
    case 'CastError':
      return res.status(httpStatus.BAD_REQUEST).send({ message: 'Некорректные данные' });
    case 'NotFoundError':
      return res.status(httpStatus.NOT_FOUND).send({ message: 'Запрашиваемый ресурс не найден' });
    case 'AuthError':
      return res.status(httpStatus.UNAUTHORIZED).send({ message: 'Ошибка авторизации' });
    default:
      return res.status(httpStatus.INTERNAL_ERROR).send({ message: 'Ошибка сервера' });
  }
};

class NotFoundError extends Error {
  constructor() {
    super();
    this.name = 'NotFoundError';
  }
}

class AuthError extends Error {
  constructor() {
    super();
    this.name = 'AuthError';
  }
}

const generateToken = (payload) => jwt.sign(
  payload,
  SECRET_KEY,
  { expiresIn: '7d' },
);

module.exports = {
  httpStatus, NotFoundError, AuthError, handleError, generateToken, SECRET_KEY,
};
