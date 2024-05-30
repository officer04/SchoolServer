const express = require('express');
const mongoose = require('mongoose');
const authRouter = require('./routes/authRouter');
const priceRouter = require('./routes/priceRouter');
const startCoursInfoRouter = require('./routes/startCoursInfoRouter');
const coursRouter = require('./routes/coursRouter');
const moduleRouter = require('./routes/ModuleRouter');
const lessonRoute = require('./routes/lessonRouter');
const userCoursRouter = require('./routes/userCoursRouter');

// const cors = require('cors');
const PORT = process.env.PORT || 5000;

const app = express();

const allowedOrigins = [
  'http://myreactapp.test-handyhost.ru',
  'http://egor-ermakov.ru',
  'http://www.egor-ermakov.ru',
  'http://localhost:3000'
];

// Настройка CORS для нескольких доменов
// const corsOptions = {
//   origin: allowedOrigins
// };

// app.use(cors(corsOptions));

app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://myreactapp.test-handyhost.ru");
  // res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.use(express.json());
app.use('/auth', authRouter);
app.use('/price', priceRouter);
app.use('/info', startCoursInfoRouter);
app.use('/cours', coursRouter);
app.use('/module', moduleRouter);
app.use('/lesson', lessonRoute);
app.use('/user', userCoursRouter);
app.get('/hello', (req, res) => {
  var ip = req.headers['x-forwarded-for'];
  console.log(`Request from ${ip}`);
  return res.send('Hello!');
});

const start = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://admin:admin@todo.abddczc.mongodb.net/?retryWrites=true&w=majority`,
    );
    app.listen(PORT, () => console.log(`server started on port ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};


start();
