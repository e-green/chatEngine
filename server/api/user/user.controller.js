'use strict';

var User = require('./user.model');
var TopicHasUser = require('../topicHasUser/topicHasUser.model')
var passport = require('passport');
var bodyParser = require('body-parser')
var config = require('../../config/environment');
var jwt = require('jsonwebtoken');

var validationError = function(res, err) {
    return res.status(422).json(err);
};


exports.login = function(req, res) {
    User.findById(req.params.id)
        .populate('topics')
        .exec(function(err, user) {
            console.log(user);
            return res.status(200).json(user.topics);
        })
};



exports.getUserTopics = function(req, res) {
    User.findById(req.params.id)
        .populate('topics')
        .exec(function(err, user) {
            console.log(user);
            return res.status(200).json(user.topics);
        })
};


exports.inviteUser = function(req, res) {

    //var inviteUser = new User(req.body);
    //  console.log(req.body);
    var email = req.body.email;
    var topicId = req.body.topicId;
    User.findOne({
        email: email
    }, function(err, user) {
        if (user) {

            TopicHasUser.create({
                "topicId": topicId,
                "userId": user._id,
                "accept": false
            }, function(err, topicHasUser) {
                if (err) {
                    return handleError(res, err);
                }
                return res.status(201).json(topicHasUser);
            });

        } else {
            return res.status(404).send('email is not in db');
        }
    });
}

/**
 * Get list of users
 * restriction: 'admin'
 */
exports.index = function(req, res) {
    User.find({}, '-salt -hashedPassword', function(err, users) {
        if (err) return res.status(500).send(err);
        res.status(200).json(users);
    });
};

/**
 * Creates a new user
 */
exports.create = function(req, res, next) {
    var newUser = new User(req.body);
    newUser.provider = 'local';
    newUser.role = 'user';
    newUser.save(function(err, user) {
        if (err) return validationError(res, err);
        var token = jwt.sign({
            _id: user._id
        }, config.secrets.session, {
            expiresInMinutes: 60 * 5
        });
        res.json({
            token: token
        });
    });
};

/**
 * Get a single user
 */
exports.show = function(req, res, next) {
    var userId = req.params.id;

    User.findById(userId, function(err, user) {
        if (err) return next(err);
        if (!user) return res.status(401).send('Unauthorized');
        res.json(user.profile);
    });
};

/**
 * Deletes a user
 * restriction: 'admin'
 */
exports.destroy = function(req, res) {
    User.findByIdAndRemove(req.params.id, function(err, user) {
        if (err) return res.status(500).send(err);
        return res.status(204).send('No Content');
    });
};

/**
 * Change a users password
 */
exports.changePassword = function(req, res, next) {
    var userId = req.user._id;
    var oldPass = String(req.body.oldPassword);
    var newPass = String(req.body.newPassword);

    User.findById(userId, function(err, user) {
        if (user.authenticate(oldPass)) {
            user.password = newPass;
            user.save(function(err) {
                if (err) return validationError(res, err);
                res.status(200).send('OK');
            });
        } else {
            res.status(403).send('Forbidden');
        }
    });
};

/**
 * Get my info
 */
exports.me = function(req, res, next) {
    var userId = req.user._id;
    User.findOne({
        _id: userId
    }, '-salt -hashedPassword', function(err, user) { // don't ever give out the password or salt
        if (err) return next(err);
        if (!user) return res.status(401).send('Unauthorized');
        res.json(user);
    });
};

/**
 * Authentication callback
 */
exports.authCallback = function(req, res, next) {
    res.redirect('/');
};
