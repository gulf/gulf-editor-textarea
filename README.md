# gulf-editor-textarea
[Gulf](http://github.com/marcelklehr/gulf#readme) bindings for textareas and text inputs

 * Compatible with gulf v5 only! (For gulf v4 check out `gulf-textarea` on npm)

## Install

```
npm install --save gulf gulf-editor-textarea ot-text
```

## Usage

```
const textOT = require('ot-text').type
const TextareaDocument = require('gulf-editor-textarea')

var textarea = document.querySelecor('textarea#doc')
var doc = new TextareaDocument({
  storageAdapter: new gulf.MemoryAdapter
, ottype: textOT
, editorInstance: textarea
})

stream.pipe(doc.masterLink()).pipe(stream)
```

## API
### class TextareaDocument({editorInstance:HTMLElement, ...}) extends gulf.EditableDocument
  * `editorInstance` -- a texarea Element or an `<input type="text">`to be wired up with gulf
  * `storageAdapter` -- a gulf storage adapter
  * `ottype` -- the OT type to use, you'll want `ot-text` here as shown above.

## Legal
(c) 2015-2016 by Marcel Klehr

GNU Lesser General Public License
