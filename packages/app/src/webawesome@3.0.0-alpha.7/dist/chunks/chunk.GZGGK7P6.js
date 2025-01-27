import {e, i, t} from './chunk.OZEBCGEZ.js'
import {D, R}    from './chunk.S3625EU6.js'

// node_modules/lit-html/directives/unsafe-html.js
var le = class extends i {
    constructor(i2) {
        if (super(i2), this.it = D, i2.type !== t.CHILD) throw Error(this.constructor.directiveName + '() can only be used in child bindings')
    }

    render(t2) {
        if (t2 === D || null == t2) return this._t = void 0, this.it = t2
        if (t2 === R) return t2
        if ('string' != typeof t2) throw Error(this.constructor.directiveName + '() called with a non-string value')
        if (t2 === this.it) return this._t
        this.it = t2
        const i2 = [t2]
        return i2.raw = i2, this._t = {_$litType$:this.constructor.resultType, strings:i2, values:[]}
    }
}
le.directiveName = 'unsafeHTML', le.resultType = 1
var ae = e(le)

export {
    ae
}
/*! Bundled license information:

 lit-html/directives/unsafe-html.js:
 (**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 *)
 */
