/**
 * gulf-textarea
 * Copyright (C) 2015 Marcel Klehr <mklehr@gmx.net>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 *  along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
var gulf = require('gulf')
  , textOT = require('ot-text').type
 
module.exports = function(textarea, storageAdapter) {
  var doc = new gulf.EditableDocument(storageAdapter || new gulf.MemoryAdapter, textOT)

  // on incoming changes
  doc._change = function(newcontent, cs) {
    console.log('_change:', newcontent, cs)
    // remember selection
    var oldSel = [textarea.selectionStart, textarea.selectionEnd]

    // set new content
    oldval = textarea.value = newcontent

    if(cs) { // in case of a hard reset this isn't available
      // take care of selection
      var newSel = textOT.transformSelection(oldSel, cs)
      textarea.selectionStart = newSel[0]
      textarea.selectionEnd = newSel[1]
    }
  }
  
  // before _change() and on any edit event
  doc._collectChanges = function() {
    var cs = []
      , newval = textarea.value

    // The following code is taken from shareJS:
    // https://github.com/share/ShareJS/blob/3843b26831ecb781344fb9beb1005cfdd2/lib/client/textarea.js

    if (oldval === newval) return;

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

    oldval = newval
    console.log(cs)
    this.update(cs)
  }

  // register events
  var eventNames = ['textInput', 'keydown', 'keyup', 'cut', 'paste', 'drop', 'dragend'];
  for (var i = 0; i < eventNames.length; i++) {
    var e = eventNames[i];
    if (textarea.addEventListener) {
      textarea.addEventListener(e, genOp, false);
    } else {
      textarea.attachEvent('on' + e, genOp);
    }
  }
  function genOp(evt) {
    console.log(evt)
    doc._collectChanges()
  }

  return doc
}