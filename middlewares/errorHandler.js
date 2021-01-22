module.exports = (err, req, res, next) => {
  let { statusCode = 500, message } = err;
  if (err.name === 'CastError') {
    statusCode = 400;
    message = 'Неверный ID';
  }
  res.status(statusCode).send({
    message: statusCode === 500 ? 'На сервере произошла ошибка' : message,
  });
  next();
};
