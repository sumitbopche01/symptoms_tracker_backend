const usersService = require("../services/users.service");
const jwt = require("jsonwebtoken");

async function signUp(req, res, next) {
  try {
    res.json(await usersService.signUp(req.body));
  } catch (err) {
    //eslint-disable-next-line no-console
    console.error("Error while signup", err.message);
    next(err);
  }
}

async function login(req, res, next) {
  try {
    res.json(await usersService.login(req.body));
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("Error while login", err.message);
    next(err);
  }
}

async function getAllEmergencyContacts(req, res, next) {
  try {
    const email = req.query.email;
   const a = await usersService.getAllEmergencyContacts(email);
   console.log(a);
   return res.json(a);
  } catch (err) {
    console.error("Error while getAllEmergencyContacts", err.message);
    next(err);
  }
}

async function sendReport(req, res, next) {
  try {
    const emailId = req.query.email;
    const sendTo = req.query.sendTo;
    res.json(await usersService.sendReport(emailId, sendTo));
  } catch (err) {
    console.error('Error while send email', err.message);
    next(err);
  }
}

module.exports = {
  signUp,
  login,
  getAllEmergencyContacts,
  sendReport
};
