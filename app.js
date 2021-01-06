require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();


const { PORT = 3000 } = process.env;
mongoose.connect('mongodb://localhost:27017/news_explorer_db', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.listen(3000, () => {});
