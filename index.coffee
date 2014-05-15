through = require('through')
_ = require("underscore")
minify = require("html-minifier").minify
path = require('path')

defaultOptions =
    extensions: ['tpl', 'html']
    templateSettings: {}
    htmlMinifier: false
    requires: []

transform = (options) ->
    options = _.defaults(options || {}, defaultOptions)

    return (file) ->
        isTemplate = _.some options.extensions, (ext) ->
            path.extname(file) is '.'+ext

        return through() if not isTemplate
        buffer = ""

        return through(
            (chunk) ->
                buffer += chunk.toString()
        ,
            () ->
                compiled = "";
                if options.requires.length
                    compiled = _.reduce(options.requires, (s, r) ->
                        if r.variable and r.module
                            s += r.variable + ' = require("' + r.module + '");' + "\n"
                        s
                    , '')
                html = buffer.toString()
                if options.htmlMinifier
                    html = minify(html, options.htmlMinifier)
                jst = _.template(
                    html,
                    undefined,
                    options.templateSettings
                    ).source;
                compiled += "module.exports = " + jst + ";\n";
                @queue(compiled)
                @queue(null)
        )

module.exports = transform()
module.exports.transform = transform
