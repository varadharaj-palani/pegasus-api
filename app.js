var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var tableRouter = require('./routes/createTables');
var authRouter = require('./routes/auth');
var addAccountRouter = require('./routes/addAccount');
var accountRouter = require('./routes/account');
var accountListRouter = require('./routes/accountList');
var profileRouter = require('./routes/profile');
var savAccountRouter = require('./routes/savAccount');
var instaPayRouter = require('./routes/instaPay');
var beneficiaryRouter = require('./routes/beneficiary');
var addBeneficiaryRouter = require('./routes/addBeneficiary');

var app = express();
app.use(cors());




// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/create-alla-tables', tableRouter);
app.use('/auth',authRouter);
app.use('/addAccount',addAccountRouter);
app.use('/account',accountRouter);
app.use('/accountList',accountListRouter);
app.use('/profile',profileRouter);

app.use('/auth', authRouter);
app.use('/addAccount', addAccountRouter);
app.use('/account', accountRouter);
app.use('/savAccount', savAccountRouter);
app.use('/accountList', accountListRouter);
app.use('/instapay',instaPayRouter);
app.use('/beneficiary',beneficiaryRouter);
app.use('/addBeneficiary',addBeneficiaryRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  console.log("Hiiiiii")
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
