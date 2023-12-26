const CODE_INVALID_DATA = 400;
const CODE_NOT_FOUND = 404;
const CODE_INTERNAL_ERROR = 500;

const handleError = (err, res) => {
  switch (err.name) {
    case 'ValidationError':
    case 'CastError':
      return res.status(CODE_INVALID_DATA).send({ message: 'Некорректные данные' });
    case 'NotFoundError':
      return res.status(CODE_NOT_FOUND).send({ message: 'Запрашиваемый ресурс не найден' });
    default:
      return res.status(CODE_INTERNAL_ERROR).send({ message: 'Ошибка сервера' });
  }
};

class NotFoundError extends Error {
  constructor() {
    super();
    this.name = 'NotFoundError';
  }
}

module.exports = { NotFoundError, handleError };
