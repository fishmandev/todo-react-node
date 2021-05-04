const express = require('express');
const router = express.Router();
const auth = require('../controller/auth');

router.post('/access_token', auth.getAccessToken);

module.exports = router;