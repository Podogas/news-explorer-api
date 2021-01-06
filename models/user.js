const mongoose = require('mongoose');
const { isEmail } = require('../utils/validate.js');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    validate: [isEmail, 'Указан некорректный Email'],
    unique: true,
  },
  // принимать только хэш пароля
  password: {
    type: String,
    required: true,
    select: false,
  },
  // Преобразовывыть первую букву имени в апперкейс
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  }
})

module.exports = mongoose.model('user', userSchema);