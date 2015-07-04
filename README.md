# gulf-contenteditable
Convenient [gulf](http://github.com/marcelklehr/gulf#readme) wrapper for textareas and text inputs

## Install

```
npm install gulf-textarea
```

## Usage

```
var bindEditor = require('gulf-textarea')

var textarea = document.querySelecor('textarea#doc')
var doc = bindEditor(textarea)
```

## API
### bindEditor(textarea:DOMElement, [storageAdapter])
  * `textarea` -- a texarea Element or an `<input type="text">`to be wired up with gulf
  * `storageAdapter` -- a gulf storage adapter (optional; defaults to the in-memory Adapter)
  * *returns* the `gulf.EditableDocument` (see [the gulf docs](http://github.com/marcelklehr/gulf#readme))


## Legal
(c) 2015 by Marcel Klehr

GNU General Public License