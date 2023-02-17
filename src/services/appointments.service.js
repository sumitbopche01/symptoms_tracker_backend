const helper = require('../utils/helper.util');
const Appointments = require('../models/appointments.model');

/**
 *
 * @param {String} appointmentsId
 * @returns single appointment document
 */
async function getSingle(appointmentsId) {
  const rows = await Appointments.find({ _id: appointmentsId });
  const data = helper.emptyOrRows(rows);
  return {
    data,
  };
}

async function getMultiple(queryParams = {}) {
  // Prepare query
  const matchQuery = {};

  const rows = await Appointments.find(matchQuery)
    .sort({ appointment_id: 1})
    .lean();
  const data = helper.emptyOrRows(rows);
  return {
    data
  };
}

/**
 *
 * @param {Object} appointmentData
 * @returns
 */
async function create(appointmentData) {
  const result = await Appointments.create(appointmentData);

  let message = 'Error in creating appointment';

  if (result) {
    message = 'appointment created successfully';
  }

  return { message };
}

/**
 *
 * @param {String} id
 * @param {Object} appointmentData
 * @returns
 */
async function update(id, appointmentData) {
  console.log(appointmentData);
  const result = await Appointments.updateOne({ _id: id }, appointmentData);

  let message = 'Error in updating appointment';

  if (result) {
    message = 'appointment updated successfully';
  }

  return { message };
}

/**
 *
 * @param {String} id
 * @returns
 */
async function remove(id) {
  const result = await Appointments.findByIdAndDelete(id);

  let message = 'Error in deleting appointment';

  if (result) {
    message = 'appointment deleted successfully';
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
