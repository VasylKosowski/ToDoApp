/**
* Created by test on 4/19/16.
*/

'use strict';
app.service('credService', function() {
    var userEmail = {};
    this.setEmail = function(value){
        userEmail = value;
    };
    this.getEmail = function(){
        return userEmail;
    };
});
