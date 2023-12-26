const CODE_INVALID_DATA = 400;
const CODE_NOT_FOUND = 404;
const CODE_INTERNAL_ERROR = 500;

module.exports.handleError = (err, res) => {
  switch (err.name) {
    case 'ValidationError':
      return res.status(CODE_INVALID_DATA).send({ message: 'Некорректные данные' });
    case 'CastError':
      return res.status(CODE_NOT_FOUND).send({ message: 'Запрашиваемый ресурс не найден' });
    default:
      return res.status(CODE_INTERNAL_ERROR).send({ message: 'Ошибка сервера' });
  }
};
