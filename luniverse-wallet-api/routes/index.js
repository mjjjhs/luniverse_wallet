const express = require('express');
const router = express.Router();
const authRouter = require('./users');

router.use('/auth', authRouter);

module.exports = router;
