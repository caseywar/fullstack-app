const { Router } = require('express');
const Favor = require('../models/Favor');

module.exports = Router()
    .post('/', (req, res, next) => {
        Favor.insert(req.body)
        .then((favor) => res.send(favor))
        .catch(next);
    })

    .get('/', (req, res, next) => {
        Favor.find()
        .then((favors) => res.send(favors))
        .catch(next);
    })