var monk = require('monk');
var db = monk("localhost:27017/todoapp");
var usersDb = db.get('users');
var Q = require('q');
var _ = require('lodash');
var crypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var secretKey = "secret_key";

var service = {};
service.authenticate = authenticate;
service.create = create;

module.exports = service;

function authenticate(username, password) {
    var deferred = Q.defer();
    usersDb.findOne({ username: username }, function (err, user) {
        if (err) deferred.reject(err);
        if (user && crypt.compareSync(password, user.hash)) {
            // authentication successful
            deferred.resolve(jwt.sign({ sub: user._id }, secretKey));
        } else {
            // authentication failed
            deferred.resolve();
        }
    });

    return deferred.promise;
};

function create(userParam) {
    var deferred = Q.defer();

    usersDb.findOne(
        { username: userParam.username },
        function (err, user) {
            if (err) deferred.reject(err);

            if (user) {
                deferred.reject('Username "' + userParam.username + '" is already taken');
            } else {
                console.log("create in register");
                createUser(userParam, deferred);
            }
        });

    return deferred.promise;
};

function createUser(userParam, deferred) {
    // set user object to userParam without the clear password
    var user = _.omit(userParam, 'password');

    // add hashed password to user object
    user.hash = crypt.hashSync(userParam.password, 10);

    console.log("createUser in register");
    usersDb.insert(
        user,
        function (err, doc) {
            if (err) deferred.reject(err);
            deferred.resolve();
        });
};
