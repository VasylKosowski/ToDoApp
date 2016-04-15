var express = require('express');
var router = express();
var request = require('request');

router.get('/', function (req, res) {
    res.render('login', 200);
});

router.post('/', function (req, res) {
    /*request.post({
        url: req.protocol + "://" + req.headers.host + '/api/users/authenticate',
        form: req.body,
        json: true
    }, function (error, response, body) {
        if (error) {
            return res.render('login', { error: 'An error occurred' });
        }

        if (!body.token) {
            return res.render('login', { error: 'Username or password is incorrect', username: req.body.username });
        }

        res.redirect('items');
    });*/

    //res.redirect('items');
});

module.exports = router;