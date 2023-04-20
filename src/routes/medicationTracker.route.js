const express = require('express');

const router = express.Router();

const medicationController = require('../controller/medicationTracker.controller')

router.get('/', medicationController.getMultiple);

router.post('/', medicationController.create);

module.exports = router;
