# swagger-ts-template

Generates a `d.ts` file containing the type definitions from
a swagger `.json` file.

> Check out the `apigen` branch for a fully-fledged type-enabled api consumer!

```javascript
var generator = require('swagger-ts-template')
var source = require('api.json')

let output = generator.merge(source, {hideComments:true})
fs.writeFileSync('api.d.ts', output)
```

## Options

  - **hideComments**: If true, properties descriptions will not be included
    as comments in the generated file.

  - **external**: Formats the types as `export type`, making the file an
    external module.

## CLI

This module may be installed globally and used as a command-line tool.

    npm i swagger-ts-template --global
    tstemplate <source> <dest> [-c] [-e]