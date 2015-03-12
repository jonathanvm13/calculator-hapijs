'use strict';

// BASE SETUP
// =============================================================================

// call the packages we need
// setup the configuration and routes we need
var hapi = require('hapi'),
    config = require('./config/config'),
    routes = require('./routes/routes'),
    good = require('good'),
    swagger = require('hapi-swagger/package'),
    path = require('path');


// initialize the server
var port = config.server.api.port || 6000,
    host = config.server.api.host || 'localhost';


var server = new hapi.Server(host, port);

// START THE SERVER
// =============================================================================
// setup swagger options & good options
var swaggerOptions = {
        basePath: 'http://' + host + ':' + port,
        apiVersion: swagger.version
    },
    goodOptions = {
    };

// adds swagger self documentation plugin & good process monitor

server.pack.register([
        {plugin: require('good'), options: goodOptions},
        {plugin: require('hapi-swagger'), options: swaggerOptions}
    ],
    function (err) {
        if (err) {
            console.log(['error'], 'plugin "hapi-swagger" load error: ' + err);
            console.log(['error'], 'plugin "good" load error: ' + err);
            return; // something bad happened loading the plugin(s)
        } else {

            server.views({
                engines: {
                    hbs: require('handlebars')
                },
                path: path.join(__dirname, 'views')
            });

// REGISTER OUR ROUTES -------------------------------
            server.route(routes.endpoints);

            console.log(['start'], 'swagger interface loaded');
            console.log(['start'], 'good interface loaded');
            server.start(function () {
                server.log('info', 'Server running at: ' + server.info.uri);
            });
        }
    }
);


