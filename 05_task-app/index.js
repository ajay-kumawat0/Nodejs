const express = require('express');
const port = process.env.PORT || 8001;
const app = express();

app.use(express.urlencoded());

const passport = require('passport')
const passport_jwt = require('./config/passportJwt');
const session = require('express-session');

// multer

// const multer = require('multer');
// const upload = multer({
//     dest: 'images',
//     limits: {
//         fileSize: 1000000
//     },
//     fileFilter(req, file, cb) {
//         if (!file.originalname.match(/\.(png|jpg)$/)) {
//             return cb(new Error('Upload a png and jpg file'))
//         }
//         cb(undefined, true);
//     }
// })

// app.post('/upload', upload.single('upload'), async (req, res) => {
//     res.status(200).json({ msg: 'file uploaded', status: 1 })
// }, (error, req, res, next) => {
//     res.status(200).json({ error: error.message})
// })

const db = require('./config/mongoose');

app.use(session({
    name: 'PROJECT-DEMO',
    secret: 'USER',
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60
    }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', require('./routes/user'));
app.use('/', require('./routes/task'));

app.listen(port, (err) => err ? console.log(err) : console.log(`Server is connected on port ${port}`))