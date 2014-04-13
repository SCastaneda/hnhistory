
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes/index');
var http = require('http');
var path = require('path');
var time = require('time');

var app = express();

// all environments
app.set('port', process.env.PORT || 8080);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

var CronJob  = require('cron').CronJob;
var feed     = require('./feed.js');
var db_posts = require('./db/posts');

new CronJob('0 * * * * *', function(){
    console.log('You will see this message every hour');
    console.log('Fetching Feeds...');
    feed.getFeeds(function(feeds) {
        db_posts.save_posts(feeds, function(err, posts) {
            if(err)  {
                console.error(err);
            } else {
                console.log("successfully saved!");
            }
        });
    });
}, null, true, "America/Los_Angeles");
