const articleRoutes = require('express').Router();
const { celebrate, Joi } = require('celebrate');


const { getSavedArticles, postArticle, deleteSavedArticle } = require('../controllers/articles.js');

articleRoutes.get('/articles', getSavedArticles);

articleRoutes.post('/articles', celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required(),
    title: Joi.string().required(),
    text: Joi.string().required(),
    date: Joi.string().required(),
    source: Joi.string().required(),
    link: Joi.string().required(),
    image: Joi.string().required(),
    // id
    // если указывать здесь владельца, то он требует что бы в теле был владелец
    //owner: Joi.string().required().hex()
  }),
}), postArticle)

articleRoutes.delete('/articles/:_id', celebrate({
  params: Joi.object().keys({
    _id: Joi.string().alphanum().length(24),
  }),
}), deleteSavedArticle);


module.exports = articleRoutes;

