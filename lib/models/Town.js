const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
  location: {
    type: String,
    required: true,
    enum: ['farmland', 'mine', 'pasture', 'quarry', 'river', 'woodland']
  }
});

const towns = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  food: {
    type: Number,
    required: true,
    default: 0
  },
  law: {
    type: Number,
    required: true,
    default: 0
  },
  population: {
    type: Number,
    required: true,
    default: 0
  },
  Production: {
    type: Number,
    required: true,
    default: 0
  },
  traffic: {
    type: Number,
    required: true,
    default: 0
  },
  location: [locationSchema]

});

module.exports = mongoose.model('Town', towns);
