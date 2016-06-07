'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TopicSchema = new Schema({
    name: String,
    startDate: Date,
    lastActiveDate: Date,
    info: String,
    isActive: Boolean,
    isPublic: Boolean,    
    subscribers: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }]
});


/**
 * Methods
 */
TopicSchema.methods = {
    addSubscribers: function(userId) {
        this.subscribers.push(mongoose.Types.ObjectId(userId));
        this.save(function(err) {
            if (err) return handleError(err);
        });
    }
}

module.exports = mongoose.model('Topic', TopicSchema);
