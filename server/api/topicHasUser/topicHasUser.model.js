'use strict';

var Topic = require('../topic/topic.model');
var User = require('../user/user.model');
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TopicHasUserSchema = new Schema({
    topic: {
        type: Schema.Types.ObjectId,
        ref: "Topic"
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    accept: Boolean,
    lastActiveTime: Date,
    acceptDate: Date,
    sendTime: {
        type: Date,
        default: Date.now
    }
});


/**
 * Virtuals
 */
// Sender
TopicHasUserSchema
    .virtual('userId')
    .set(function(userId) {
        this.user = mongoose.Types.ObjectId(userId);
    })
    .get(function() {
        return this.user;
    });

// Topic
TopicHasUserSchema
    .virtual('topicId')
    .set(function(topicId) {
        this.topic = mongoose.Types.ObjectId(topicId);
    })
    .get(function() {
        return this.topic;
    });



// Validate user is allready subscribe to topic
TopicHasUserSchema
    .path('user')
    .validate(function(user, respond) {
        var self = this;
        this.constructor.findOne({
            user: user
        }, function(err, user) {
            if (err) throw err;
            if (user) {
                if (self.id === user.id) return respond(true);
                return respond(false);
            }
            respond(true);
        });
    }, 'The specified user is already subscribed.');



// Validate is user existing
TopicHasUserSchema
    .path('user')
    .validate(function(user, respond) {

        // update user
        User.findById(user, function(err, user) {
            if (!user) return respond(false);
            respond(true);
        });


    }, 'User dose not existing');

// Validate is topic existing
TopicHasUserSchema
    .path('topic')
    .validate(function(topic, respond) {
        Topic.findById(topic, function(err, topic) {
            if (!topic) return respond(false);
            respond(true);
        });

    }, 'Topic dose not existing');



/**
 * Aftet save
 */
TopicHasUserSchema
    .post('save', function(doc) {
        //update topic
        Topic.findById(doc.topic, function(err, topic) {
            topic.addSubscribers(doc.user);
        });
        // update user
        User.findById(doc.user, function(err, user) {
            user.addTopics(doc.topic);
        });
    });



module.exports = mongoose.model('TopicHasUser', TopicHasUserSchema);
