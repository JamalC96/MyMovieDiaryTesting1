var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const diaries = require("./routes/diaries");
const users = require("./routes/users");

var app = express();

var bodyParser = require('body-parser');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//diary Methods
app.get('/diaries', diaries.findAll);
app.get('/diaries/votes', diaries.findTotalVotes);
app.get('/diaries/all', diaries.findTotalDiaries);
app.get('/diaries/:id', diaries.findOne);

app.get('/diaries/type/:type', diaries.findType);

app.get('/diaries/genre/:genre', diaries.findGenre);


app.post('/diaries/search', diaries.findFuzzy);
app.post('/diaries',diaries.addDiary);


app.put('/diaries/:id/vote', diaries.incrementUpvotes);

app.delete('/diaries/:id', diaries.deleteDiary);
app.delete('/diaries/genre/:genre', diaries.deleteGenre);


//user Methods
app.get('/users', users.findAllUsers);

app.get('/users/:id', users.findOneID);

app.get('/users/username/:username', users.findUsername);

app.post('/users',users.addUser); //Need fixing

app.put('/users/:id/vote', users.incrementPoints);

app.delete('/users/:id', users.deleteUser);

app.delete('/users/users/:username', users.deleteUsername);














app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;



