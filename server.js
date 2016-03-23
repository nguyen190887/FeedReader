var express = require('express');
var request = require('request');
// var http = require('http');
// var https = require('https');
var FeedParser = require('FeedParser');
var bodyParser = require('body-parser');

var app = express();

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({
    extended: true
}));

// Read remote feeds
function loadFeed(serverRes, url) {
    console.log('Feed url: ' + url);

    var result = {};
    var feeds = [];

    var feedParser = new FeedParser();
    var req = request(url);

    req
        .on('response', function(res) {
            res.pipe(feedParser);
        })
        .on('error', function(err) {
            console.log('Server error: ' + err);
        });

    feedParser
        .on('readable', function() {
            var stream = this, item;
            while (item = stream.read()) {
                var feedItem = {
                    title: item.title,
                    url: item.link,
                    pubDate: item.pubDate,
                    description: item.description,
                    summary: item.summary
                };
                feeds.push(feedItem);
            }
        })
        .on('end', function() {
            result.feeds = feeds;
            serverRes.send(result);
        });
}

app.post('/getFeeds', function(req, res) {
    loadFeed(res, req.body.url);
});

app.listen(3000);
