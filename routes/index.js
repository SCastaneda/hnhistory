
/*
 * GET home page.
 */

exports.index = function(req, res){
    res.render('index', { title: 'Express' });
    console.log(req.query);

    if(typeof req.query.date !== 'undefined' && typeof req.query.hour !== 'undefined') {

      var date = req.query.date;
      var hour = req.query.hour;


      var date_split = date.split('-');
      var year       = date_split[0];
      var month      = date_split[1] - 1; // new Date() take the month as 0 - 11
      var day        = date_split[2];

      var date_in = new Date(year, month, day, hour);
      console.log(date_in);
    }

};