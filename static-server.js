//------------------------------------------------------------------------------------------
// static-server.js
//
// Set up one or more HTTP servers to serve up only static files that live on
// the local filesystem.
//
// NOTE: this is *not* a proxy. All it does is match the URL provided to a file
// on the local FS, and serves it up.
//
// M.Calthrop
// 24 Sep 2012

(function () {
    var http = require('http'),
        fs = require('fs'),
        util = require('util'),
        logs = require('./logs'),
        staticServerConfigs = require('./staticServerConfigs'),
        urlMappings = require('./urlMappings'),
        contentTypeMappings = require('./contentTypeMappings'),
        browserDetect = require('./browserDetect');

    /**
     * Serve up a file from the local filesystem.
     *
     * @param response {http.ServerResponse} the response on which to write the file
     * @param file {String} the absolute file name to send
     * @param port {Number} the port number on which this server listens - just used for console logging
     * @param ipAddress {String} the IP address the request came from
     * @param browserName {String} text describing the browser name
     */
    function serveFile(response, file, port, ipAddress, browserName) {
        fs.exists(file, function (exists) {
            if (!exists) {
                logs.putServer('ERROR: File does not exist: ' + file);

                response.statusCode = 404;
                // very simple body response returned:
                response.write("404: File does not exist locally: " + file);
                response.end();
                return;
            }

            var fileExtension = file.match(/[^.]*$/)[0];
            var contentType = (fileExtension in contentTypeMappings.values) ? contentTypeMappings.values[fileExtension] : "application/octet-stream";

            // source: http://stackoverflow.com/questions/10046039/nodejs-send-file-in-response
            var stat = fs.statSync(file);
            var headers = {
                'Content-Type': contentType,
                'Content-Length': stat.size
            };

            response.writeHead(200, headers);
            var readStream = fs.createReadStream(file);
            util.pump(readStream, response);

            logs.putServer(port + " " + ipAddress + " " + browserName + " " + file);
        });
    }

    /**
     * Given a port, get the webroot for it.
     *
     * @param {Number} port the port number
     * @return {String} the webroot for that port
     */
    function getWebRootForPort(port) {
        var webRoot = "";

        for (var i = 0, len = staticServerConfigs.values.length ; i < len ; i++) {
            var config = staticServerConfigs.values[i];

            if (config.port == port) {
                webRoot = config.webRoot;
                break;
            }
        }

        return webRoot;
    }

    /**
     * Create an absolute local file name.
     *
     * @param url {String} the URL passed in to the web server
     * @param webRoot {String} the local filesystem webroot
     * @param data {String} any data that was passed in to the request
     * @return {String}
     */
    function createLocalFileName(url, webRoot, data) {
        var urlWithoutQueryString = url.replace(/^([^?]*).*/, "$1");

        // Check to see if there is a mapping for this URL
        for (var i = 0, len = urlMappings.values.length ; i < len ; i++) {
            var urlMapping = urlMappings.values[i];
            var matches = urlWithoutQueryString.match(urlMapping.pattern);

            if (matches) {
                urlWithoutQueryString = urlMapping.getUrlSubstitution(matches, data);

                break;
            }
        }

        return webRoot + urlWithoutQueryString;
    }

    /**
     * The main function that does the work.
     */
    function main() {
        var config;
        var httpServer;
        var serverMessage = '\
---\n\
Starting static server: ' + (new Date()).toString() + " as user " + process.env["USERNAME"] + '\n';

        logs.putServer(serverMessage);

        for (var i = 0, len = staticServerConfigs.values.length ; i < len ; i++) {
            config = staticServerConfigs.values[i];
            serverMessage = "HTTP server created: " + config.port + " " + config.name + " " + config.webRoot;
            httpServer = http.createServer();

            httpServer.on('request', function (request, response) {
                var port = request.headers.host.split(":")[1];
                var userAgent = request.headers['user-agent'];
                var browserName = browserDetect.browserName(userAgent);
                var ipAddress = request.connection.remoteAddress;
                var webRoot = getWebRootForPort(port);
                var data = '';

                request.setEncoding('utf8');

                request.on('data', function (chunk) {
                    data += chunk;
                });

                request.on('end', function () {
                    var localFileName = createLocalFileName(request.url, webRoot, data);

                    serveFile(response, localFileName, port, ipAddress, browserName);
                });
            });

            httpServer.listen(config.port);

            logs.putServer(serverMessage);
        }

        logs.putServer(" ");
    }

    main();
}());

// EOF
//------------------------------------------------------------------------------------------