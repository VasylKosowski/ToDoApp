/**
 * Created by test on 4/19/16.
 */
(function () {
    'use strict';
        app.service('credService', function() {
            var userEmail = {};
            this.setEmail = function(value){
                alert(value);
                userEmail = value;
            };
            this.getEmail = function(){
                alert(userEmail);
                return userEmail;
            };
        });
})();
