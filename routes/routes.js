'use strict';

var Math = require('../controllers/math');

// Contains the list of all routes, i.e. methods, paths and the config functions
// that take care of the actions

exports.endpoints = [
    { method: 'GET', path: '/{name}', config: Math.hello },
    { method: 'GET', path: '/sum/{number1}/{number2}', config: Math.saveOperation },
    { method: 'GET', path: '/results', config: Math.getAllOperations }
]