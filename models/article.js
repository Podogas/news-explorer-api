const mongoose = require('mongoose');
const { isUrl } = require('../utils/validate.js');
const NotFoundErr = require('../errors/NotFoundErr.js');
const ForbiddenErr = require('../errors/ForbiddenErr.js');


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
    ref: 'user',
    required: true,
    select: false,
  },
})


articleSchema.statics.ownerArticleDeletion = function del (articleId, ownerId) {
  return (this.findById(articleId)
    .select('+owner')
    .then((article) => {
      if (!article) {
        throw new NotFoundErr('Статья не найдена')
      }
      if (article.owner.toString() !== ownerId) {
      throw new ForbiddenErr('Запрещено')
      }
      return article.remove();
    })
    .catch()
  );
};

module.exports = mongoose.model('article', articleSchema);

