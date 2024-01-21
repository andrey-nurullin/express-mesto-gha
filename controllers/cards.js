const Card = require('../models/card');
const {
  httpStatus, NotFoundError, handleError, ForbiddenError,
} = require('../utils/utils');

module.exports.getCards = (req, res) => Card.find({})
  .populate('likes')
  .then((cards) => res.send(cards))
  .catch((err) => handleError(err, res));

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(httpStatus.CREATED).send(card))
    .catch((err) => handleError(err, res));
};

module.exports.deleteCard = (req, res) => {
  const { cardId } = req.params;
  Card.findById(cardId)
    .orFail(() => new NotFoundError())
    .then((c) => {
      const ownerId = c.owner.toString();
      const isOwnCard = (req.user._id === ownerId);
      if (!isOwnCard) throw new ForbiddenError();
      Card.findByIdAndDelete(cardId)
        .orFail(() => new NotFoundError())
        .then(() => res.send({ message: 'Карточка удалена' }));
    })
    .catch((err) => handleError(err, res));
};

module.exports.likeCard = (req, res) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
  { new: true },
)
  .orFail(() => new NotFoundError())
  .populate('likes')
  .then((card) => res.send(card))
  .catch((err) => handleError(err, res));

module.exports.dislikeCard = (req, res) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } }, // убрать _id из массива
  { new: true },
)
  .orFail(() => new NotFoundError())
  .populate('likes')
  .then((card) => res.send(card))
  .catch((err) => handleError(err, res));
