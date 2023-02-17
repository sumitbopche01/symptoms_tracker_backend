/* eslint-disable comma-dangle */
const express = require('express');
const passport = require('passport');

const router = express.Router();
const appointmentController = require('../controller/appointments.controller');

/* GET appointment  */
router.get('/', appointmentController.getMultiple);

router.get('/:appointment_id', appointmentController.get);

/* POST create appointment */
router.post(
  '/',
//  passport.authenticate('jwt', { session: false }),
  appointmentController.create
);

/* PUT appointments */
router.put(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  appointmentController.update
);

/* DELETE appointments */
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  appointmentController.remove
);

module.exports = router;
