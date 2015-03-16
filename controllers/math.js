'use strict';

var DataBase = require('../config/database'),
    MathModel = require('../models/math');

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
        newMath = new MathModel(); // create a new instaNce from model
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
        MathModel.getAll(function(err,maths){
            reply.view('show',{string:'Table:', maths:JSON.stringify(maths, null, '\t')});
        })
    },
    description: 'Create and save math operation in database mongo called calculator '
}

exports.getMin= {
    handler: function (req, reply) {

        //getMin is a static method in model File

        MathModel.getMin(function(err,maths){
            reply.view('show', {string:'Minimum:', maths:JSON.stringify(maths,['result'], '\t')});
        })

    },
    description: 'Show the minimum value in the database '
}

exports.getMax= {
    handler: function (req, reply) {

        //getMax is a static method in model File

        MathModel.getMax(function(err,maths){
            reply.view('show', {string:'Maximum:', maths:JSON.stringify(maths, ['result'], '\t')});
        })

    },
    description: 'Show the maximum value in the database '
}

exports.deleteDocument = {
    handler: function (req, reply) {

        //deleteDocument is a static method in model File
        MathModel.deleteDocument( function(err,maths){

            //use getAll to show table after delete of document
            MathModel.getAll(function(err,maths){
                // Showing the whole table after delete to show if delete succeeded. Not sure if there's another way
                reply.view('show',{string:'Table after delete:', maths:JSON.stringify(maths, null, '\t')})
            });
        }, req.params.idToDelete)

    },
    description: 'Delete a document from table "math" in the database '
}

exports.findDocument = {
    handler: function (req, reply) {

        //findDocument is a static method in model File

        MathModel.findDocument( function(err,maths){

            if (maths.length > 0) { 
                reply.view('show', {string:'Document found:', maths:JSON.stringify(maths, ['result'], '\t')});
            } else {
               reply.view('show', {string:'No documents found for id: ', maths: req.params.idToFind});
 
            }
        }, req.params.idToFind)

    },
    description: 'Find a document in table "math" in the database '
}


exports.saveAdd= {
    handler: function (req, reply) {
 
        var newMath;
        newMath = new MathModel(); // create a new instaNce from model
        newMath.result = parseInt(req.params.number1) +  parseInt(req.params.number2);
        newMath.description = 'sum operation';

        //insert get a function as param, because in model function insert get a cb(callback)
        // and this cb is a function with two params(find documentation of callback sent
        // for function save of mongoose)

        newMath.insert(function(err,math){
            reply.view('result',{result:math.result,
                number1:req.params.number1, number2:req.params.number2,
                operation:"plus"});
        })

    },
    description: 'Create and save math operation in database mongo called calculator '
}


exports.saveSubtract = {
    handler: function (req, reply) {
 
        var newMath;
        newMath = new MathModel(); // create a new instaNce from model
        newMath.result = parseInt(req.params.number1) +  parseInt(req.params.number2);
        newMath.description = 'subtract operation';
        
        newMath.insert(function(err,math){
            reply.view('operation',
                {result:parseInt(req.params.number1) - parseInt(req.params.number2),
                    number1:req.params.number1, number2:req.params.number2,
                    operation:"minus" });
        })        
    },
    description: 'Subtract number2 from number1 and show in html view'
}
exports.saveMultiply = {
    handler: function (req, reply) {
 
        var newMath;
        newMath = new MathModel(); // create a new instaNce from model
        newMath.result = parseInt(req.params.number1) +  parseInt(req.params.number2);
        newMath.description = 'multiply operation';
        
        newMath.insert(function(err,math){
            reply.view('operation',
                {result:parseInt(req.params.number1) * parseInt(req.params.number2),
                    number1:req.params.number1, number2:req.params.number2,
                    operation:"multiplied by" });
        })            
    },
    description: 'Multiply number1 by number2 and show in html view'
}
exports.saveDivide = {
    handler: function (req, reply) {
  
        var newMath;
        newMath = new MathModel(); // create a new instaNce from model
        newMath.result = parseInt(req.params.number1) +  parseInt(req.params.number2);
        newMath.description = 'divide operation';
       
        newMath.insert(function(err,math){
            reply.view('operation',
                {result:parseInt(req.params.number1) / parseInt(req.params.number2),
                    number1:req.params.number1, number2:req.params.number2,
                    operation:"divided by" 
                });
        })            
    },
    description: 'divide number1 by number2 and show in html view'
}
exports.savePower = {
    handler: function (req, reply) {
 
        var newMath;
        newMath = new MathModel(); // create a new instaNce from model
        newMath.result = parseInt(req.params.number1) +  parseInt(req.params.number2);
        newMath.description = 'power operation';
        
        newMath.insert(function(err,math){
            reply.view('operation',
                {result: Math.pow(parseInt(req.params.number1) , parseInt(req.params.number2)), 
                    number1:req.params.number1, number2:req.params.number2,
                    operation:"to the power of" });
        })
    },
    description: 'Compute number1 to the power of number2 and show in html view'
} 
exports.saveModulus = {
    handler: function (req, reply) {
 
        var newMath;
        newMath = new MathModel(); // create a new instaNce from model
        newMath.result = parseInt(req.params.number1) +  parseInt(req.params.number2);
        newMath.description = 'modulus operation';
        
        newMath.insert(function(err,math){
            reply.view('operation',
                {result:parseInt(req.params.number1) % parseInt(req.params.number2),
                    number1:req.params.number1, number2:req.params.number2,
                    operation:"modulus" });
        })    
    },
    description: 'Compute number1 modulus number2 and show in html view'
}
