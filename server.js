/**
 * Created by test on 4/12/16.
 */
require('rootpath')();
var express = require('express');
var app = express();

app.use('/modules', express.static(__dirname + '/node_modules/'));
app.use('/styles', express.static(__dirname + '/styles/'));

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.set('views', __dirname + '/views');
app.use('/login', require('./controllers/login.controller'));
app.use('/register', require('./controllers/register.controller'));

app.get('/', function (req, res) {
    return res.redirect('/login');
});

app.listen(8081);
console.log("ToDo app is running on  port 8081");