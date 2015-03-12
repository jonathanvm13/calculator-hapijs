'use strict';

var mongoose = require('../config/database').mongoose;
var schema   = mongoose.Schema;

//create the Schema

var mathSchema   = new schema({
    result: Number,
    description: String
});

//create the model
var math = mongoose.model('math', mathSchema);

module.exports = math;
