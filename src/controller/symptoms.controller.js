const symptomsService = require('../services/symptoms.service');

async function get(req, res, next) {
  try {
    res.json(await symptomsService.getSingle(req.params.symptoms_id));
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Error while getting restaurants', err.message);
    next(err);
  }
}

async function getMultiple(req, res, next) {
  try {
    res.json(await symptomsService.getMultiple(req.query));
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Error while getting multiple restaurants', err.message);
    next(err);
  }
}

async function create(req, res, next) {
  try {
    res.json(await symptomsService.create(req.body));
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Error while creating restaurant', err.message);
    next(err);
  }
}

async function update(req, res, next) {
  try {
    res.json(await symptomsService.update(req.params.id, req.body));
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Error while updating restaurant', err.message);
    next(err);
  }
}

async function remove(req, res, next) {
  try {
    res.json(await symptomsService.remove(req.params.id));
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Error while deleting restaurant', err.message);
    next(err);
  }
}

async function showDataView(req, res, next) {
  try {
    // call and get data from service
    res.render('showRestaurants', await symptomsService.getMultiple(req.query));
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Error while showing restaurants using pages', err.message);
    next(err);
  }
}

async function insertDataView(req, res, next) {
  try {
    res.render('insertRestaurantForm');
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Error while inserting a new restaurant', err.message);
    next(err);
  }
}

module.exports = {
  get,
  getMultiple,
  create,
  update,
  remove,
  showDataView,
  insertDataView,
};
