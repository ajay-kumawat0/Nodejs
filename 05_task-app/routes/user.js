const express = require('express');
const routs = express.Router();

const userCntroller = require('../controller/user');

routs.post('/user', userCntroller.user);
routs.get('/getUser', userController.getUser);

module.exports = routs;