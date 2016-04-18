/**
 * Created by test on 4/14/16.
 */
var express = require('express');
var router = express.Router();
var userService = require('services/user.service');

// routes
router.post('/authenticate', authenticateUser);
router.post('/register', registerUser);

module.exports = router;

function authenticateUser(req, res) {
    userService.authenticate(req.body.email, req.body.password, req.body.passwordNotRequired)
        .then(function (token) {
            if (token) {
                // authentication successful
                res.send({ token: token});
            } else {
                // authentication failed
                res.sendStatus(401);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
};

function registerUser(req, res) {
    userService.create(req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
};