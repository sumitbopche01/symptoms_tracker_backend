const appointmentsService = require('../services/appointments.service');

async function get(req, res, next) {
  try {
    res.json(await appointmentsService.getSingle(req.params.symptoms_id));
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Error while getting appointments', err.message);
    next(err);
  }
}


async function getMultiple(req, res, next) {
  try {
    res.json(await appointmentsService.getMultiple(req.query));
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Error while getting multiple appointments', err.message);
    next(err);
  }
}

async function create(req, res, next) {
  try {
    res.json(await appointmentsService.create(req.body));
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Error while creating appointment', err.message);
    next(err);
  }
}

async function update(req, res, next) {
  try {
    res.json(await appointmentsService.update(req.params.id, req.body));
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Error while updating appointment', err.message);
    next(err);
  }
}

async function remove(req, res, next) {
  try {
    res.json(await appointmentsService.remove(req.params.id));
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Error while deleting appointment', err.message);
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
