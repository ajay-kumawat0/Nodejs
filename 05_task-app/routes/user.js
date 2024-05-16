const express = require('express');
const routs = express.Router();

// multer

const multer = require('multer');
const upload = multer({
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(png|jpg)$/)) {
            return cb(new Error('Upload a png and jpg file'))
        }
        cb(undefined, true);
    }
})

// app.post('/userProfile', upload.single('avatar'), async (req, res) => {
//     res.status(200).json({ msg: 'file uploaded', status: 1 })
// }, (error, req, res, next) => {
//     res.status(200).json({ error: error.message})
// })

const userController = require('../controller/user');
const passport = require('passport');

routs.post('/user', userController.user);

routs.post('/login', userController.login);

routs.get('/getUser',passport.authenticate('jwt', {failureRedirect :'/failLogin'}),userController.getUser);

routs.get('/getAllUser',userController.getUser);

routs.get('/failLogin', async(req,res)=>{
    return res.status(400).json({ msg: 'First you have to login..!', status: 0 })
})

routs.patch('/updateUser', passport.authenticate('jwt', {failureRedirect :'/failLogin'}) ,userController.updateUser);

routs.delete('/deleteUser',passport.authenticate('jwt', {failureRedirect :'/failLogin'}) ,userController.deleteUser);

routs.post('/userProfile', passport.authenticate('jwt', {failureRedirect :'/failLogin'}),upload.single('avatar'), userController.userProfile);

module.exports = routs;