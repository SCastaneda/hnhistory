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


