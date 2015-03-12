'use strict';

var DataBase = require('../config/database'),
    Math = require('../models/math');

// HANDLERS FOR OUR API
// =============================================================================

exports.hello = {
    handler: function (req, reply) {
        console.log(req.params.name);
        reply.view('index',{name:req.params.name});
    },
    description: 'Hello world'
}