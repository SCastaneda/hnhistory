var db_posts = require('../db/posts');

/*
 * GET home page.
 */

exports.index = function(req, res){
    console.log(req.query);

    if(typeof req.query.date !== 'undefined' && typeof req.query.hour !== 'undefined') {

      var date = req.query.date;
      var hour = req.query.hour;

      var date_split = date.split('-');
      var year       = +date_split[0];
      var month      = +date_split[1] - 1; // new Date() take the month as 0 - 11
      var day        = +date_split[2];

      // send date back in with padded 0 for month and day
      var padded_date = year + "-" + (date_split[1] < 10 ? ("0" + (+date_split[1])) : date_split[1]) + '-' + (date_split[2] < 10 ? ("0" + (+date_split[2])) : date_split[2]);

      var date_in = new Date(year, month, day, hour);
      console.log(date_in);

      db_posts.get_posts(date_in, function(posts) {
        res.render('index', { posts: posts.posts, date: padded_date, hour: hour, actual_date:posts.date });
      });

    } else {
      db_posts.get_posts(new Date(), function(posts) {
        res.render('index', { posts: posts.posts, date: padded_date, hour: hour, actual_date:posts.date });
      });
    }

};

exports.list_all = function(req, res) {
  db_posts.get_dates(function(posts) {
      res.render('list_dates', {posts: posts});
  });
};

exports.about = function(req, res) {
  res.render('about', {});
}
