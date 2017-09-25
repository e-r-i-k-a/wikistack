'use strict';

const express = require ('express');
const router = express.Router();
const wiki = require('./wiki.js');
const user = require('./user.js');

router.use('/wiki', wiki);
module.exports = router;