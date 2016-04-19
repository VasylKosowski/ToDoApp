/**
 * Created by test on 4/19/16.
 */
var express = require('express');
var router = express.Router();
var categoryService = require('services/category.service');

router.post('/create', createCategory);

function createCategory(req, res) {
    categoryService.create(req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
};

module.exports = router;