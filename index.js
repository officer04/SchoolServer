const express = require('express');
const mongoose = require('mongoose');
const authRouter = require('./routes/authRouter');
const priceRouter = require('./routes/priceRouter');
const startCoursInfoRouter = require('./routes/startCoursInfoRouter');
const coursRouter = require('./routes/coursRouter');
const moduleRouter = require('./routes/ModuleRouter');
const lessonRoute = require('./routes/lessonRouter');
const userCoursRouter = require('./routes/userCoursRouter');

const cors = require('cors');
const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());

app.use(express.json());
app.use('/auth', authRouter);
app.use('/price', priceRouter);
app.use('/info', startCoursInfoRouter);
app.use('/cours', coursRouter);
app.use('/module', moduleRouter);
app.use('/lesson', lessonRoute);
app.use('/user', userCoursRouter);

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
