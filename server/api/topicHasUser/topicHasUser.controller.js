'use strict';
var mongoose = require('mongoose');
var _ = require('lodash');
var TopicHasUser = require('./topicHasUser.model');



// Get list of topicHasUsers By Topic ID
exports.index = function(req, res) {
    TopicHasUser.find(function(err, topicHasUsers) {
        if (err) {
            return handleError(res, err);
        }
        return res.status(200).json(topicHasUsers);
    });
};


// Get list of topicHasUsers By User ID 
exports.index = function(req, res) {
    TopicHasUser.find(function(err, topicHasUsers) {
        if (err) {
            return handleError(res, err);
        }
        return res.status(200).json(topicHasUsers);
    });
};




// Get list of topicHasUsers
exports.index = function(req, res) {
    TopicHasUser.find(function(err, topicHasUsers) {
        if (err) {
            return handleError(res, err);
        }
        return res.status(200).json(topicHasUsers);
    });
};

// Get a single topicHasUser
exports.show = function(req, res) {
    TopicHasUser.findById(req.params.id, function(err, topicHasUser) {
        if (err) {
            return handleError(res, err);
        }
        if (!topicHasUser) {
            return res.status(404).send('Not Found');
        }
        return res.json(topicHasUser);
    });
};

// Creates a new topicHasUser in the DB.
exports.create = function(req, res) {
    TopicHasUser.create(req.body, function(err, topicHasUser) {
        if (err) {
            return handleError(res, err);
        }
        return res.status(201).json(topicHasUser);
    });
};

// Updates an existing topicHasUser in the DB.
exports.update = function(req, res) {
    if (req.body._id) {
        delete req.body._id;
    }
    TopicHasUser.findById(req.params.id, function(err, topicHasUser) {
        if (err) {
            return handleError(res, err);
        }
        if (!topicHasUser) {
            return res.status(404).send('Not Found');
        }
        var updated = _.merge(topicHasUser, req.body);
        updated.save(function(err) {
            if (err) {
                return handleError(res, err);
            }
            return res.status(200).json(topicHasUser);
        });
    });
};

// Deletes a topicHasUser from the DB.
exports.destroy = function(req, res) {
    TopicHasUser.findById(req.params.id, function(err, topicHasUser) {
        if (err) {
            return handleError(res, err);
        }
        if (!topicHasUser) {
            return res.status(404).send('Not Found');
        }
        topicHasUser.remove(function(err) {
            if (err) {
                return handleError(res, err);
            }
            return res.status(204).send('No Content');
        });
    });
};

function handleError(res, err) {
    return res.status(500).send(err);
}
