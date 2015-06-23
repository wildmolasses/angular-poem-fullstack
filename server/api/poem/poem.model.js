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
  loadRecent: function(cb) {
    this.find({})
    .populate({path:'author', select:'name'})
    .sort('-date')
    .limit(20)
    .exec(cb);
  }
};

module.exports = mongoose.model('Poem', PoemSchema);