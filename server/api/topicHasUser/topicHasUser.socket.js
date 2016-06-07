/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var TopicHasUser = require('./topicHasUser.model');

exports.register = function(socket) {
  TopicHasUser.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  TopicHasUser.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('topicHasUser:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('topicHasUser:remove', doc);
}
