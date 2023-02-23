const mongoose = require('mongoose');

const ReminderSchema = new mongoose.Schema({
  user_email: { 
    type: String, 
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  date: {
    type: Date,
    required: true
  },
  isReminderSet: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('reminders', ReminderSchema);

