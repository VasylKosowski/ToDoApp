var express = require('express');
var router = express();

router.get('/', function (req, res) {
    res.render('login', 200);
});

module.exports = router;