# node-underscorify

Underscore precompiler plugin for Browserify v2.

Inspired and based on [node-hbsfy](https://github.com/epeli/node-hbsfy)

## Setup

Install node-underscorify in your project via npm:

`npm install node-underscorify`

Then use the node-underscorify within the browserify command line transform option:

`browserify -t node-underscorify main.js > bundle.js`


## Usage

##### template.html
```
<div><%= message %></div>
```

##### main.js
```
var template = require("./template.html");
document.body.innerHTML = template({message: "Hello Node Underscorify!"});
```

It will render: `<div>Hello Node Underscorify!</div>`


More informations: https://npmjs.org/package/node-underscorify