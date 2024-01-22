const router = require('express').Router();
const userRouter = require('./users');
const cardRouter = require('./cards');
const { login, createUser } = require('../controllers/users');
const { NotFoundError } = require('../utils/utils');
const auth = require('../middlewares/auth');

router.post('/signin', login);
router.post('/signup', createUser);
router.use(auth);
router.use('/users', userRouter);
router.use('/cards', cardRouter);
router.use('*', (req, res, next) => next(new NotFoundError()));

module.exports = router;
