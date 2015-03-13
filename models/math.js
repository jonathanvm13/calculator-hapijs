'use strict';

var mongoose = require('../config/database').mongoose;
var schema   = mongoose.Schema;

//create the Schema

var mathSchema   = new schema({
    result: Number,
    description: String
});

mathSchema.methods.insert = function insert (cb) {
    this.save(cb);
    //save is a function of mongoose
    //cb is a callback
    //for learn about callbacks and understand about async js open https://www.youtube.com/watch?v=obaSQBBWZLk
};

mathSchema.statics.getAll = function getAll (cb) {
    this.find({},cb);

    //find is a function of mongoose
    //cb is a callback
};

//create the model
var math = mongoose.model('math', mathSchema);

module.exports = math;
