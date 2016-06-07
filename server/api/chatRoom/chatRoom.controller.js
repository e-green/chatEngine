'use strict';

var _ = require('lodash');
var ChatRoom = require('./chatRoom.model');

// Get list of chatRooms
exports.index = function(req, res) {
  ChatRoom.find(function (err, chatRooms) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(chatRooms);
  });
};

// Get a single chatRoom
exports.show = function(req, res) {
  ChatRoom.findById(req.params.id, function (err, chatRoom) {
    if(err) { return handleError(res, err); }
    if(!chatRoom) { return res.status(404).send('Not Found'); }
    return res.json(chatRoom);
  });
};

// Creates a new chatRoom in the DB.
exports.create = function(req, res) {
  ChatRoom.create(req.body, function(err, chatRoom) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(chatRoom);
  });
};

// Updates an existing chatRoom in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  ChatRoom.findById(req.params.id, function (err, chatRoom) {
    if (err) { return handleError(res, err); }
    if(!chatRoom) { return res.status(404).send('Not Found'); }
    var updated = _.merge(chatRoom, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(chatRoom);
    });
  });
};

// Deletes a chatRoom from the DB.
exports.destroy = function(req, res) {
  ChatRoom.findById(req.params.id, function (err, chatRoom) {
    if(err) { return handleError(res, err); }
    if(!chatRoom) { return res.status(404).send('Not Found'); }
    chatRoom.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}