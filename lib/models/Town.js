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
  production: {
    type: Number,
    required: true,
    default: 0
  },
  traffic: {
    type: Number,
    required: true,
    default: 0
  },
  location: {
    type: String,
    required: true,
    enum: ['farmland', 'mine', 'pasture', 'quarry', 'river', 'woodland']
  }

});

module.exports = mongoose.model('Town', towns);
