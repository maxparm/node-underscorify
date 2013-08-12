# underscorify

Underscore precompiler plugin for Browserify v2.

Inspired and based on [node-hbsfy](https://github.com/epeli/node-hbsfy)

## Usage

Install underscorify:

    npm install underscorify

Then use it as Browserify transform module with `-t`:

    browserify -t underscorify main.js > bundle.js

Then in your code

```javascript
var template = require("./template.html");
document.body.innerHTML = template({ name: "Underscorify" });
```

and template.html:

```html
<h1>Hello {{name}}!</h1>
```

You can also use .tpl files.
