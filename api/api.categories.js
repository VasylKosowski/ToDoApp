/**
 * Created by test on 4/19/16.
 */
var express = require('express');
var router = express.Router();
var categoryService = require('services/category.service');

router.post('/create', createCategory);
router.get('/getAllByEmail', getCategories);
router.delete('/', deleteCategory);
router.post('/update', updateCategory);

function createCategory(req, res) {
    categoryService.create(req.body)
        .then(function (category) {
            res.contentType('application/json');
            res.status(200).send(category);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
};

function updateCategory(req, res) {
    categoryService.update(req.body)
        .then(function (category) {
            res.contentType('application/json');
            res.status(200).send(category);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
};

function deleteCategory(req, res) {
    categoryService.delete(req.query._id)
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