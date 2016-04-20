/**
 * Created by test on 4/12/16.
 */
require('rootpath')();
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use('/modules', express.static(__dirname + '/node_modules/'));
app.use('/styles', express.static(__dirname + '/styles/'));
app.use('/app', express.static(__dirname + '/app/'));
app.use('/views', express.static(__dirname + '/views/'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use('/api/users', require('./api/api.users.js'));
app.use('/api/categories', require('./api/api.categories'));

app.get('/', function (req, res) {
    res.render('index', 200);
});

app.listen(8081);
console.log("ToDo app is running on  port 8081");