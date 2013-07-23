var SecMessage = {};

angular.module('SecMessage', ['SecMessageServices', 'ui.bootstrap', 'ui.bootstrap.modal'])
    .config(function ($interpolateProvider, $routeProvider) {
        $interpolateProvider.startSymbol('{[').endSymbol(']}');
        $routeProvider.
            when('/main', {controller: SecMessageCtrl, templateUrl: '/template/main'}).
            when('/view/:id', {controller: SecMessageViewCtrl, templateUrl: '/template/view'}).
            otherwise({redirectTo: '/main'});
    });