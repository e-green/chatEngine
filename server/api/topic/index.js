'use strict';

var express = require('express');
var controller = require('./topic.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

router.get('/subscribers/:id', controller.subscribers);


module.exports = router;
