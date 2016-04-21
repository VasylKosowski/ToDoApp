/**
 * Created by test on 4/19/16.
 */
var express = require('express');
var router = express.Router();
var categoryService = require('services/category.service');

router.post('/create', createCategory);
router.get('/getAllByEmail', getCategories);

function createCategory(req, res) {
    categoryService.create(req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
};

function getCategories(req, res) {
    categoryService.getAllByEmail(req.query.email)
        .then(function (categories) {
            res.contentType('application/json');
            res.status(200).send(categories);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
};


module.exports = router;