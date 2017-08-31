const express = require('express');
const router = express.Router();
const db = require ('../../models');
const { isAuthenticated, passport } = require('./auth');

router.use(express.static(__dirname + '/../../client/'));

router.get('/api/auth/facebook', passport.authenticate('facebook', { scope: [ 'public_profile', 'email' ] }));

router.get('/api/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/' }), (req, res) => {
  res.redirect('/');
});

router.use(isAuthenticated);

router.get('/api/tickets', db.findTickets);

router.get('/api/users/:id', (req, res) => {
  res.send(req.user ? {
    isAuthenticated: true,
    user: req.user
  } : { isAuthenticated: false, user: {} });
});

router.get('/api/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

router.post('/api/tickets', db.createTicket);

router.post('/api/users', db.createUser);

router.put('/api/tickets/:id', db.updateTickets);

module.exports = router;
