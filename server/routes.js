/**
 * Main application routes
 */

'use strict';

var path = require('path');

module.exports = function(app) {

  // Insert routes below
  app.use('/api/topicHasUsers', require('./api/topicHasUser'));
  app.use('/api/topics', require('./api/topic'));
  app.use('/api/chatRooms', require('./api/chatRoom'));
  app.use('/api/messages', require('./api/message'));
  app.use('/api/things', require('./api/thing'));
  app.use('/api/users', require('./api/user'));
  app.use('/auth', require('./auth'));


};
