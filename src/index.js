/**
 * gulf-editor-textarea
 * Copyright (C) 2015 Marcel Klehr <mklehr@gmx.net>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 *  along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
var gulf = require('gulf')
  , textOT = require('ot-text').type

const EVENTS = ['textInput', 'keydown', 'keyup', 'cut', 'paste', 'drop', 'dragend'];

class TextareaDocument extends gulf.EditableDocument {
  constructor(opts) {
    opts.ottype = opts.ottype || textOT
    super(opts)
    if (!opts.editorInstance) throw new Error('No text input element was passed')
    this.textarea = opts.editorInstance
    this.oldval
    
    // register events
    this.listener = () => {
      this._onBeforeChange()
    }
    EVENTS.forEach((e) => {
      if (textarea.addEventListener) {
        textarea.addEventListener(e, this.listener, false);
      } else {
        textarea.attachEvent('on' + e, this.listener);
      }
    })
  }

  close() {
    super.close()
    
    EVENTS.forEach((e) => {
      if (textarea.addEventListener) {
        textarea.removeEventListener(e, this.listener);
      } else {
        textarea.detachEvent('on' + e, this.listener);
      }
    })
  }
  
  _setContent(newcontent) {
    this.oldval = this.textarea.value = newcontent
    return Promise.resolve()
  }

  // on incoming changes
  _onChange(cs) {
    // remember selection
    var oldSel = [textarea.selectionStart, textarea.selectionEnd]

    // apply changes
    this.oldval = this.textarea.value = this.ottype.apply(oldval, cs)

    // take care of selection
    var newSel = this.ottype.transformSelection(oldSel, cs)
    textarea.selectionStart = newSel[0]
    textarea.selectionEnd = newSel[1]
    
    return Promise.resolve()
  }
  
  // before _change() and on any edit event
  _onBeforeChange() {
    var cs = []
      , oldval = this.oldval
      , newval = this.textarea.value

    // The following code is taken from shareJS:
    // https://github.com/share/ShareJS/blob/3843b26831ecb781344fb9beb1005cfdd2/lib/client/textarea.js

    if (oldval === newval) return cb();

    var commonStart = 0;
    while (oldval.charAt(commonStart) === newval.charAt(commonStart)) {
      commonStart++;
    }
    var commonEnd = 0;
    while (oldval.charAt(oldval.length - 1 - commonEnd) === newval.charAt(newval.length - 1 - commonEnd) &&
      commonEnd + commonStart < oldval.length && commonEnd + commonStart < newval.length) {
      commonEnd++;
    }
    if (oldval.length !== commonStart + commonEnd) {
      if(commonStart) cs.push(commonStart)
      cs.push({d: oldval.length - commonStart - commonEnd });
    }
    if (newval.length !== commonStart + commonEnd) {
      if(commonStart && !cs.length) cs.push(commonStart)
      cs.push(newval.slice(commonStart, newval.length - commonEnd));
    }

    this.oldval = newval
    this.submitChange(cs)
    
    return Promise.resolve()
  }
}

module.exports = TextareaDocument
