'use strict';

/* Services */

var rssReaderServices = angular.module('rssReaderServices', ['ngResource']);

rssReaderServices.factory('RssLoader', ['$resource',
    function($resource) {
        return $resource('feed_data/feed.json', {}, {
            query: { method: 'GET', isArray: true }
        });
    }]);

rssReaderServices.factory('Rss', function() {
    return {
        getFolders: function() {
            return [
                { name: 'VnExpress', feedUrl: 'http://vnexpress.net/rss/tin-moi-nhat.rss' },
                { name: 'Thanh Nien', feedUrl: 'http://www.thanhnien.com.vn/rss/home.rss' },
                { name: 'Tinh Te', feedUrl: 'http://www.tinhte.vn/rss' }
            ];
        },

        parseFeedData: function(feedData) {
            var items = [];
            for (var i = 0, len = feedData.feeds.length; i < len; i++) {
                var el = feedData.feeds[i];
                items.push({
                    title: el.title,
                    description: unescape(el.description),
                    summary: el.summary,
                    url: el.url,
                    pubDate: el.pubDate
                });
            }
            return items;
        }

    };
});
