const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    validate: {
      validator: (v) => validator.isURL(v),
      message: (props) => `${props.value} is not a valid link`,
    },
    required: true,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
  },
  email: {
    type: String,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: (props) => `${props.value} is not a valid email`,
    },
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
}, {
  versionKey: false,
});

module.exports = mongoose.model('user', userSchema);
