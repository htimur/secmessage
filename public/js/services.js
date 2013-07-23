angular.module('SecMessageServices', []).
    factory('NotificationService', function(){
        return SecMessage.Observable({});
    });