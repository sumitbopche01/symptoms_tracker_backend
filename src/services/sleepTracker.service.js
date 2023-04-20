const helper = require('../utils/helper.util');
const SleepTracker = require('../models/sleepTracker.model');

async function getMultiple(queryParams = {}) {
  // Prepare query
  const matchQuery = {};

  const rows = await SleepTracker.find(matchQuery)
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
  const result = await SleepTracker.create(medicationData);

  let message = 'Error in creating sleep tracking data';

  if (result) {
    message = 'sleep tracker details created successfully';
  }

  return { message };
}

module.exports = {
  getMultiple,
  create
};
