through = require('through')
_ = require("underscore")


module.exports = (file) ->
    return through() if (!/\.tpl|\.html/.test(file))
    buffer = ""

    return through(
        (chunk) ->
            buffer += chunk.toString()
    ,
        () ->
            compiled = "_ = require('underscore');\n";
            jst = _.template(buffer.toString()).source;
            compiled += "module.exports = " + jst + ";\n";
            @queue(compiled)
            @queue(null)
    )

