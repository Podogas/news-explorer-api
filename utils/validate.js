const validator = require('validator');

const isEmail = (email) => validator.isEmail(email);

const isUrl = (url) => {
  const rexEx = /^https?:\/\/(www\.)?[-a-zA-Z0-9._~:/?#[\]@!$&'()*+,;=]*/;
  return rexEx.test(url);
};

module.exports = {
  isEmail,
  isUrl,
};
