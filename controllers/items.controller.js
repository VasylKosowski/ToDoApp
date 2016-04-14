/**
 * Created by test on 4/14/16.
 */
var express = require('express');
var router = express();

router.get('/', function (req, res) {
    res.render('items', 200);
});

module.exports = router;