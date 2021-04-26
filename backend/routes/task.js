const express = require('express');
const router = express.Router();
const task = require('../controller/task');

router.get('/', task.index);
router.delete('/:id', task.delete);
router.post('/', task.create);

module.exports = router;