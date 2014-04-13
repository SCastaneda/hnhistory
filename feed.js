var FeedParser = require('feedparser');
var request    = require('request');

exports.getFeeds = function (cb) {

  var req        = request('https://news.ycombinator.com/rss');
  var feedparser = new FeedParser();
  var all_feeds = [];

  req.on('error', function (error) {
    // handle any request errors
  });

  req.on('response', function (res) {
    var stream = this;

    if (res.statusCode != 200) {
      return this.emit('error', new Error('Bad status code'));
    }
    stream.pipe(feedparser);
  });


  feedparser.on('error', function(error) {
    // always handle errors
  });
  feedparser.on('readable', function() {
    // This is where the action is!
    var stream = this
    var meta = this.meta // **NOTE** the "meta" is always available in the context of the feedparser instance
    var item;

    while (item = stream.read()) {
      //console.log(item);
      all_feeds.push(item);
    }

  });

  feedparser.on('end', function done(err) {
  if (err) {
    console.error(err, err.stack);
  } else {
    return cb(all_feeds);
  }
});

}

