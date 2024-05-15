const express = require('express');
const routs = express.Router();
const passport = require('passport');

const taskController = require('../controller/task');

routs.post('/addTask', passport.authenticate('jwt', {failureRedirect :'/failLogin'}),taskController.addTask);

routs.get('/getTask', taskController.getTask);

routs.get('/failLogin', async(req,res)=>{
    return res.status(400).json({ msg: 'First you have to login..!', status: 0 })
})

module.exports = routs;