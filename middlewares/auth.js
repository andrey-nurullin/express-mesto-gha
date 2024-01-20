const jwt = require('jsonwebtoken');
const { httpStatus, SECRET_KEY } = require('../utils/utils');

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res
      .status(httpStatus.UNAUTHORIZED)
      .send({ message: 'Необходима авторизация' });
  }

  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, SECRET_KEY);
  } catch (err) {
    return res
      .status(httpStatus.UNAUTHORIZED)
      .send({ message: 'Необходима авторизация' });
  }
  req.user = payload;
  next();
};
