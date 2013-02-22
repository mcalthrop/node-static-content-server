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
 *          version {String} - a version for this config item
 *                  This allows you to server up different versions of the same code,
 *                  but on different ports
 *          webRoot {String} - the webroot on the local filesystem (absolute)
 *          port {Number} - the port number on which this static server will run
 *                  NOTE: there must be no duplicates of this value in the array.
 *          vcsPaths {Object} - contains configs for VCS paths
 *                  Each looks like this:
 *                      "identifier": {
 *                          "vcsSourcePath": <VCS_SOURCE_PATH>,
 *                          "checkoutDestDir": <CHECKOUT_DEST_DIR>
 *                      }
 *
 *      For examples, see the code below.
 */
exports.values = [
    {
        "name": "Data",
        "version": "1.0",
        "webRoot": "C:/src/data/v1.0",
        "port": 8082,
        "vcsPaths": {
            "all": {
                "vcsSourcePath": "$/src/data/v1.0",   // these examples use a TFS path
                "checkoutDestDir": "C:/src/data/v1.0"
            }
        },
        "name": "Data",
        "version": "1.1",
        "webRoot": "C:/src/data/v1.1",
        "port": 8083,
        "vcsPaths": {
            "all": {
                "vcsSourcePath": "$/src/data/v1.1",
                "checkoutDestDir": "C:/src/data/v1.1"
            }
        },
        "name": "Business",
        "version": "1.0",
        "webRoot": "C:/src/business/v1.0",
        "port": 8084,
        "vcsPaths": {
            "JS": {
                "vcsSourcePath": "$/src/business/v1.0/js",
                "checkoutDestDir": "C:/src/business/v1.0/js"
            },
            "CSS": {
                "vcsSourcePath": "$/src/business/v1.0/css",
                "checkoutDestDir": "C:/src/business/v1.0/css"
            },
            "Images": {
                "vcsSourcePath": "$/src/business/v1.0/img",
                "checkoutDestDir": "C:/src/business/v1.0/img"
            }
        }
    }
];

/**
 * Find a VCS source path in the config object that matches the parameters provided.
 * @param vcsCodebase {String}
 * @param vcsVersion {String}
 * @param vcsSourcePath {String}
 * @return {Object}
 */
exports.findVcsPath = function (vcsCodebase, vcsVersion, vcsSourcePath) {
    var returnValue = null;

    for (var staticServerConfig in this.values) {
        var name = staticServerConfig["name"];
        var version = staticServerConfig["version"];

        if (name == vcsCodebase && version == vcsVersion) {
            var vcsPaths = staticServerConfig["vcsPaths"];

            for (var vcsPathName in vcsPaths) {
                if (vcsPathName == vcsSourcePath) {
                    returnValue = vcsPaths[vcsPathName];

                    break;
                }
            }

        }
    }

    return returnValue;
}

// EOF
//------------------------------------------------------------------------------------------