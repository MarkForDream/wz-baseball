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
var laceRouter = require('server/routers/laceRouter');
var stitchingRouter = require('server/routers/stitchingRouter');
var modelRouter = require('server/routers/modelRouter');
var sizeRouter = require('server/routers/sizeRouter');
var webRouter = require('server/routers/webRouter');
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

app.use(expressWinston.logger({
  transports: [
    new winston.transports.Console({
      json: true,
      colorize: true
    })
  ],
  expressFormat: true,
  colorStatus: true,
  ignoreRoute: function (request, response) { return false; }
 }));

app.use('/api', userRouter(express, require('server/config/passport')(passport)));
app.use('/api', colorRouter(express));
app.use('/api', logoRouter(express));
app.use('/api', leatherRouter(express));
app.use('/api', bindRouter(express));
app.use('/api', laceRouter(express));
app.use('/api', stitchingRouter(express));
app.use('/api', modelRouter(express));
app.use('/api', sizeRouter(express));
app.use('/api', webRouter(express));
app.use('/api', orderRouter(express));

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
