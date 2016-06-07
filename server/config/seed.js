/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
// Insert seed models below
var TopicHasUser = require('../api/topicHasUser/topicHasUser.model');
var Topic = require('../api/topic/topic.model');
var ChatRoom = require('../api/chatRoom/chatRoom.model');
var Message = require('../api/message/message.model');
var Thing = require('../api/thing/thing.model');
var User = require('../api/user/user.model');

// Insert seed data below
var topicHasUserSeed = require('../api/topicHasUser/topicHasUser.seed.json');
var topicSeed = require('../api/topic/topic.seed.json');
var chatRoomSeed = require('../api/chatRoom/chatRoom.seed.json');
var messageSeed = require('../api/message/message.seed.json');
var thingSeed = require('../api/thing/thing.seed.json');

// Insert seed inserts below
TopicHasUser.find({}).remove(function() {
	TopicHasUser.create(topicHasUserSeed);
});

Topic.find({}).remove(function() {
	Topic.create(topicSeed);
});

ChatRoom.find({}).remove(function() {
	ChatRoom.create(chatRoomSeed);
});

Message.find({}).remove(function() {
	Message.create(messageSeed);
});

Thing.find({}).remove(function() {
  Thing.create(thingSeed);
});