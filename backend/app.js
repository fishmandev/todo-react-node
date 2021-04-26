var express = require('express');
var logger = require('morgan');
var helmet = require('helmet');
var cors = require('cors');

var indexRouter = require('./routes/index');
let taskRouter = require('./routes/task');

var app = express();

app.use(express.json());
app.use(cors()); // Enable All CORS Requests
app.use(helmet());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/tasks', taskRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({'error':'Something broke'});
});

module.exports = app;
