//------------------------------------------------------------------------------------------
// urlMappings.js
//
// Define mappings for URLs.
//
// M.Calthrop
// 27 Sep 2012

var logs = require('./logs'),
    logFilePath = "/logs/";

/**
 * Map a URL regex to a function that returns the corresponding local file name.
 *
 * @type {Array}
 *      Each object contains the following elements:
 *          pattern {RegExp} - the regular expression that will be used to match against
 *                  the provided URL
 *          getUrlSubstitution {Function} - a function that returns the name of the file
 *                  on the local filesystem
 *                  @param matched {Array} - the results of doing a regex match() of the provided
 *                          URL against the {pattern} provided
 */
exports.values = [
    {
        pattern: /^\/$/,
        getUrlSubstitution: function () {
            return "/index.html";
        }
    },
    {
        pattern: /\/sandbox$/,
        getUrlSubstitution: function () {
            return "/index.sandbox.html";
        }
    },
    {
        pattern: /^\/admin$/,
        getUrlSubstitution: function () {
            return "/admin.html";
        }
    },
    {
        pattern: /^\/admin\/log\/latest\/(.*)/,
        getUrlSubstitution: function (matched) {
            return logFilePath + logs.getLogFileNameLatest(matched[1]);
        }
    },
    {
        pattern: /^\/admin\/log\/all\/(.*)/,
        getUrlSubstitution: function (matched) {
            return logFilePath + logs.getLogFileNameAll(matched[1]);
        }
    },
    {
        pattern: /^\/admin\/log\/server$/,
        getUrlSubstitution: function () {
            return logFilePath + logs.getServerLogFileName();
        }
    }
];

// EOF
//------------------------------------------------------------------------------------------