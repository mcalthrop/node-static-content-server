//------------------------------------------------------------------------------------------
// browserDetect.js
//
// Implement browser detection from user agent.
//
// M.Calthrop
// 5 Oct 2012

/**
 * Class that implements a browser detection based upon a provided user agent string.
 *
 * Source: http://www.quirksmode.org/js/detect.html (modified)
 */
var BrowserDetect = {
    init: function (userAgent) {
        this.userAgent = userAgent;
        this.browser = this.searchString(this.dataBrowser) || "-";
        this.version = this.searchVersion(this.userAgent) || "-";
    },
    searchString: function (data) {
        var dataString = this.userAgent;

        for (var i = 0 ; i < data.length ; i++) {
            var dataProp = data[i].prop;
            this.versionSearchString = data[i].versionSearch || data[i].identity;
            if (dataString) {
                if (dataString.indexOf(data[i].subString) != -1) {
                    return data[i].identity;
                }
            }
            else if (dataProp) {
                return data[i].identity;
            }
        }
    },
    searchVersion: function (dataString) {
        var index;

        if (!dataString) {
            return;
        }

        index = dataString.indexOf(this.versionSearchString);
        if (index == -1) {
            return;
        }

        return dataString.substring(index + this.versionSearchString.length + 1).split(" ")[0].replace(';', '');
    },
    dataBrowser: [
        {
            subString: "Chrome",
            identity: "Chrome"
        },
        {
            subString: "OmniWeb",
            versionSearch: "OmniWeb/",
            identity: "OmniWeb"
        },
        {
            subString: "Firefox",
            identity: "Firefox"
        },
        {        // for newer Netscapes (6+)
            subString: "Netscape",
            identity: "Netscape"
        },
        {
            subString: "MSIE",
            identity: "IE",
            versionSearch: "MSIE"
        },
        {
            subString: "Gecko",
            identity: "Mozilla",
            versionSearch: "rv"
        },
        {         // for older Netscapes (4-)
            subString: "Mozilla",
            identity: "Netscape",
            versionSearch: "Mozilla"
        }
    ]
};

/**
 * Given a user-agent string, return a human-readable browser version
 *
 * @param userAgent {String} user-agent as provided by the browser
 * @return {String}
 */
exports.browserName = function (userAgent) {
    BrowserDetect.init(userAgent);

    return BrowserDetect.browser + "/" + BrowserDetect.version;
};

// EOF
//------------------------------------------------------------------------------------------