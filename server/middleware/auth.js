const passport = require('passport');
const Strategy = require('passport-github').Strategy;
const User = require ('../../database/').User;
const config = require('config')['passport'];

passport.use(new Strategy({
  clientID: config.github.CLIENTID,
  clientSecret: config.github.CLIENTSECRET,
  callbackURL: config.github.CALLBACKURL
}, (accessToken, refreshToken, profile, callback) => {
  User.find({
    where: { username: profile.username }
  }).then(user => {
    if (!user) { return callback(null, false); }
    user.dataValues.avatarUrl = profile.photos[0].value;
    return callback(null, user.dataValues);
  });
}));

passport.serializeUser((user, callback) => {
  callback(null, user);
});

passport.deserializeUser((user, callback) => {
  User.find({
    where: { username: user.username }
  }).then(user => {
    if (!user) { return callback(null, false); }
    callback(null, user.dataValues);
  });
});

const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect('/');
  }
};

module.exports = {
  isAuthenticated: isAuthenticated,
  githubAuth: passport
};
