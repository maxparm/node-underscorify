/*jshint node: true*/

var fs = require("fs");
var assert = require("assert");

var underscorify = require("../index");

var templatePath = __dirname + "/template.html";
var exported = __dirname + "/template.js";

try {
  fs.unlinkSync(exported);
} catch (err) { }

fs.createReadStream(templatePath)
.pipe(underscorify(templatePath))
.pipe(fs.createWriteStream(exported))
.on("close", function () {
  var template = require(exported);
  var res = template({msg: "hi!"});
  assert.equal(res, "<h1>hi!</h1>\n");
});

