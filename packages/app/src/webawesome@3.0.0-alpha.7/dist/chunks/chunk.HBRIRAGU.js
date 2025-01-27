import {e, i, t} from './chunk.OZEBCGEZ.js'
import {R}       from './chunk.S3625EU6.js'

// node_modules/lit-html/directives/class-map.js
var Rt = e(class extends i {
    constructor(s) {
        if (super(s), s.type !== t.ATTRIBUTE || 'class' !== s.name || s.strings?.length > 2) {
            throw Error(
                '`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.')
        }
    }

    render(t2) {
        return ' ' + Object.keys(t2).filter((s) => t2[s]).join(' ') + ' '
    }

    update(t2, [s]) {
        if (void 0 === this.st) {
            this.st = /* @__PURE__ */ new Set(), void 0 !== t2.strings && (this.nt = new Set(t2.strings.join(' ').split(/\s/).filter((t3) => '' !== t3)))
            for (const t3 in s) s[t3] && !this.nt?.has(t3) && this.st.add(t3)
            return this.render(s)
        }
        const i2 = t2.element.classList
        for (const t3 of this.st) t3 in s || (i2.remove(t3), this.st.delete(t3))
        for (const t3 in s) {
            const r = !!s[t3]
            r === this.st.has(t3) || this.nt?.has(t3) || (r ? (i2.add(t3), this.st.add(t3)) : (i2.remove(t3), this.st.delete(t3)))
        }
        return R
    }
})

export {
    Rt
}
/*! Bundled license information:

 lit-html/directives/class-map.js:
 (**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 *)
 */
