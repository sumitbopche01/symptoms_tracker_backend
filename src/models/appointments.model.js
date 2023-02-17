const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    patientName: {
        type: String,
        required: true
    },
    hospitalId: {
        type: String,
        required: true
    },
    doctorName: {
        type: String,
        required: true
    },
    appointmentDateTime: {
        type: Date,
        required: true
    },
    appointmentType: {
        type: String,
        required: true,
        enum: ['general','follow-up','urgent']
    },
    status: {
        type: String,
        required: true,
        enum: ['scheduled', 'completed', 'cancelled']
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Appointment', appointmentSchema);
