var express = require('express');
var router = express();

router.get('/', function (req, res) {
    res.render('login', 200);
});

router.post('/', function (req, res) {
    console.log('post login');
});

module.exports = router;