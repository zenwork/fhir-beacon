import {ke, Oe, Se} from './chunk.S3625EU6.js'

// node_modules/lit-html/static.js
var $e = Symbol.for('')
var xe = (t) => {
    if (t?.r === $e) return t?._$litStatic$
}
var er = (t, ...r) => ({
    _$litStatic$:r.reduce((r2, e, a) => r2 + ((t2) => {
        if (void 0 !== t2._$litStatic$) return t2._$litStatic$
        throw Error(`Value passed to 'literal' function must be a 'literal' result: ${t2}. Use 'unsafeStatic' to pass non-literal values, but
            take care to ensure page security.`)
    })(e) + t[a + 1], t[0]), r:$e
})
var Te = /* @__PURE__ */ new Map()
var Ee = (t) => (r, ...e) => {
    const a = e.length
    let o, s
    const i = [], l = []
    let n, u = 0, c = false
    for (; u < a;) {
        for (n = r[u]; u < a && void 0 !== (s = e[u], o = xe(s));) n += o + r[++u], c = true
        u !== a && l.push(s), i.push(n), u++
    }
    if (u === a && i.push(r[a]), c) {
        const t2 = i.join('$$lit$$')
        void 0 === (r = Te.get(t2)) && (i.raw = i, Te.set(t2, r = i)), e = l
    }
    return t(r, ...e)
}
var ke2 = Ee(ke)
var Oe2 = Ee(Oe)
var Se2 = Ee(Se)

export {
    er,
    ke2 as ke
}
/*! Bundled license information:

 lit-html/static.js:
 (**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 *)
 */
