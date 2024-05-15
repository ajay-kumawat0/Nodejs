const passport = require('passport');
const jwtExtract = require('passport-jwt').ExtractJwt;
const jwtStrategy = require('passport-jwt').Strategy;
const user = require('../models/user');

const opt = {
    jwtFromRequest: jwtExtract.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'USER'
}

passport.use(new jwtStrategy(opt, async (userDet, done) => {
    let data = await user.findById(userDet.userData._id);
    if (data) {
        return done(null, data)
    }
    else {
        return done(null, false)
    }
}))

passport.serializeUser((user, done) => {
    return done(null, user.id);
})

passport.deserializeUser(async (id, done) => {
    let reCheck = await user.findById(id);
    if (reCheck) {
        return done(null, reCheck)
    }
    else {
        return done(null ,false)
    }
})

module.exports = passport