'use strict';

var db = require('../config/database').db;
var mongoose = require('../config/database').mongoose;
var Db = require('../node_modules/mongoose/node_modules/mongodb').Db,
    MongoClient = require('../node_modules/mongoose/node_modules/mongodb').MongoClient,
    ObjectID = require('../node_modules/mongoose/node_modules/mongodb').ObjectID;

var schema   = mongoose.Schema;

//create the Schema

var mathSchema   = new schema({
    result: Number,
    description: String
});
var collection = db.collection('math');

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

mathSchema.statics.getMin = function getMin (cb) {
	this.findOne({}, {}, { sort: {'result' : 1 } } , cb) ; 
    //find is a function of mongoose
    //cb is a callback
};

mathSchema.statics.getMax = function getMax (cb) {
	this.findOne({}, {}, { sort: {'result' : -1 } } , cb) ; 

    //find is a function of mongoose
    //cb is a callback
};

mathSchema.statics.findDocument = function findDocument (cb, idToFind) {
	console.log("***1" + idToFind + "***");

//* Could not find how to retrieve adocument by _id. The following two lines were used for this
// var objectIdSearch = ObjectID("5503288d6edbaf941f931aa4");
// console.log("***6#" + objectIdSearch + "***");
	this.find({'result' : idToFind}, cb);

    //find is a function of mongoose
    //cb is a callback
};


mathSchema.statics.deleteDocument = function deleteDocument (cb, idToDelete) {

	this.remove({ 'result' : idToDelete }, cb);

    //find is a function of mongoose
    //cb is a callback
};


//create the model
var MathModel = mongoose.model('math', mathSchema);

module.exports = MathModel;
