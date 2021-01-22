require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const helmet = require('helmet');

const errorHandler = require('./middlewares/errorHandler.js');

const limiter = require('./middlewares/limiter.js');
const indexRoutes = require('./routes/index.js');

const NotFoundErr = require('./errors/NotFoundErr.js');

const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();

const { PORT = 3000 } = process.env;
const { DB_ADRESS = 'mongodb://localhost:27017/news_explorer_db' } = process.env;

mongoose.connect(DB_ADRESS, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(limiter);
app.use(helmet());
app.use(requestLogger);
app.use(bodyParser.json());
app.use('/', indexRoutes);
app.all('/*', () => {
  throw new NotFoundErr('Запрашиваемый ресурс не найден');
});
app.use(errorLogger);
app.use(errors());

app.use(errorHandler);

app.listen(PORT, () => {});
