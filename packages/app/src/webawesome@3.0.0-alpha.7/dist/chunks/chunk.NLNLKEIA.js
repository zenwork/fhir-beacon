import {e, i, t} from './chunk.OZEBCGEZ.js'
import {D, R}    from './chunk.S3625EU6.js'
import {dt, rt}  from './chunk.XCFYBH5U.js'

// node_modules/lit-html/directives/live.js
var Ft = e(class extends i {
    constructor(r) {
        if (super(r), r.type !== t.PROPERTY && r.type !== t.ATTRIBUTE && r.type !== t.BOOLEAN_ATTRIBUTE) {
            throw Error(
                'The `live` directive is not allowed on child or event bindings')
        }
        if (!rt(r)) throw Error('`live` bindings can only contain a single expression')
    }

    render(r) {
        return r
    }

    update(r, [e2]) {
        if (e2 === R || e2 === D) return e2
        const i2 = r.element, n = r.name
        if (r.type === t.PROPERTY) {
            if (e2 === i2[n]) return R
        } else if (r.type === t.BOOLEAN_ATTRIBUTE) {
            if (!!e2 === i2.hasAttribute(n)) return R
        } else if (r.type === t.ATTRIBUTE && i2.getAttribute(n) === e2 + '') return R
        return dt(r), e2
    }
})

export {
    Ft
}
/*! Bundled license information:

 lit-html/directives/live.js:
 (**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 *)
 */
