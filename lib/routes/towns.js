const { Router } = require('express');
const Town = require('../models/Town');

module.exports = Router()
  .post('/', (req, res, next) => {
    Town
      .create(req.body)
      .then(town => res.send(town))
      .catch(next);
  });
