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
var historyRouter = require('./routes/history');
var savAccountRouter = require('./routes/savAccount');
var instaPayRouter = require('./routes/instaPay');
var beneficiaryRouter = require('./routes/beneficiary');
var addBeneficiaryRouter = require('./routes/addBeneficiary');
var addLoanRouter = require('./routes/addLoan');
var billsRouter = require('./routes/bills');
var payBillRouter = require('./routes/payBill');
var getBillerRouter = require('./routes/getBillers');
var addBillerRouter = require('./routes/addBillers');
var payNewBillRouter = require('./routes/payNewBill');
var addMoneyRouter = require('./routes/addMoney');
var ServiceRouter = require('./routes/Service');


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
app.use('/auth', authRouter);
app.use('/addAccount', addAccountRouter);
app.use('/account', accountRouter);
app.use('/accountList', accountListRouter);
app.use('/profile', profileRouter);
app.use('/history', historyRouter);
app.use('/auth', authRouter);
app.use('/addAccount', addAccountRouter);
app.use('/addLoan', addLoanRouter);
app.use('/account', accountRouter);
app.use('/savAccount', savAccountRouter);
app.use('/accountList', accountListRouter);
app.use('/instapay', instaPayRouter);
app.use('/beneficiary', beneficiaryRouter);
app.use('/addBeneficiary', addBeneficiaryRouter)
app.use('/bills', billsRouter);
app.use('/payBill', payBillRouter);
app.use('/billers',getBillerRouter);
app.use('/addBiller',addBillerRouter);
app.use('/payNewBill',payNewBillRouter);
app.use('/addMoney',addMoneyRouter);
app.use('/Service',ServiceRouter);



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
