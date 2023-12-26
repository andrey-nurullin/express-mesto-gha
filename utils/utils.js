const httpStatus = {
  CREATED: 201,
  BAD_REQUEST: 400,
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

module.exports = { httpStatus, NotFoundError, handleError };
