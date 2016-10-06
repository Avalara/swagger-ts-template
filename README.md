# swagger-ts-codegen

Generates a `d.ts` file containing the type definitions from
a swagger `.json` file.

_This is a simple node script and is not related with the swagger-codegen
structure. (**)_

```javascript
var generator = require('swagger-ts-codegen')
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

    npm i swagger-ts-codegen --global
    tscodegen <source> <dest> [-c]

_(**) Do not expect full swagger coverage; this is mostly a script I used
internally and wanted to publish._