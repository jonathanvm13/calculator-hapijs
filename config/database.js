'use strict';

var mongoose = require('mongoose');
var config = require('./config');

// load database
var url = 'mongodb://localhost/' + config.mongo.db;

try {
    mongoose.connect(url);
    console.log('Trying to connect to database: ' + url);
} catch (err) {
    console.log('Mongoose database initialization failed ' , err.message);
}
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'Mongoose database connection error'));
db.once('open', function callback() {
    console.log('Mongoose database connection succeeded: ' + url);
});

// When the connection is disconnected
db.on('disconnected', function () {
    console.log('Mongoose database connection disconnected: ' + url);
});

var gracefulExit = function() {
    db.close(function () {
        console.log('Mongoose database connection disconnected through app termination: ' + url);
        process.exit(0);
    });
}
// If the Node process ends, close the Mongoose connection
process.on('SIGINT', gracefulExit).on('SIGTERM', gracefulExit);

exports.mongoose = mongoose;
exports.db = db;