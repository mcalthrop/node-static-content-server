//------------------------------------------------------------------------------------------
// logs.js
//
// Handle log files.
//
// M.Calthrop
// 26 Sep 2012

var fs = require('fs');
var logFilePath = "./logs/";       // change this to wherever you want to store your logs
var serverLogFileName = createServerLogFileName();

/**
 * Create the name of the log file for the server.
 *
 * @return {String}
 */
function createServerLogFileName() {
    return logFilePath + "server." + Date.now() + ".log";
}

/**
 * Create the name of the main log file for the specified source code grouping.
 *
 * @param identifier {String} the identifier for the code grouping
 * @return {String}
 */
function createLogFileName(identifier) {
    return identifier + ".log";
}

/**
 * Generate a human-readable timestamp.
 *
 * @return {String}
 */
function getTimestamp() {
    return (new Date()).toString();
}

/**
 * Get the name of the log file that contains the latest line in the main log file.
 *
 * @param identifier {String} the identifier for the code grouping
 * @return {String}
 */
exports.getLogFileNameLatest = function (identifier) {
    return createLogFileName(identifier) + ".latest.html";
};

/**
 * Get the name of the log file that contains the main log file for the specified source code grouping,
 * with all logs.
 *
 * @param identifier {String} the identifier for the code grouping
 * @return {String}
 */
exports.getLogFileNameAll = function (identifier) {
    return createLogFileName(identifier);
};

/**
 * Get the name of the log file for the server.
 *
 * @return {String}
 */
exports.getServerLogFileName = function () {
    return serverLogFileName;
};

/**
 * Put text into the server log file.
 *
 * Also log text to console.
 *
 * @param text {String} text to write to server log file and console
 */
exports.putServer = function (text) {
    console.log(text);
    fs.appendFileSync(serverLogFileName, text + '\n');
};

/**
 * Put text into a log file for a given source code grouping.
 *
 * This will write to two places:
 *      1 - the main log file, which contains all data for the specified identifier
 *      2 - the "latest" log file, which contains just the latest results - in HTML format
 *
 * @param identifier {String} the identifier for the code grouping
 * @param text {String} the text to write to the log file
 */
exports.put = function (identifier, text) {
    var logFileName = logFilePath + createLogFileName(identifier);
    var logFileNameLatest = logFilePath + this.getLogFileNameLatest(identifier);
    var username = process.env['USERNAME'];
    var triggeredByHtml = 'Run on server as user <a href="mailto:' + username + '">' + username + '</a>';
    var timestamp = getTimestamp();
    var infoLines = [
        timestamp,
        triggeredByHtml,
        ""
    ];
    var outputLines = infoLines.concat(text.split("\n"));

    console.log("LOG WRITTEN:", identifier, timestamp, logFileName, logFileNameLatest);

    fs.appendFileSync(logFileName, outputLines.join("\n"));
    fs.writeFileSync(logFileNameLatest, outputLines.join("<br>\n"));
};

// EOF
//------------------------------------------------------------------------------------------