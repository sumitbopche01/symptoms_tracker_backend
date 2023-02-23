const helper = require('../utils/helper.util');
const config = require('../configs/general.config');
const Reminder = require('../models/reminder.model');

/**
 *
 * @param {String} reminderId
 * @returns single reminder document
 */
async function getSingle(queryParams = {}) {
  let { _id } = queryParams;
  // Prepare query
  const matchQuery = {};
  if (_id) {
    matchQuery._id = _id;
  }
  const rows = await Reminder.find(matchQuery)
    .lean();
  const data = helper.emptyOrRows(rows);
  console.log(rows)
  return {
    data
  };
}

async function getMultiple(queryParams = {}) {
  // eslint-disable-next-line prefer-const
  let { user_email } = queryParams;

  // Prepare query
  const matchQuery = {};
  if (user_email) {
    matchQuery.user_email = user_email.toLowerCase();
  }

  const rows = await Reminder.find(matchQuery)
    .lean();
  const data = helper.emptyOrRows(rows);
  return {
    data
  };
}

/**
 *
 * @param {Object} reminderData
 * @returns
 */
async function create(reminderData) {

  const result = await Reminder.create(reminderData);

  let message = 'Error in creating symptom';

  if (result) {
    message = 'Reminder created successfully';
  }

  return { message };
}

/**
 *
 * @param {String} id
 * @param {Object} reminderData
 * @returns
 */
async function update(id, reminderData) {
  console.log(reminderData);
  const result = await Reminder.updateOne({ _id: id }, reminderData);

  let message = 'Error in updating reminder';

  if (result) {
    message = 'Reminder updated successfully';
  }

  return { message };
}

/**
 *
 * @param {String} id
 * @returns
 */
async function remove(id) {
  const result = await Reminder.findByIdAndDelete(id);

  let message = 'Error in deleting reminder';

  if (result) {
    message = 'Reminder deleted successfully';
  }

  return { message };
}

module.exports = {
  getSingle,
  create,
  getMultiple,
  update,
  remove,
};
