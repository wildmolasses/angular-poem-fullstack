(function(){
    'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PoemSchema = new Schema({
  content: Object,
  date: { type: Date, default: Date.now },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

PoemSchema.statics = {
  loadRecent: function(user, cb) {
    console.log("1:",user);
    this.find({})
    .populate({path: 'author', match: {'_id': user}})
    .sort('-date')
    .limit(20)
    .exec(cb);
  }
};

module.exports = mongoose.model('Poem', PoemSchema);
}());