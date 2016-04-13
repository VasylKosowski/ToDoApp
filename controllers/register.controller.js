/**
 * Created by test on 4/13/16.
 */
var express = require('express');
var router = express();

router.get('/', function (req, res) {
    res.render('register', 200);
});

module.exports = router;