/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Poem = require('./poem.model');

exports.register = function(socket) {
  Poem.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Poem.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  Poem.populate(doc, {path:'author', select: '_id'}, function(err, poem){
      console.log('onSave:', poem);
      socket.emit('poem:save', poem);
    });
}

function onRemove(socket, doc, cb) {
  socket.emit('poem:remove', doc);
}