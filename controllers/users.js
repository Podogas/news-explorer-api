const User = require('../models/user.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { NODE_ENV, JWT_SECRET } = process.env;
const UnauthorizedErr =require('../errors/UnauthorizedErr.js');

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );
      res.send({ ...user.toJSON(), token });
    })
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const { email, password, name } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({
      email,
      password: hash,
      name
    }))
    .then((user) => res.send(user))
    .catch(next)
};

module.exports.getUserInfo = (req, res, next) => {
  User.findOne({_id:req.user._id})
  .then((user) => {
    res.send(
      {
        email: user.email,
        name: user.name
      }
    )
  })
  .catch(next)
}