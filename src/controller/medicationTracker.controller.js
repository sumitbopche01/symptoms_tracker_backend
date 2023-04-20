const medicationService = require('../services/medicationTracker.service');

async function getMultiple(req, res, next) {
  try {
    res.json(await medicationService.getMultiple(req.query));
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Error while getting multiple medications', err.message);
    next(err);
  }
}

async function create(req, res, next) {
  try {
    res.json(await medicationService.create(req.body));
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Error while creating medication', err.message);
    next(err);
  }
}

module.exports = {
  getMultiple,
  create,
};
