const authRoutes = require('express').Router();
const { celebrate, Joi } = require('celebrate');


const { login, createUser } = require('../controllers/users.js');
// надо понять где отлавливать ошибки joi
authRoutes.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().trim(true).required(),
  }),
}), login);

authRoutes.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().trim(true).required(),
    name: Joi.string().trim(true).min(2).max(30).required(),
  }),
}), createUser);

module.exports = authRoutes;