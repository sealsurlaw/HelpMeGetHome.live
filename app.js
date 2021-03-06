var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var updateRouter = require('./routes/update');
var voteRouter = require('./routes/vote');
var moveRouter = require('./routes/move');
var nameRouter = require('./routes/name');
var smsRouter = require('./routes/sms');
var message = require('./routes/message');
var ip = require('./routes/ip');

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
app.use('/name', nameRouter);
app.use('/sms', smsRouter);
app.use('/message', message);
app.use('/ip', ip);

module.exports = app;