const helper = require("../utils/helper.util");
// const config = require('../configs/general.config');
const Users = require("../models/users.model");
const jwt = require("jsonwebtoken");
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
  const token = jwt.sign({ id: user.id }, process.env.SECRET_TOKEN);
  return {
    data,
    token,
  };
}

async function getAllEmergencyContacts() {
  const userData = await Users.find({ email });
  return userData.emergencyContacts;
}

module.exports = {
  signUp,
  login,
  getAllEmergencyContacts,
};
