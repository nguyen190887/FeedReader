'use strict';

/* App Module */
var rssReaderApp = angular.module('rssReaderApp', [
    'ngRoute',
    'ngSanitize',
    'rssReaderControllers',
    'rssReaderServices',
    'rssReaderFilters'
]);

rssReaderApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider
            .when('/home', {
                templateUrl: 'partials/feed-home.html',
                controller: 'rssHomeCtrl'
            })
            .when('/manage', {
                templateUrl: 'partials/feed-manage.html',
                controller: 'rssManageCtrl'
            })
            .otherwise({
                redirectTo: '/home'
            });
    }]);
