const helper = require('../utils/helper.util');
// const config = require('../configs/general.config');
const Users = require('../models/users.model');
const Symptoms = require('../models/symptoms.model');
const sendEmailMessage = require('../utils/mail.util');

/**
 *
 * @param {Object} userData
 * @returns
 */
async function signUp(userData) {
  const rows = await Users.create(userData);
  const data = helper.emptyOrRows(rows);
  return {
    data,
  };
}

/**
 *
 * @param {Object} userData
 * @returns
 */
async function login(userData) {
  const { email, password } = userData;
  const rows = await Users.find({ email, password });
  const data = helper.emptyOrRows(rows);
  // to do
  return {
    data,
  };
}

async function getAllEmergencyContacts() {
  const userData = await Users.find({ email});
  return userData.emergencyContacts;
}

async function sendReport(emailId, sendTo) {
  const patientRecords = await Symptoms.find({ user_email: emailId });
  
  console.log("patientRecords: " + patientRecords);
  const mailOptions = {
    from: "sumitbopche01@gmail.com",
    to: sendTo,
    subject: 'Symtoms Tracking Reports',
    text: JSON.stringify(patientRecords)
  };

  sendEmailMessage(mailOptions);
  return {message: "Report sent successfully"};
}

module.exports = {
  signUp,
  login,
  getAllEmergencyContacts,
  sendReport
};
