const express = require('express');
const routs = express.Router();

const userCntroller = require('../controller/user');

routs.get('/user', userCntroller.user);

module.exports = routs;