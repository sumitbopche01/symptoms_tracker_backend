const sleepTrackerService = require('../services/sleepTracker.service');

async function getMultiple(req, res, next) {
  try {
    res.json(await sleepTrackerService.getMultiple(req.query));
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Error while getting multiple sleep tracker', err.message);
    next(err);
  }
}

async function create(req, res, next) {
  try {
    res.json(await sleepTrackerService.create(req.body));
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Error while creating sleep tracker', err.message);
    next(err);
  }
}

module.exports = {
  getMultiple,
  create,
};
