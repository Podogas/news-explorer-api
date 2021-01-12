const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { isEmail } = require('../utils/validate.js');
const NotFoundErr =require('../errors/NotFoundErr.js');

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
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  }
})

userSchema.statics.findUserByCredentials = function findUser(email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        throw new NotFoundErr('Пользователя с таким Email не найдено, или не верный пароль !user')

      }

      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          throw new NotFoundErr('Пользователя с таким Email не найдено, или не верный пароль !matched')
        }
        return user;
      });
    })
    .catch();
};

userSchema.methods.toJSON = function toJSON() {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

module.exports = mongoose.model('user', userSchema);