/**
 * Created by test on 4/19/16.
 */
var monk = require('monk');
var db = monk("localhost:27017/todoapp");
var categoriesDb = db.get('categories');
var _ = require('lodash');
var Q = require('q');

var service = {};
service.create = create;
service.getAllByEmail = getAllByEmail;
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

function create(categoryParam) {
    var deferred = Q.defer();
    categoriesDb.findOne(
        { name: categoryParam.name },
        function (err, categoryName) {
            if (err) deferred.reject(err);
            if (categoryName) {
                deferred.reject('Category Name "' + categoryParam.name + '" is already taken');
            } else {
                createCategory(categoryParam, deferred);
            }
        });

    return deferred.promise;
};

function createCategory(userParam, deferred) {
    var category = _.omit(userParam);
    categoriesDb.insert(category,
        function (err, cat) {
            if (err) deferred.reject(err);
            deferred.resolve(cat);
        });
};