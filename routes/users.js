const userRoutes = require('express').Router();
const { celebrate, Joi } = require('celebrate');


const { getUserInfo } = require('../controllers/users.js');
// надо понять где отлавливать ошибки joi
userRoutes.get('/users/me', getUserInfo);

module.exports = userRoutes;