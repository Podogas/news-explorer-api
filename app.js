require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');

const authRoutes = require('./routes/auth.js');
const userRoutes = require('./routes/users.js');
const articleRoutes = require('./routes/articles.js');
const NotFoundErr =require('./errors/NotFoundErr.js');
const auth = require('./middlewares/auth.js');

const app = express();


const { PORT = 3000 } = process.env;
mongoose.connect('mongodb://localhost:27017/news_explorer_db', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(bodyParser.json());

app.use('/', authRoutes);
app.use(auth);
app.use('/', userRoutes)
app.use('/', articleRoutes)
app.all('/*', () => {
  throw new NotFoundErr('Запрашиваемый ресурс не найден');
});

app.use(errors());
app.use((err, req, res, next) => {
  let { statusCode = 500, message } = err;
console.log( 'catch Err in central err controller')
  if(err.name === 'CastError') {
    statusCode = 400;
    message = 'Неверный ID'
  }
  res.status(statusCode).send({
    message: statusCode === 500 ? 'На сервере произошла ошибка' : message,
  });
  next();
});

app.listen(3000, () => {});
