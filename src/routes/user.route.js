/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
/* eslint-disable comma-dangle */
const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Users = require('../models/users.model');
const { getAllEmergencyContacts } = require('../controller/users.controller');

const router = express.Router();

router.post(
  '/signup',
  //  passport.authenticate('signup', { session: false }),
  async (req, res) => {
    try {
      console.log('Here');
      req.body.password = await bcrypt.hash(req.body.password, 10);
      const user = await Users.create(req.body);
      console.log(user);
      res.json({
        message: 'Signup successful',
        user: req.user,
      });
    } catch (error) {
      console.log('Error', error);
      res.json({
        message: 'Signup Failed',
        user: req.user,
      });
    }
  }
);

router.post('/login', async (req, res, next) => {
  // eslint-disable-next-line no-unused-vars
  passport.authenticate('login', async (err, user, info) => {
    try {
      if (err || !user) {
        const error = new Error('An error occurred.');

        return next(error);
      }

      req.login(user, { session: false }, async (error) => {
        if (error) return next(error);

        const body = { _id: user._id, email: user.email };
        const token = jwt.sign({ user: body }, process.env.SECRET_TOKEN, {
          expiresIn: '24h',
        });

        return res.json({ token });
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
});

router.get('/emergency-contacts', getAllEmergencyContacts);

module.exports = router;
