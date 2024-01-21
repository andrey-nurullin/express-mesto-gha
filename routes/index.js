const router = require('express').Router();
const userRouter = require('./users');
const cardRouter = require('./cards');
const { login, createUser } = require('../controllers/users');
const { NotFoundError, handleError } = require('../utils/utils');
const auth = require('../middlewares/auth');

router.post('/signin', login);
router.post('/signup', createUser);
router.use(auth);
router.use('/users', userRouter);
router.use('/cards', cardRouter);
router.use('*', (req, res) => handleError(new NotFoundError(), res));

module.exports = router;
