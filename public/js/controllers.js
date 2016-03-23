'use strict';

/* Controllers */
var rssReaderControllers = angular.module('rssReaderControllers', []);

/* Home controller */
rssReaderControllers.controller('rssHomeCtrl', ['$scope', '$q', 'Rss', 'RssLoader',
    function($scope, $q, Rss, RssLoader) {
        $scope.activeMenu = 'Home';
        //$scope.folders = ["News", "Tech", "Sport"];
        // $scope.folders = Rss.getFolders();
        $scope.jsonFeed = RssLoader.get();
        $scope.selectedFolder = {};
        $scope.showSelectedFolder = false;
        $scope.currentFeedData = {};

        $scope.selectFolder = function(folderName, feedUrl, event) {
            // prevent default action
            if (event) {
                event.stopPropagation();
                event.preventDefault();
            }

            $scope.selectedFolder = { name: folderName, feedUrl: feedUrl };
            $scope.showSelectedFolder = true;
            $scope.currentFeedData = {}; // reset data
            $scope.isLoading = true;

            var tempData = {};
            var asyncLoad = function(url) {
                var deferred = $q.defer();

                setTimeout(function() {
                    $.ajax({
                        url: '/getFeeds',
                        type: 'POST',
                        data: 'url=' + url,
                        cache: false,
                        success: function(data) {
                            //$scope.currentFeedData = Rss.parseFeedData(data);
                            tempData = Rss.parseFeedData(data);
                            deferred.resolve('completed');
                        }
                    });
                }, 1000);

                return deferred.promise;
            };

            var promise = asyncLoad(feedUrl);
            promise.then(
                // resolve
                function(data) {
                    $scope.currentFeedData = tempData;
                    $scope.isLoading = false;
                    console.log('done with message: ' + data);
                },
                // reject
                function(data) {
                },
                // notify
                function(data) {
                }
            );

        };
    }]);

/* Manage controller */
rssReaderControllers.controller('rssManageCtrl', ['$scope', 'RssLoader',
    function($scope, RssLoader) {
        $scope.activeMenu = 'Manage';
        $scope.welcomeText = "Hei, manage your feeds here...";
        $scope.jsonFeed = RssLoader.get();
    }]);
