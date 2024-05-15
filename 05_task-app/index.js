const express = require('express');
const port = 8001;
const app = express();

app.use(express.urlencoded());

const passport = require('passport')
const passport_jwt = require('./config/passportJwt');
const session = require('express-session');

const db = require('./config/mongoose');

app.use(session({
    name : 'PROJECT-DEMO',
    secret : 'USER',
    saveUninitialized : true,
    cookie : {
        maxAge : 1000*60*60
    }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', require('./routes/user'));

app.listen(port, (err)=> err ? console.log(err):console.log(`Server is connected on port ${port}`))