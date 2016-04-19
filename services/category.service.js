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
module.exports = service;

function create(categoryParam) {
    var deferred = Q.defer();

    categoriesDb.findOne(
        { name: categoryParam.name },
        function (err, user) {
            if (err) deferred.reject(err);

            if (user) {
                deferred.reject('Category Name "' + categoryParam.name + '" is already taken');
            } else {
                createCategory(categoryParam, deferred);
            }
        });

    return deferred.promise;
};

function createCategory(userParam, deferred) {
    var category = _.omit(userParam);
    categoriesDb.insert(
        category,
        function (err, doc) {
            if (err) deferred.reject(err);
            deferred.resolve();
        });
};