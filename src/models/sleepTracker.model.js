const mongoose = require('mongoose');

const sleepTrackerSchema = new mongoose.Schema({
    hoursSlept: {
        type: String,
        required: true
    },
    sleepQuality: {
        type: String,
        required: true
    },
    notes: {
        type: String,
        required: false
    },
    userId: {
        type: String,
        required: false
    }
}, { timestamps: true });

module.exports = mongoose.model('SleepTracker', sleepTrackerSchema);
