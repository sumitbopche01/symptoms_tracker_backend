const helper = require('../utils/helper.util');
const Hospitals = require('../models/hospitals.model');

/**
 *
 * @param {String} hospitalsId
 * @returns single hospital document
 */
async function getSingle(hospitalsId) {
  const rows = await Hospitals.find({ _id: hospitalsId });
  const data = helper.emptyOrRows(rows);
  return {
    data,
  };
}

async function getMultiple(queryParams = {}) {
  // Prepare query
  const matchQuery = {};

  const rows = await Hospitals.find(matchQuery)
    .sort({ hospital_id: 1})
    .lean();
  const data = helper.emptyOrRows(rows);
  return {
    data
  };
}

/**
 *
 * @param {Object} hospitalData
 * @returns
 */
async function create(hospitalData) {
  const result = await Hospitals.create(hospitalData);

  let message = 'Error in creating Hospital';

  if (result) {
    message = 'Hospital created successfully';
  }

  return { message };
}

/**
 *
 * @param {String} id
 * @param {Object} hospitalData
 * @returns
 */
async function update(id, hospitalData) {
  console.log(hospitalData);
  const result = await Hospitals.updateOne({ _id: id }, hospitalData);

  let message = 'Error in updating hospital';

  if (result) {
    message = 'hospital updated successfully';
  }

  return { message };
}

/**
 *
 * @param {String} id
 * @returns
 */
async function remove(id) {
  const result = await Hospitals.findByIdAndDelete(id);

  let message = 'Error in deleting hospital';

  if (result) {
    message = 'hospital deleted successfully';
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
