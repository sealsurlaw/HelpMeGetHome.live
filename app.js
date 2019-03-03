var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var updateRouter = require('./routes/update');
var voteRouter = require('./routes/vote');
var moveRouter = require('./routes/move');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/update', updateRouter);
app.use('/vote', voteRouter);
app.use('/move', moveRouter);

module.exports = app;