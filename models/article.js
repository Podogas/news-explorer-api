const mongoose = require('mongoose');
const { isUrl } = require('../utils/validate.js');

const articleSchema = new mongoose.Schema({
  keyword: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
    validate: [isUrl, 'Указан некорректный URL'],
  },
  image: {
    type: String,
    required: true,
    validate: [isUrl, 'Указан некорректный URL'],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'article',
    required: true,
    select: false,
  },
})

module.exports = mongoose.model('article', articleSchema);

