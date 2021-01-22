const jwt = require('jsonwebtoken');
const UnauthorizedErr = require('../errors/UnauthorizedErr.js');
const { authErrors } = require('../utils/errorMessages');

// Эту строчку заменить, ключ должен храниться в файле конфига
const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedErr(authErrors.unauthorized.NOTOKEN_MESSAGE);
  }

  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    throw new UnauthorizedErr(authErrors.unauthorized.NOTOKEN_MESSAGE);
  }
  req.user = payload;
  next();
};
