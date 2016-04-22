/**
 * Created by test on 4/19/16.
 */
var monk = require('monk');
var db = monk("localhost:27017/todoapp");
var categoriesDb = db.get('categories');
var _ = require('lodash');
var Q = require('q');
var mongoDb = require('mongodb');

var service = {};
var ObjectId = mongoDb.ObjectID;
service.create = createCategory;
service.getAllByEmail = getAllByEmail;
service.delete = deleteCategory;
service.update = updateCategory;
module.exports = service;

function getAllByEmail(categoryParam) {
    var deferred = Q.defer();

    categoriesDb.find({ userEmails: categoryParam },
        function (err, categories) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(categories);
            }
        });

    return deferred.promise;
};

function createCategory(categoryParam) {
    var deferred = Q.defer();
    categoriesDb.findOne(
        { name: categoryParam.name },
        function (err, categoryName) {
            if (err) deferred.reject(err);
            if (categoryName) {
                deferred.reject('Category Name "' + categoryParam.name + '" is already taken');
            } else {
                create(categoryParam, deferred);
            }
        });

    return deferred.promise;
};

function create(userParam, deferred) {
    var category = _.omit(userParam);
    categoriesDb.insert(category,
        function (err, cat) {
            if (err) deferred.reject(err);
            deferred.resolve(cat);
        });
};

function updateCategory(categoryParam) {
    var deferred = Q.defer();

    categoriesDb.findOne(
        { _id: ObjectId(categoryParam.id) },
        function (err, category) {
            if (err) deferred.reject(err);
            if (category.name == categoryParam.name) {
                deferred.reject('Category Name "' + categoryParam.name + '" is already taken');
            } else {
                update(categoryParam, deferred);
            }
        });

    return deferred.promise;
};

function update(userParam, deferred) {
    var set = {
        name: userParam.name
    };

    categoriesDb.update(
        { _id: ObjectId(userParam.id) },
        { $set: set },
        function (err) {
            if (err) {
                deferred.reject(err);
            }
            deferred.resolve(userParam);
        });
};

function deleteCategory(_id) {
    var deferred = Q.defer();
    categoriesDb.remove(
        { _id: _id },
        function (err) {
            if (err) deferred.reject(err);
            deferred.resolve();
        });

    return deferred.promise;
};