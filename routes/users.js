const userRouter = require('express').Router();
const {
  getUsers, getUserById, createUser, updateUser,
} = require('../controllers/users');

userRouter.get('/:userId', getUserById);
userRouter.get('/', getUsers);

userRouter.post('/', createUser);

userRouter.patch('/me/avatar', updateUser);
userRouter.patch('/me', updateUser);

module.exports = userRouter;
