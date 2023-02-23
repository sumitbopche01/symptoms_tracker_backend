const reminderService = require('../services/reminder.service');

async function get(req, res, next) {
    try {
      res.json(await reminderService.getSingle(req.params.symptoms_id));
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Error while getting reminder', err.message);
      next(err);
    }
  }
  
  
  async function getMultiple(req, res, next) {
    try {
      res.json(await reminderService.getMultiple(req.query));
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Error while getting multiple reminder', err.message);
      next(err);
    }
  }
  
  async function create(req, res, next) {
    try {
      res.json(await reminderService.create(req.body));
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Error while creating reminder', err.message);
      next(err);
    }
  }
  
  async function update(req, res, next) {
    try {
      res.json(await reminderService.update(req.params.id, req.body));
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Error while updating reminder', err.message);
      next(err);
    }
  }
  
  async function remove(req, res, next) {
    try {
      res.json(await reminderService.remove(req.params.id));
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Error while deleting reminder', err.message);
      next(err);
    }
  }
  
  async function showDataView(req, res, next) {
    try {
      // call and get data from service
      res.render('showReminder', await reminderService.getMultiple(req.query));
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Error while showing reminders using pages', err.message);
      next(err);
    }
  }
  
  async function insertDataView(req, res, next) {
    try {
      res.render('insertReminderForm');
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Error while inserting a new Reminder', err.message);
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