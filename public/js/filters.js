'use strict';

/* Filters */
var rssReaderFilters = angular.module('rssReaderFilters', []);

rssReaderFilters.filter('decodeHtml', function() {
    return function(input) {
        if (input === null || input === '' || input === undefined)
            return '';

        if (input.indexOf('&lt;') >= 0)
            return $('<div/>').html(input).text();

        return input;
    };
});

rssReaderFilters.filter('dateTimeFormat', ['$filter',
    function($filter) {
        return function(input) {
            // console.log(typeof input);
            // return input.toLocaleString();
            return $filter('date')(input, 'dd/MM/yyyy HH:mm:ss');
        }
    }]);

rssReaderFilters.filter('activeMenuClass', ['$location',
    function($location) {
        return function(input) {
            input = input || '';
            var url = $location.url();
            console.log(url);
            return url.toLowerCase().indexOf(input.toString().toLowerCase()) === 1 ? 'active' : '';
        }
    }]);
