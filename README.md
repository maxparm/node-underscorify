# node-underscorify

Underscore precompiler plugin for Browserify v2.

Inspired and based on [node-hbsfy](https://github.com/epeli/node-hbsfy)

## Usage

Install node-underscorify:

    npm install node-underscorify

Then use it as Browserify transform module with `-t`:

    browserify -t node-underscorify main.js > bundle.js

Then in your code

```javascript
var template = require("./template.html");
document.body.innerHTML = template({ name: "Node Underscorify" });
```

and template.html:

```html
<h1>Hello {{name}}!</h1>
```

You can also use .tpl files.
