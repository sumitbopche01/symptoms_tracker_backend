const symptomsService = require("../services/symptoms.service");
const jwt = require("jsonwebtoken");

async function get(req, res, next) {
  try {
    res.json(await symptomsService.getSingle(req.params.symptoms_id));
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("Error while getting restaurants", err.message);
    next(err);
  }
}

async function getMultiple(req, res, next) {
  console.log("called");
  try {
    // Get the token from the Authorization header
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    // if (!token) {
    //   // If there is no token, return an error response
    //   return res.status(401).json({ message: "Unauthorized" });
    // }

    // Verify the token with the secret key
    // jwt.verify(token, process.env.SECRET_TOKEN, async (err, user) => {
    //   if (err) {
    //     // If the token is invalid, return an error response
    //     return res.status(403).json({ message: "Forbidden" });
    //   }

    //   // If the token is valid
    //   res.send(await symptomsService.getMultiple(req.query));
    // });
    res.send(await symptomsService.getMultiple(req.query));
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("Error while getting multiple restaurants", err.message);
    next(err);
  }
}

async function create(req, res, next) {
  try {
    res.json(await symptomsService.create(req.body));
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("Error while creating restaurant", err.message);
    next(err);
  }
}

async function update(req, res, next) {
  try {
    res.json(await symptomsService.update(req.params.id, req.body));
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("Error while updating restaurant", err.message);
    next(err);
  }
}

async function remove(req, res, next) {
  try {
    res.json(await symptomsService.remove(req.params.id));
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("Error while deleting restaurant", err.message);
    next(err);
  }
}

async function showDataView(req, res, next) {
  try {
    // call and get data from service
    res.render("showRestaurants", await symptomsService.getMultiple(req.query));
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("Error while showing restaurants using pages", err.message);
    next(err);
  }
}

async function insertDataView(req, res, next) {
  try {
    res.render("insertRestaurantForm");
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("Error while inserting a new restaurant", err.message);
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
