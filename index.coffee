through = require('through')
_ = require("underscore")
path = require('path')

defaultOptions =
    extensions: ['tpl', 'html']
    templateSettings: {}

transform = (options) ->
    options = _.defaults(options || {}, defaultOptions)

    return (file) ->
        # test if it matches one the extensions
        isTemplate = _.some options.extensions, (ext) ->
            # extname returns '.html' not 'html'
            path.extname(file) is '.'+ext

        return through() if not isTemplate
        buffer = ""

        return through(
            (chunk) ->
                buffer += chunk.toString()
        ,
            () ->
                compiled = "_ = require('underscore');\n";
                jst = _.template(
                    buffer.toString(),
                    undefined,
                    options.templateSettings
                    ).source;
                compiled += "module.exports = " + jst + ";\n";
                @queue(compiled)
                @queue(null)
        )

module.exports = transform()
module.exports.transform = transform
