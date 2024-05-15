const express = require('express');
const routs = express.Router();

const userController = require('../controller/user');
const passport = require('passport');

routs.post('/user', userController.user);

routs.post('/login', userController.login);

routs.get('/getUser',passport.authenticate('jwt', {failureRedirect :'/failLogin'}),userController.getUser);

routs.get('/failLogin', async(req,res)=>{
    return res.status(400).json({ msg: 'First you have to login..!', status: 0 })
})

routs.put('/updateUser/:id', userController.updateUser);

routs.delete('/deleteUser/:id', userController.deleteUser);

module.exports = routs;