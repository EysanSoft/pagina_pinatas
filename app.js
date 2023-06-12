const createError = require('http-errors');
const express = require('express');

const passport = require('passport');
const PassportLocal = require('passport-local').Strategy;

const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const session = require('express-session');
const flash = require('connect-flash');

//comentar index router
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const loginRouter = require('./routes/login');
const pedidosRouter = require('./routes/pedidos');
const direccionesRouter = require('./routes/direcciones');
const pagosRouter = require('./routes/pagos');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser('webkey'));
app.use(express.static(path.join(__dirname, 'public')));

//Passport middleware
app.use(session({
  secret: 'webkey',
  resave: false,
  saveUninitialized: false
}));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

//Routers
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/pedidos', pedidosRouter);
app.use('/direcciones', direccionesRouter);
app.use('/pagos', pagosRouter);

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
