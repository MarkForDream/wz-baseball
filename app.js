require('rootpath')();

var express = require('express');
var http = require('http');
var mongoose = require('mongoose');
var passport = require('passport');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var config = require('server/config/main');
var userRouter = require('server/routers/userRouter');
var colorRouter = require('server/routers/colorRouter');
var logoRouter = require('server/routers/logoRouter');
var leatherRouter = require('server/routers/leatherRouter');
var bindRouter = require('server/routers/bindRouter');
var orderRouter = require('server/routers/orderRouter');
var app = express();
var server = http.createServer(app);
var winston = require('winston');
var expressWinston = require('express-winston');

mongoose.connect(config.dbUrl);
app.use(bodyParser.json({limit: '5mb'}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressValidator(require('server/validators/custom')));
app.use(express.static(__dirname + '/client'));
app.use(passport.initialize());

// logger for http request and response (should be declared before routers middleware)
app.use(expressWinston.logger({
      transports: [
        new winston.transports.Console({
          json: true,
          colorize: true
        })
      ],
      // meta: true, // optional: control whether you want to log the meta data about the request (default to true)
      // msg: "HTTP {{req.method}} {{req.url}}", // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
      expressFormat: true, // Use the default Express/morgan request formatting, with the same colors. Enabling this will override any msg and colorStatus if true. Will only output colors on transports with colorize set to true
      colorStatus: true, // Color the status code, using the Express/morgan color palette (default green, 3XX cyan, 4XX yellow, 5XX red). Will not be recognized if expressFormat is true
      ignoreRoute: function (req, res) { return false; } // optional: allows to skip some log messages based on request and/or response
 }));

app.use('/api', userRouter(express, require('server/config/passport')(passport)));
app.use('/api', colorRouter(express));
app.use('/api', logoRouter(express));
app.use('/api', leatherRouter(express));
app.use('/api', bindRouter(express));
app.use('/api', orderRouter(express));

// logger for error (should be declared afoter souters middleware)
app.use(expressWinston.errorLogger({
      transports: [
        new winston.transports.Console({
          json: true,
          colorize: true
        })
      ]
 }));

server.listen(config.port, function() {
    console.log('WZ Baseball');
});
