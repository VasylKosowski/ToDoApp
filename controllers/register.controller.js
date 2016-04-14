/**
 * Created by test on 4/13/16.
 */
var express = require('express');
var router = express();
var config = require('config.json');
var request = require('request');

router.get('/', function (req, res) {
    res.render('register');
});

router.post('/', function (req, res) {
    console.log('post register');
    request.post({
        url: config.apiUrl + '/users/register',
        form: req.body,
        json: true
    }, function (error, response, body) {
        if (error) {
            return res.render('register', { error: 'An error occurred' });
        }

        if (response.statusCode !== 200) {
            return res.render('register', {
                error: response.body,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                username: req.body.username
            });
        }

        // return to login page with success message
        return res.redirect('/login');
    });
});

module.exports = router;