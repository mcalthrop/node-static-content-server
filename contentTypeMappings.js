//------------------------------------------------------------------------------------------
// contentTypeMappings.js
//
// Define mappings for content types.
//
// M.Calthrop
// 27 Sep 2012

/**
 * Mapping between a filename extension and its corresponding HTTP content type.
 *
 * @type {Object}
 *      key: the suffix of the file (without leading ".")
 *          eg: "jpg"
 *      value: the content type associated with that file suffix
 *          eg: "image/jpeg"
 */
exports.values = {
    "txt": "text/plain",
    "log": "text/plain",
    "js": "application/x-javascript",
    "jpeg": "image/jpeg",
    "jpg": "image/jpeg",
    "json": "application/json",
    "gif": "image/gif",
    "png": "image/png",
    "css": "text/css",
    "html": "text/html",
    "htm": "text/html",
    "xml": "text/xml",
    "aspx": "text/html",
    "ico": "image/x-icon"
};

// EOF
//------------------------------------------------------------------------------------------