/**
 * Created by test on 4/13/16.
 */
var express = require('express');
var router = express();
var request = require('request');

router.get('/', function (req, res) {
    res.render('register');
});

module.exports = router;