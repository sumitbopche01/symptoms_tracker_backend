// load mongoose since we need it to define a model
const mongoose = require('mongoose');
const { number } = require('joi');

const { Schema } = mongoose;

const SymptomScaleSchema = new Schema({
  name: { type: String },
  scale: { type: Number }
});

const SymptomsSchema = new Schema({
  user_email: { type: String },
  symptoms: [SymptomScaleSchema],
  date: { type: Date }
});

module.exports = mongoose.model('symptoms', SymptomsSchema);
