# node-underscorify

Underscore precompiler plugin for Browserify v2.

Inspired and based on [node-hbsfy](https://github.com/epeli/node-hbsfy)

## Setup

Install node-underscorify in your project via npm:

`npm install node-underscorify`

Then use the node-underscorify within the browserify command line transform option:

`browserify -t node-underscorify main.js > bundle.js`

### Advanced setup thru API

node-underscorify can accept custom options unsing browserify API:

```js
var b = require('browserify')();

var tplTransform = require('node-underscorify').transform({
    extensions: ['ejs', 'html']
});
b.transform(tplTransform);

b.add('./browser/main.js');
b.bundle().pipe(process.stdout);
```

Accepted options:
- `extensions`: array of file extensions that will be considered as underscore
templates
- `templateSettings`: underscore [template settings](http://underscorejs.org/#template)
- `requires`: array of modules to import. Example: `requires:[{variable: '_', module: 'underscore'}]`

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
