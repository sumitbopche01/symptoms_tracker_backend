/* eslint-disable comma-dangle */
const express = require('express');
const passport = require('passport');

const router = express.Router();
const symptomsController = require('../controller/symptoms.controller');

/* GET restaurant  */
router.get('/', symptomsController.getMultiple);

router.get('/:symptoms_id', symptomsController.get);

/* POST create restaurant */
router.post(
  '/',
//  passport.authenticate('jwt', { session: false }),
  symptomsController.create
);

/* PUT restaurants */
router.put(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  symptomsController.update
);

/* DELETE restaurants */
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  symptomsController.remove
);

module.exports = router;
