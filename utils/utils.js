module.exports.handleError = (err, res) => {
  switch (err.name) {
    case 'ValidationError':
      return res.status(400).send({ message: 'Некорректные данные' });
    case 'CastError':
      return res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
    default:
      return res.status(500).send({ message: 'Ошибка сервера' });
  }
};
