const express = require('express');
const routs = express.Router();

const userController = require('../controller/user');

routs.post('/user', userController.user);

routs.post('/login', userController.login);

routs.get('/getUser', userController.getUser);

routs.put('/updateUser/:id', userController.updateUser);

routs.delete('/deleteUser/:id', userController.deleteUser);

module.exports = routs;