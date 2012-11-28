//------------------------------------------------------------------------------------------
// staticServerConfigs.js
//
// Define configurations for static servers.
//
// M.Calthrop
// 27 Sep 2012

/**
 * Configurations for static servers.
 *
 * @type {Array}
 *      Each object will contain:
 *          name {String} - a unique name by which this configuration can be referred to
 *          webRoot {String} - the webroot on the local filesystem (absolute)
 *          port {Number} - the port number on which this static server will run
 *                  NOTE: there must be no duplicates of this value in the array.
 *
 *      Example:
 *      {
 *         "name": "Data",
 *         "webRoot": "C:/src/data",
 *         "port": 8082
 *       },
 *       {
 *         "name": "Business",
 *         "webRoot": "C:/src/business",
 *         "port": 8083
 *      }
 */
exports.values = [];

// EOF
//------------------------------------------------------------------------------------------