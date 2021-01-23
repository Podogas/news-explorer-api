exports.reqErrors = {
  forbidden: {
    ARTICLE_MESSAGE: 'Нельзя удалить чужую статью',
  },
  notFound: {
    ARTICLE_MESSAGE: 'Статья не найдена',
    AUTH_MESSAGE: 'Пользователя с таким Email не найдено, или указан не верный пароль',
  },
  conflict: {
    MONGO_ERROR_CODE: 11000,
    REGISTRATION_MESSAGE: 'Пользователь с данным e-mail уже зарегистрирован',
  },
};

exports.authErrors = {
  unauthorized: {
    NOTOKEN_MESSAGE: 'Необходима авторизация',
  },
};

exports.validationErrors = {
  url: {
    LINK_MESSAGE: 'Указана не правильная ссылка на статью',
    IMAGE_MESSAGE: 'Указана не правильная ссылка на изображение',
  },
  email: {
    EMAIL_MESSAGE: 'Указан некорректный Email',
  },
};
