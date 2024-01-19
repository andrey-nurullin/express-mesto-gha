const bcrypt = require('bcrypt');
const User = require('../models/user');
const { httpStatus, NotFoundError, handleError } = require('../utils/utils');

const SALT_ROUNDS = 10;

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => handleError(err, res));
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params.userId)
    .orFail(() => new NotFoundError())
    .then((user) => res.send(user))
    .catch((err) => handleError(err, res));
};

module.exports.createUser = (req, res) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  bcrypt.hash(password, SALT_ROUNDS)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    })
      .then((user) => res.status(httpStatus.CREATED).send(user))
      .catch((err) => handleError(err, res)))
    .catch((err) => handleError(err, res));
};

module.exports.updateUser = (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id }, req.body, { new: true, runValidators: true })
    .orFail(() => new NotFoundError())
    .then((user) => res.send(user))
    .catch((err) => handleError(err, res));
};
