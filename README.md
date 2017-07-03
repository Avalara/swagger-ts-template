# swagger-ts-template

(quick n dirty script that) Generates a `d.ts` file containing the type definitions from
a swagger `.json` file.

```javascript
var generator = require('swagger-ts-template')
var source = require('api.json')

let output = generator.merge(source, {hideComments:true})
fs.writeFileSync('api.d.ts', output)
```

## Full API client

The `apigen` branch also contains a full-fledged API consumer generator. Check it out!

## Options

  - **hideComments**: If true, properties descriptions will not be included
    as comments in the generated file.

  - **external**: Formats the types as `export type`, making the file an
    external module.

## CLI

This module may be installed globally and used as a command-line tool.

    npm i swagger-ts-template --global
    tstemplate <source> <dest> [-c] [-e]
