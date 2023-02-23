const hospitalsService = require('../services/hospitals.service');

async function get(req, res, next) {
  try {
    console.log(`Received request to get hospital by id ${req.params.hospital_id}`);
    res.json(await hospitalsService.getSingle(req.params.hospital_id));
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Error while getting hospitals', err.message);
    next(err);
  }
}


async function getMultiple(req, res, next) {
  try {
    console.log("Received request to get All hospitals");
    res.json(await hospitalsService.getMultiple(req.query));
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Error while getting multiple hospitals', err.message);
    next(err);
  }
}

async function create(req, res, next) {
  try {
    res.json(await hospitalsService.create(req.body));
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Error while creating hospital', err.message);
    next(err);
  }
}

async function update(req, res, next) {
  try {
    res.json(await hospitalsService.update(req.params.id, req.body));
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Error while updating hospital', err.message);
    next(err);
  }
}

async function remove(req, res, next) {
  try {
    res.json(await hospitalsService.remove(req.params.id));
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Error while deleting hospital', err.message);
    next(err);
  }
}


module.exports = {
  get,
  getMultiple,
  create,
  update,
  remove
};
