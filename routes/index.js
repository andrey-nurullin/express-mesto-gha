const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const userRouter = require('./users');
const cardRouter = require('./cards');
const { login, createUser } = require('../controllers/users');
const { NotFoundError } = require('../utils/utils');
const auth = require('../middlewares/auth');

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
}), login);

router.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }).unknown(true),
}), createUser);

router.use(auth);

router.use('/users', userRouter);
router.use('/cards', cardRouter);
router.use('*', (req, res, next) => next(new NotFoundError()));

module.exports = router;
