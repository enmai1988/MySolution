const passport = require('passport');
const Strategy = require('passport-facebook').Strategy;
const User = require ('../../database/').User;
const config = require('config')['passport'];

passport.serializeUser((profile, callback) => {
  console.log('serializeUser: ', profile);
  callback(null, profile.id);
});

passport.deserializeUser((id, callback) => {
  User.findById(id)
    .then(user => callback(null, user.dataValues))
    .catch(err => callback(null, false));
});

const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect('/');
  }
};

passport.use(new Strategy({
  clientID: config.facebook.clientID,
  clientSecret: config.facebook.clientSecret,
  callbackURL: config.facebook.callbackURL,
  profileFields: ['id', 'emails', 'name', 'picture']
}, (accessToken, refreshToken, profile, callback) => {
  User.findOrCreate({where: { username: profile.emails[0].value }, defaults: {
    firstName: profile.name.givenName,
    lastName: profile.name.familyName,
    avatarUrl: profile.photos[0].value,
    username: profile.emails[0].value,
    role: 'admin'
  }})
    .spread((user, created) => callback(null, user.dataValues))
    .catch(err => callback(null, false));
}));

module.exports = { isAuthenticated, passport };
