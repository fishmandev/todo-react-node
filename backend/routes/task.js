const express = require('express');
const router = express.Router();
const task = require('../controller/task');

router.get('/', task.index);

module.exports = router;