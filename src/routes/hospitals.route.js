/* eslint-disable comma-dangle */
const express = require('express');
const passport = require('passport');

const router = express.Router();
const hospitalController = require('../controller/hospitals.controller');

/* GET hospital  */
router.get('/', hospitalController.getMultiple);

router.get('/:hospital_id', hospitalController.get);

/* POST create hospital */
router.post(
  '/',
//  passport.authenticate('jwt', { session: false }),
  hospitalController.create
);

/* PUT hospitals */
router.put(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  hospitalController.update
);

/* DELETE hospitals */
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  hospitalController.remove
);

module.exports = router;
