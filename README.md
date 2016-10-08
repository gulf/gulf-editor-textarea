# gulf-editor-textarea
[Gulf](http://github.com/gulf/gulf#readme) bindings for textareas and text inputs

 * Compatible with gulf v5 only! (For gulf v4 check out `gulf-textarea` on npm)

## Install

```
npm install --save gulf-editor-textarea
```

## Usage

```
const TextareaDocument = require('gulf-editor-textarea')

var textarea = document.querySelecor('textarea#doc')
var doc = new TextareaDocument({
  editorInstance: document.querySelecor('textarea#doc')
})

stream.pipe(doc.masterLink()).pipe(stream)
```

## API
### class TextareaDocument({editorInstance:HTMLElement, ...}) extends gulf.EditableDocument
  * `editorInstance` -- a texarea Element or an `<input type="text">`to be wired up with gulf
  * `storageAdapter` -- (optional) a gulf storage adapter. Default: `gulf.MemoryAdapter`
  * `ottype` -- (optional) the OT type to use. Default: `ot-text`

## Legal
(c) 2015-2016 by Marcel Klehr

GNU Lesser General Public License
