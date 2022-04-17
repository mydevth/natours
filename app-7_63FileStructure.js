const fs = require('fs');
const express = require('express');
const morgan = require('morgan');

//   import routes file
const tourRouter = require('./routes/tourRoutes63');    // no need .js
const userRouter = require('./routes/userRoutes63');    // no need .js

const app = express();

// 1) MIDDLEWARE
app.use(morgan('dev'));

// basic midleware (between request and response)
app.use(express.json());

// test create own Middleware for test excute order , default put it before route
app.use((req, res, next) => {
  console.log('Hello from the Middleware ❤');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  // req.kobTime = new Date().toISOString();     //test var
  next();
});

// 2) HANDERS  - MOVE TO FILE

// 3) ROUTES /MOUNT   - SOMEMOVE TO FILE
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

// 4) START THE SERVER

module.exports = app;

