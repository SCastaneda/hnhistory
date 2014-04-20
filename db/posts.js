var connect  = require('./connect');
var mongoose = connect.mongoose;
var Schema   = connect.schema;

var postSchema  = new Schema({
                            date: {
                                type: Date,
                                default: Date.now
                            },
                            posts: [Schema.Types.Mixed]
                        });

var postModel = mongoose.model('posts', postSchema);

exports.save_posts = function(posts, cb) {
    var entries = new postModel();
    entries.posts = posts;
    entries.save(function(err, posts) {
        if (err) {
            console.error("Error Saving Posts: " + err);
            cb(err, null);
        } else {
            console.log("Posts saved!");
            cb(null, posts);
        }
    });
}

exports.get_posts = function(date, cb) {
    minus30Min = new Date(date.valueOf()-1800000);
    plus30Min  = new Date(date.valueOf()+1800000);
    // console.log("actual date:");
    // console.log(date);
    // console.log("minus30Min:");
    // console.log(minus30Min);
    // console.log("plus30Min:");
    // console.log(plus30Min);

    postModel.findOne({date: {"$gte": minus30Min, "$lt": plus30Min}}, function(err, posts) {
        if (err) console.error(err);
        // console.log("in db - posts:");
        // console.log(posts);

        // if we can't find any recent ones, find the latest one.
        if(posts == null) {
            postModel.findOne({date: {"$lte": date}}, {}, {sort: {date: -1}}, function(err, posts) {
                if(posts == null) {
                    postModel.findOne({date: {"$gte": date}},{}, {sort: {date: -1}}, function(err, posts) {
                        return cb(posts);    
                    });
                } else {
                    return cb(posts);        
                }
            });
        } else {
            return cb(posts);
        }

    });
};

exports.get_dates = function(cb) {
    postModel.find({date: {"$lte": new Date()}},{}, {limit: 50, sort: {date:-1} }, function(err, posts) {
        if (err) console.error(err);
        return cb(posts);
    });
}
