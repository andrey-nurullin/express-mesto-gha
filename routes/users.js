const userRouter = require('express').Router();
const {
  getUsers, getUserById, updateUser, getUserInfo,
} = require('../controllers/users');

userRouter.get('/me', getUserInfo);
userRouter.get('/:userId', getUserById);
userRouter.get('/', getUsers);
userRouter.patch('/me/avatar', updateUser);
userRouter.patch('/me', updateUser);

module.exports = userRouter;
