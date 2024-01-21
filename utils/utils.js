// eslint-disable-next-line max-classes-per-file
const jwt = require('jsonwebtoken');

const SECRET_KEY = 'dev_secret';

const httpStatus = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

const handleError = (err, res) => {
  switch (err.name) {
    case 'ValidationError':
    case 'CastError':
      return res.status(httpStatus.BAD_REQUEST).send({ message: 'Некорректные данные' });
    case 'NotFoundError':
      return res.status(httpStatus.NOT_FOUND).send({ message: 'Запрашиваемый ресурс не найден' });
    case 'ForbiddenError':
      return res.status(httpStatus.FORBIDDEN).send({ message: 'Недостаточно прав' });
    case 'AuthError':
      return res.status(httpStatus.UNAUTHORIZED).send({ message: 'Ошибка авторизации' });
    default:
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: 'Ошибка сервера' });
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

class ForbiddenError extends Error {
  constructor() {
    super();
    this.name = 'ForbiddenError';
  }
}

const generateToken = (payload) => jwt.sign(
  payload,
  SECRET_KEY,
  { expiresIn: '7d' },
);

module.exports = {
  httpStatus, NotFoundError, AuthError, ForbiddenError, handleError, generateToken, SECRET_KEY,
};
