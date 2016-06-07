'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Topic = require('../topic/topic.model'),
    User = require('../user/user.model');

var MessageSchema = new Schema({
    sender: Schema.Types.ObjectId,
    topic: Schema.Types.ObjectId,
    body: String,
    seen: Boolean,
    delivered: Boolean,
    sendTime: {
        type: Date,
        default: Date.now
    },
    seenTime: {
        type: Date
    }
});


/**
 * Virtuals
 */
// Sender
MessageSchema
    .virtual('senderId')
    .set(function(senderId) {
        this.sender = mongoose.Types.ObjectId(senderId);
    })
    .get(function() {
      return this.senderObject;
    });

// Topic
MessageSchema
    .virtual('topicId')
    .set(function(topicId) {
        this.topic = mongoose.Types.ObjectId(topicId);
    })
    .get(function() {
        return this.topicObject;
    });




module.exports = mongoose.model('Message', MessageSchema);
