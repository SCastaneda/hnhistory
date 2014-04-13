var mongoose = require('mongoose');
var mongoURI = process.env.MONGOHQ_URL || 'mongodb://localhost/hn-history';
var db       = mongoose.connect(mongoURI);

exports.schema   = mongoose.Schema;
exports.mongoose = mongoose;
