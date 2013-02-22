//------------------------------------------------------------------------------------------
// tfsget.js
//
// Handle requirement to trigger a TFS GET action.
//
// M.Calthrop
// 26 Sep 2012

var execFile = require('child_process').execFile;
var logs = require('./logs');
var staticServerConfigs = require('./staticServerConfigs');

/**
 * Trigger a TFS GET for the given source code grouping.
 *
 * This is encapsulated in an existing batch file.
 *
 * Parameters should correspond to appropriate values in staticServerConfigs.
 *
 * @param codebase {String} the identifier for the code grouping
 * @param version {String} version to use
 * @param sourcePath {String} local sourcePath
 */
exports.trigger = function (codebase, version, sourcePath) {
    var file = "tfsget.bat";
    var vcsPath = staticServerConfigs.findVcsPath(codebase, version, sourcePath);
    var args = [vcsPath.vcsSourcePath, vcsPath.checkoutDestDir];
    var options = {
        cwd: './bat'
    };
    var serverMessage = "TFS GET triggered: " + [codebase, version, sourcePath].join("/");

    logs.putServer(serverMessage);

    execFile(
        file,
        args,
        options,
        function (error, stdout, stderr) {
            var tfsGetMessage = '';

            serverMessage = "TFS GET complete: " + identifier;
            if (error) {
                tfsGetMessage += "***** " + error + "\n";
                serverMessage += "\n" + error;
            }

            tfsGetMessage += stdout + "\n" + stderr;

            logs.putServer(serverMessage);
            logs.put(identifier, tfsGetMessage);
        }
    );
};

// EOF
//------------------------------------------------------------------------------------------