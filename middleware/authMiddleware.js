const jwt = require('jsonwebtoken');
const { secret } = require('./../config');

module.exports = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    next();
  }

  try {
    // const token = req.headers.authorization.split(' ')[1];
    const token = req.headers["auth_token"];

    console.log(req.headers);
    console.info(JSON.stringify(req.headers));



    if (!token) {
      return res.status(401).json({ message: 'Пользователь не авторизован' });
    }

    const decoderData = jwt.verify(token, secret);
    req.user = decoderData;
    next();
  } catch (e) {
    console.log(e);
    return res.status(401).json({ message: 'Пользователь не авторизован' });
  }
};
