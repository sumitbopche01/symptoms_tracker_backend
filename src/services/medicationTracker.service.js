const helper = require('../utils/helper.util');
const MedicationTracker = require('../models/medicationTracker.model');

async function getMultiple(queryParams = {}) {
  // Prepare query
  const matchQuery = {};

  const rows = await MedicationTracker.find(matchQuery)
    .sort({ _id: -1})
    .lean();

  const data = helper.emptyOrRows(rows);

  return {
    data
  };

}

/**
 *
 * @param {Object} medicationData
 * @returns
 */
async function create(medicationData) {
  const result = await MedicationTracker.create(medicationData);

  let message = 'Error in creating medication tracking data';

  if (result) {
    message = 'medication details created successfully';
  }

  return { message };
}

module.exports = {
  getMultiple,
  create
};
