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

exports.saveOperation= {
    handler: function (req, reply) {

        var newMath;
        newMath = new Math(); // create a new instace from model
        newMath.result = parseInt(req.params.number1) +  parseInt(req.params.number2);
        newMath.description = 'sum operation';

        //insert get a function as param, because in model function insert get a cb(callback)
        // and this cb is a function with two params(find documentation of callback sent
        // for function save of mongoose)

        newMath.insert(function(err,math){
            reply.view('result',{result:math.result});
        })


    },
    description: 'Create and save math operation in database mongo called calculator '
}


exports.getAllOperations= {
    handler: function (req, reply) {

        //getAll is a static method in model File

        Math.getAll(function(err,maths){
            reply.view('show',{maths:JSON.stringify(maths, null, '\t')});
        })

    },
    description: 'Create and save math operation in database mongo called calculator '
}