const express = require('express');

const router = express.Router();

const sleepTrackerController = require('../controller/sleepTracker.controller');

router.get('/', sleepTrackerController.getMultiple);

router.post('/', sleepTrackerController.create);

module.exports = router;
