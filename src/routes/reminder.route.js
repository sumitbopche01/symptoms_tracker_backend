const express = require('express');
const passport = require('passport');
const cron = require('node-cron');

const router = express.Router();


const reminderController = require('../controller/reminder.controller');

/* GET all or specific reminder  */
router.get('/', reminderController.getMultiple);

router.get('/:reminder_id', reminderController.get);

/* POST create reminder */
router.post(
  '/',
//  passport.authenticate('jwt', { session: false }),
reminderController.create
);

/* PUT reminder */
router.put(
  '/:reminder_id',
  passport.authenticate('jwt', { session: false }),
  reminderController.update
);

/* DELETE reminder */
router.delete(
  '/:reminder_id',
  passport.authenticate('jwt', { session: false }),
  reminderController.remove
);

module.exports = router;