const Card = require('../models/card');
const { handleError } = require('../utils/utils');

module.exports.getCards = (req, res) => Card.find({})
  .populate('likes')
  .then(cards => res.send(cards))
  .catch(err => handleError(err, res));

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then(card => res.send(card))
    .catch(err => handleError(err, res));
};

module.exports.deleteCard = (req, res) => Card.deleteOne({ _id: req.params.cardId })
  .then(data => res.send({ message: 'Карточка удалена' }))
  .catch(err => handleError(err, res));

module.exports.likeCard = (req, res) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
  { new: true },
)
.populate('likes')
.then(card => res.send(card))
.catch(err => handleError(err, res));

module.exports.dislikeCard = (req, res) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } }, // убрать _id из массива
  { new: true },
)
.populate('likes')
.then(card => res.send(card))
.catch(err => handleError(err, res));