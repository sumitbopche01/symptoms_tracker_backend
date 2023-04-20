const mongoose = require('mongoose');

const medicationTrackerSchema = new mongoose.Schema({
    medicationName: {
        type: String,
        required: true
    },
    dosage: {
        type: String,
        required: true
    },
    timeTaken: {
        type: String,
        required: true
    },
    symptomSeverity: {
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

module.exports = mongoose.model('MedicationTracker', medicationTrackerSchema);
