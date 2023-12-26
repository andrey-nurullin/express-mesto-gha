const router = require('express').Router();
const userRouter = require('./users');
const cardRouter = require('./cards');
const { NotFoundError, handleError } = require('../utils/utils');

router.use('/users', userRouter);
router.use('/cards', cardRouter);
router.use('*', (req, res) => handleError(new NotFoundError(), res));

module.exports = router;
