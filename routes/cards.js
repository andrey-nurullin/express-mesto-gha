const cardRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');
const { URL_PATTERN } = require('../utils/utils');

cardRouter.get('/', getCards);

cardRouter.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    link: Joi.string().pattern(URL_PATTERN).required(),
  }),
}), createCard);

cardRouter.delete('/:cardId/likes', dislikeCard);
cardRouter.delete('/:cardId', deleteCard);

cardRouter.put('/:cardId/likes', likeCard);

module.exports = cardRouter;
