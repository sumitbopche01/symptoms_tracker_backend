/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
/* eslint-disable comma-dangle */
const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Users = require("../models/users.model");
const { getAllEmergencyContacts } = require("../controller/users.controller");

const router = express.Router();

router.post(
  "/signup",
  //  passport.authenticate('signup', { session: false }),
  async (req, res) => {
    try {
      req.body.password = await bcrypt.hash(req.body.password, 10);
      const user = await Users.create(req.body);
      console.log("user", user);
      res.json({
        message: "Signup successful",
        user: req.user,
      });
    } catch (error) {
      console.log("Error", error);
      res.json({
        message: "Signup Failed",
        user: req.user,
      });
    }
  }
);

router.post("/", async (req, res, next) => {
  console.log("req.body", req.body);
  // eslint-disable-next-line no-unused-vars
  passport.authenticate("login", async (err, user, info) => {
    try {
      if (err || !user) {
        const error = new Error("An error occurred.");

        return next(error);
      }

      req.login(user, { session: false }, async (error) => {
        if (error) return next(error);

        const body = { username: user.email, password: user.password };
        const token = jwt.sign({ user: body }, process.env.SECRET_TOKEN, {
          expiresIn: "24h",
        });

        return res.json({ token });
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
});

// passport.use(
//   new LocalStrategy(
//     {
//       usernameField: "username",
//       passwordField: "password",
//     },
//     (username, password, done) => {
//       // Look up the user by their username in the database
//       User.findOne({ where: { username: username } })
//         .then((user) => {
//           if (!user) {
//             return done(null, false, {
//               message: "Incorrect username or password.",
//             });
//           }
//           // Compare the password with the hashed password stored in the database
//           bcrypt.compare(password, user.password, (err, result) => {
//             if (err) {
//               return done(err);
//             }
//             if (!result) {
//               return done(null, false, {
//                 message: "Incorrect username or password.",
//               });
//             }
//             // The username and password are correct, so return the user
//             return done(null, user);
//           });
//         })
//         .catch((err) => {
//           done(err);
//         });
//     }
//   )
// );

router.get("/emergency-contacts", getAllEmergencyContacts);

module.exports = router;
