const express = require('express');
const router = express.Router();
const task = require('../controller/task');
const verifyToken = require('./../middleware/verifyToken');

router.get('/', verifyToken, task.index);
router.delete('/:id', task.delete);
router.post('/', verifyToken, task.create);

module.exports = router;