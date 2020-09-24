const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
require('dotenv').config();

const authRoute = require('./routes/auth');
const userRoute = require('./routes/user');
const categoryRoutes = require('./routes/category');

//app
const app = express();

//db
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true
  })
  .then(() => console.log('database connected'))
  .catch(err => console.log('err', err));

//middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());

//routes middleware
app.use('/api', authRoute);
app.use('/api', userRoute);
app.use('/api', categoryRoutes);

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`listening on port ${port} and env ${process.env.JWT_SECRET}`);
});