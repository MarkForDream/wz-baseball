var bcryptNodejs = require('bcrypt-nodejs');
var pwd = bcryptNodejs.hashSync("1234", bcryptNodejs.genSaltSync(8), null);
console.log(pwd);
