const express = require('express');
const router = express.Router();
const auth = require('../controller/auth');

router.post('/access_token', auth.getAccessToken);
router.post('/token', auth.getToken);

module.exports = router;