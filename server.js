/**
 * Created by test on 4/12/16.
 */
var express = require('express');
var app = express();

app.get('/', function (req, res){
    res.send("ToDo App");
});

app.listen(8081);
console.log("ToDo app is running on  port 8081");