// Generated by CoffeeScript 1.8.0
var defaultOptions, minify, path, through, transform, _;

through = require('through');

_ = require("underscore");

minify = require("html-minifier").minify;

path = require('path');

defaultOptions = {
  extensions: ['tpl', 'html'],
  templateSettings: {},
  htmlMinifier: false,
  requires: []
};

transform = function(instance_opts) {
  instance_opts = _.defaults(instance_opts  || {}, defaultOptions);
  return function(file, opts) {
    var buffer, isTemplate, options;
    if (typeof opts['extensions'] === 'string') {
      opts['extensions'] = opts['extensions'].split(',');
    }
    options = _.defaults(opts  || {}, instance_opts);
    isTemplate = _.some(options.extensions, function(ext) {
      return path.extname(file) === '.' + ext;
    });
    if (!isTemplate) {
      return through();
    }
    buffer = "";
    return through(function(chunk) {
      return buffer += chunk.toString();
    }, function() {
      var compiled, html, jst;
      compiled = "";
      if (options.requires.length) {
        compiled = _.reduce(options.requires, function(s, r) {
          if (r.variable && r.module) {
            s += r.variable + ' = require("' + r.module + '");' + "\n";
          }
          return s;
        }, '');
      }
      html = buffer.toString();
      if (options.htmlMinifier) {
        html = minify(html, options.htmlMinifier);
      }
      jst = _.template(html, void 0, options.templateSettings).source;
      compiled += "module.exports = " + jst + ";\n";
      this.queue(compiled);
      return this.queue(null);
    });
  };
};

module.exports = transform();

module.exports.transform = transform;
