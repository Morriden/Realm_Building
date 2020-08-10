const { Router } = require('express');
const Town = require('../models/Town');

module.exports = Router()
  .post('/', (req, res, next) => {
    Town
      .create(req.body)
      .then(town => res.send(town))
      .catch(next);
  })
  .get('/', (req, res, next) => {
    Town
      .find()
      .then(town => res.send(town))
      .catch(next);
  })
  .patch('/:id', (req, res, next) => {
    Town
      .findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then(town => res.send(town))
      .catch(next);
  });
