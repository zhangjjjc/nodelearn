var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var multer = require('multer');
var upload = multer();

var index = require('./routes/index');
var users = require('./routes/users');
var register = require('./routes/register');
var login = require('./routes/login');
var home = require('./routes/home');
var logout = require('./routes/logout');

var app = express();

//session初始化设置
app.use(session({
    secret: 'cookie_secret',
    cookie: {
      maxAge: 1000*60*3 //单位：ms
    },
    resave: true,
    saveUninitialized: true
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(multer({ dest: './uploads' }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/lib', express.static(path.join(__dirname, 'node_modules')));

app.use(function (req, res, next) {
    res.locals.user = req.session.user;
    var success = req.session.success;
    delete req.session.success;
    var err = req.session.error;
    delete req.session.error;
    res.locals.message = '';
    if (success){
        res.locals.message = '<div class="alert alert-success">' + success + '</div>';
    }
    if (err){
        res.locals.message = '<div class="alert alert-danger">' + err + '</div>';
    }
    next();
});

app.use('/', index);
app.use('/users', users);
app.use('/register', register);
app.use('/login', login);
app.use('/home', home);
app.use('/logout', logout);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
