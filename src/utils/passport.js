const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const helpers = require('../utils/helpers');
const db = require('../models');
const { getUserToSerealizeOrDeserealize } = require('../utils/session');

const User = db.users


passport.use('local.signin', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {

    let { passwordFromDb, sessionUser } = await getUserToSerealizeOrDeserealize(username,null);    
    if (sessionUser != undefined) {
        const validPassword = await helpers.matchPassword(password, passwordFromDb);
        if (validPassword) {
            done(null, sessionUser, req.flash('success', 'Welcome ' + sessionUser.firstName));
        }
        else {
            done(null, false, req.flash('message', 'Incorrect email address or password.'));
        }
    }
    else {
        done(null, false, req.flash('message', 'Incorrect email address or password.'));
    }
}));
passport.use('local.signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {
    let encryptedPassword = await helpers.encryptPassword(password);
    let newUser = await User.create({
        email: username,
        password: encryptedPassword,
        isActive: 1,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    });
    let userToSerialize = { userId: newUser.userId, email: newUser.email, firstName: req.body.firstName, lastName: req.body.lastName };
    return done(null, userToSerialize);

}));


passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser(async (user, done) => {
    let {  sessionUser } = await getUserToSerealizeOrDeserealize(null,user.userId);    
    done(null, sessionUser);
});
