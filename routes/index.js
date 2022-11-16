const indexRoutes = require('express').Router();
const authRoutes = require('./auth.js');
const userRoutes = require('./users.js');
const newsRoutes = require('./news.js');
const articleRoutes = require('./articles.js');
const auth = require('../middlewares/auth.js');

indexRoutes.use('/', newsRoutes);
indexRoutes.use('/', authRoutes);
indexRoutes.use(auth);
indexRoutes.use('/', userRoutes);
indexRoutes.use('/', articleRoutes);


module.exports = indexRoutes;
