/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var ChatRoom = require('./chatRoom.model');

exports.register = function(socket) {
  ChatRoom.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  ChatRoom.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('chatRoom:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('chatRoom:remove', doc);
}