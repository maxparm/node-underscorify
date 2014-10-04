# node-underscorify

Underscore precompiler plugin for Browserify.

Inspired and based on [node-hbsfy](https://github.com/epeli/node-hbsfy)

## Setup

Install node-underscorify in your project via npm:

`npm install node-underscorify`

Then use the node-underscorify within the browserify command line transform option:

`browserify -t node-underscorify main.js > bundle.js`

Or add the transform to your `package.json`:

```json
{
    "browserify": {
        "transform": ["node-underscorify"]
    }
}
```

### Custom options

You can configure underscorify via command line options, `package.json` or Javascript API.

On the command line:

```
browserify -t [ node-underscorify --extensions ejs ] main.js > bundle.js
browserify -t [ node-underscorify --extensions html,ejs ] main.js > bundle.js
```

Or in `package.json`:

```json
{
    "browserify": {
        "transform": [
            ["node-underscorify", {
                "extensions": ["jst", "ejs"],
                "requires": [{"variable": "_", "module": "underscore"}]
            }]
        ]
    }
}
```

### Accepted options

- `extensions`: array of file extensions that will be considered as underscore
templates
- `templateSettings`: underscore [template settings](http://underscorejs.org/#template)
- `requires`: array of modules to import. Example: `requires:[{variable: '_', module: 'underscore'}]`

### Advanced setup thru API

node-underscorify can accept custom options using browserify API:

```js
var b = require('browserify')();

var tplTransform = require('node-underscorify').transform({
    extensions: ['ejs', 'html']
});
b.transform(tplTransform);

b.add('./browser/main.js');
b.bundle().pipe(process.stdout);
```

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
