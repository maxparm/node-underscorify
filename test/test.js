/*jshint node: true*/

var fs = require("fs");
var assert = require("assert");

var underscorify = require("../index").transform({htmlMinifier: false});
var underscorify2 = require("../index").transform({
  htmlMinifier: {collapseWhitespace: true, removeComments: true}
});

var templatePath = __dirname + "/template.html";
var exported = __dirname + "/template.js";
var exported2 = __dirname + "/template2.js";

try {
  fs.unlinkSync(exported);
} catch (err) { }

// underscorify
fs.createReadStream(templatePath)
.pipe(underscorify(templatePath))
.pipe(fs.createWriteStream(exported))
.on("close", function () {
  var template = require(exported);
  var res = template({msg: "hi!"});
  assert.equal(res, "<h1>hi!</h1> <p> test </p>");
});

// underscorify with minifier
fs.createReadStream(templatePath)
.pipe(underscorify2(templatePath))
.pipe(fs.createWriteStream(exported2))
.on("close", function () {
  var template = require(exported2);
  var res = template({msg: "hello!"});
  assert.equal(res, "<h1>hello!</h1><p>test</p>");
});