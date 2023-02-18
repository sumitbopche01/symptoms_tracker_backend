const helper = require('../utils/helper.util');
const Symptoms = require('../models/symptoms.model');

/**
 *
 * @param {String} symptomsId
 * @returns single symptom document
 */
async function getSingle(symptomsId) {
  const rows = await Symptoms.find({ _id: symptomsId });
  const data = helper.emptyOrRows(rows);
  return {
    data,
  };
}

async function getMultiple(queryParams = {}) {
  // eslint-disable-next-line prefer-const
  let { user_email, from_date, to_date } = queryParams;

  // Prepare query
  const matchQuery = {};
  if (user_email) {
    matchQuery.user_email = user_email.toLowerCase();
  }
  if (from_date) {
    matchQuery.from_date = new Date(from_date);
  }
  if (to_date) {
    matchQuery.to_date = new Date(to_date);
  }

  const rows = await Symptoms.find(matchQuery)
    .sort({ date: 1 })
    .lean();
    
  const data = helper.emptyOrRows(rows);
  return {
    data,
  };
}

/**
 *
 * @param {Object} restaurantData
 * @returns
 */
async function create(restaurantData) {
  const result = await Symptoms.create(restaurantData);

  let message = 'Error in creating symptom';

  if (result) {
    message = 'Symptom created successfully';
  }

  return { message };
}

/**
 *
 * @param {String} id
 * @param {Object} restaurantData
 * @returns
 */
async function update(id, restaurantData) {
  console.log(restaurantData);
  const result = await Symptoms.updateOne({ _id: id }, restaurantData);

  let message = 'Error in updating restaurant';

  if (result) {
    message = 'Restaurant updated successfully';
  }

  return { message };
}

/**
 *
 * @param {String} id
 * @returns
 */
async function remove(id) {
  const result = await Symptoms.findByIdAndDelete(id);

  let message = 'Error in deleting restaurant';

  if (result) {
    message = 'Restaurant deleted successfully';
  }

  return { message };
}

module.exports = {
  getSingle,
  getMultiple,
  create,
  update,
  remove,
};
