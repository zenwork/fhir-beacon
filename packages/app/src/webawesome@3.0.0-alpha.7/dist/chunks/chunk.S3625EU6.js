// node_modules/lit-html/lit-html.js
var n = globalThis
var c = n.trustedTypes
var h = c ? c.createPolicy('lit-html', {createHTML:(t) => t}) : void 0
var f = '$lit$'
var v = `lit$${Math.random().toFixed(9).slice(2)}$`
var m = '?' + v
var _ = `<${m}>`
var w = document
var lt = () => w.createComment('')
var st = (t) => null === t || 'object' != typeof t && 'function' != typeof t
var g = Array.isArray
var $ = (t) => g(t) || 'function' == typeof t?.[Symbol.iterator]
var x = '[ 	\n\f\r]'
var T = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g
var E = /-->/g
var k = />/g
var O = RegExp(`>|${x}(?:([^\\s"'>=/]+)(${x}*=${x}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, 'g')
var S = /'/g
var j = /"/g
var M = /^(?:script|style|textarea|title)$/i
var P = (t) => (i, ...s) => ({_$litType$:t, strings:i, values:s})
var ke = P(1)
var Oe = P(2)
var Se = P(3)
var R = Symbol.for('lit-noChange')
var D = Symbol.for('lit-nothing')
var V = /* @__PURE__ */ new WeakMap()
var I = w.createTreeWalker(w, 129)

function N(t, i) {
    if (!g(t) || !t.hasOwnProperty('raw')) throw Error('invalid template strings array')
    return void 0 !== h ? h.createHTML(i) : i
}

var U = (t, i) => {
    const s = t.length - 1, e = []
    let h2, o = 2 === i ? '<svg>' : 3 === i ? '<math>' : '', n2 = T
    for (let i2 = 0; i2 < s; i2++) {
        const s2 = t[i2]
        let r, l, c2 = -1, a = 0
        for (; a < s2.length && (n2.lastIndex = a, l = n2.exec(s2), null !== l);) {
            a = n2.lastIndex, n2 === T ? '!--' === l[1] ? n2 = E : void 0 !== l[1] ? n2
                = k : void 0 !== l[2] ? (M.test(l[2]) && (h2 = RegExp('</' + l[2], 'g')), n2 = O) : void 0 !== l[3] && (n2 = O) : n2 === O
                ? '>' === l[0] ? (n2
                    = h2 ?? T, c2 = -1) : void 0 === l[1] ? c2 = -2 : (c2 = n2.lastIndex - l[2].length, r = l[1], n2 = void 0 === l[3] ? O : '"' === l[3]
                    ? j
                    : S)
                : n2 === j || n2 === S ? n2 = O : n2 === E || n2 === k ? n2 = T : (n2 = O, h2 = void 0)
        }
        const u = n2 === O && t[i2 + 1].startsWith('/>') ? ' ' : ''
        o += n2 === T ? s2 + _ : c2 >= 0 ? (e.push(r), s2.slice(0, c2) + f + s2.slice(c2) + v + u) : s2 + v + (-2 === c2 ? i2 : u)
    }
    return [N(t, o + (t[s] || '<?>') + (2 === i ? '</svg>' : 3 === i ? '</math>' : '')), e]
}
var B = class _B {
    constructor({strings:t, _$litType$:i}, s) {
        let e
        this.parts = []
        let h2 = 0, o = 0
        const n2 = t.length - 1, r = this.parts, [l, a] = U(t, i)
        if (this.el = _B.createElement(l, s), I.currentNode = this.el.content, 2 === i || 3 === i) {
            const t2 = this.el.content.firstChild
            t2.replaceWith(...t2.childNodes)
        }
        for (; null !== (e = I.nextNode()) && r.length < n2;) {
            if (1 === e.nodeType) {
                if (e.hasAttributes()) {
                    for (const t2 of e.getAttributeNames()) {
                        if (t2.endsWith(f)) {
                            const i2 = a[o++], s2 = e.getAttribute(t2).split(v), n3 = /([.?@])?(.*)/.exec(i2)
                            r.push({
                                       type:1,
                                       index:h2,
                                       name:n3[2],
                                       strings:s2,
                                       ctor:'.' === n3[1] ? Y : '?' === n3[1] ? Z : '@' === n3[1] ? q : G
                                   }), e.removeAttribute(t2)
                        } else {
                            t2.startsWith(v) && (r.push({type:6, index:h2}), e.removeAttribute(t2))
                        }
                    }
                }
                if (M.test(e.tagName)) {
                    const t2 = e.textContent.split(v), i2 = t2.length - 1
                    if (i2 > 0) {
                        e.textContent = c ? c.emptyScript : ''
                        for (let s2 = 0; s2 < i2; s2++) e.append(t2[s2], lt()), I.nextNode(), r.push({type:2, index:++h2})
                        e.append(t2[i2], lt())
                    }
                }
            } else if (8 === e.nodeType) {
                if (e.data === m) {
                    r.push({type:2, index:h2})
                } else {
                    let t2 = -1
                    for (; -1 !== (t2 = e.data.indexOf(v, t2 + 1));) r.push({type:7, index:h2}), t2 += v.length - 1
                }
            }
            h2++
        }
    }

    static createElement(t, i) {
        const s = w.createElement('template')
        return s.innerHTML = t, s
    }
}

function z(t, i, s = t, e) {
    if (i === R) return i
    let h2 = void 0 !== e ? s.o?.[e] : s.l
    const o = st(i) ? void 0 : i._$litDirective$
    return h2?.constructor !==
           o &&
           (h2?._$AO?.(false), void 0 === o ? h2 = void 0 : (h2 = new o(t), h2._$AT(t, s, e)), void 0 !== e ? (s.o ?? (s.o = []))[e] = h2 : s.l
               = h2), void 0 !== h2 && (i = z(t, h2._$AS(t, i.values), h2, e)), i
}

var F = class {
    constructor(t, i) {
        this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = i
    }

    get parentNode() {
        return this._$AM.parentNode
    }

    get _$AU() {
        return this._$AM._$AU
    }

    u(t) {
        const {el:{content:i}, parts:s} = this._$AD, e = (t?.creationScope ?? w).importNode(i, true)
        I.currentNode = e
        let h2 = I.nextNode(), o = 0, n2 = 0, r = s[0]
        for (; void 0 !== r;) {
            if (o === r.index) {
                let i2
                2 === r.type ? i2 = new et(h2, h2.nextSibling, this, t) : 1 === r.type ? i2 = new r.ctor(h2, r.name, r.strings, this, t) : 6 ===
                                                                                                                                           r.type &&
                                                                                                                                           (i2 = new K(h2,
                                                                                                                                                       this,
                                                                                                                                                       t)), this._$AV.push(
                    i2), r = s[++n2]
            }
            o !== r?.index && (h2 = I.nextNode(), o++)
        }
        return I.currentNode = w, e
    }

    p(t) {
        let i = 0
        for (const s of this._$AV) void 0 !== s && (void 0 !== s.strings ? (s._$AI(t, s, i), i += s.strings.length - 2) : s._$AI(t[i])), i++
    }
}
var et = class _et {
    constructor(t, i, s, e) {
        this.type = 2, this._$AH = D, this._$AN = void 0, this._$AA = t, this._$AB = i, this._$AM = s, this.options = e, this.v = e?.isConnected ?? true
    }

    get _$AU() {
        return this._$AM?._$AU ?? this.v
    }

    get parentNode() {
        let t = this._$AA.parentNode
        const i = this._$AM
        return void 0 !== i && 11 === t?.nodeType && (t = i.parentNode), t
    }

    get startNode() {
        return this._$AA
    }

    get endNode() {
        return this._$AB
    }

    _$AI(t, i = this) {
        t = z(this, t, i), st(t)
            ? t === D || null == t || '' === t ? (this._$AH !== D && this._$AR(), this._$AH = D) : t !== this._$AH && t !== R && this._(t)
            : void 0 !== t._$litType$ ? this.$(t) : void 0 !== t.nodeType ? this.T(t) : $(t) ? this.k(t) : this._(t)
    }

    O(t) {
        return this._$AA.parentNode.insertBefore(t, this._$AB)
    }

    T(t) {
        this._$AH !== t && (this._$AR(), this._$AH = this.O(t))
    }

    _(t) {
        this._$AH !== D && st(this._$AH) ? this._$AA.nextSibling.data = t : this.T(w.createTextNode(t)), this._$AH = t
    }

    $(t) {
        const {values:i, _$litType$:s} = t,
            e = 'number' == typeof s ? this._$AC(t) : (void 0 === s.el && (s.el = B.createElement(N(s.h, s.h[0]), this.options)), s)
        if (this._$AH?._$AD === e) {
            this._$AH.p(i)
        } else {
            const t2 = new F(e, this), s2 = t2.u(this.options)
            t2.p(i), this.T(s2), this._$AH = t2
        }
    }

    _$AC(t) {
        let i = V.get(t.strings)
        return void 0 === i && V.set(t.strings, i = new B(t)), i
    }

    k(t) {
        g(this._$AH) || (this._$AH = [], this._$AR())
        const i = this._$AH
        let s, e = 0
        for (const h2 of t) e === i.length ? i.push(s = new _et(this.O(lt()), this.O(lt()), this, this.options)) : s = i[e], s._$AI(h2), e++
        e < i.length && (this._$AR(s && s._$AB.nextSibling, e), i.length = e)
    }

    _$AR(t = this._$AA.nextSibling, i) {
        for (this._$AP?.(false, true, i); t && t !== this._$AB;) {
            const i2 = t.nextSibling
            t.remove(), t = i2
        }
    }

    setConnected(t) {
        void 0 === this._$AM && (this.v = t, this._$AP?.(t))
    }
}
var G = class {
    constructor(t, i, s, e, h2) {
        this.type = 1, this._$AH = D, this._$AN = void 0, this.element = t, this.name = i, this._$AM = e, this.options = h2, s.length >
                                                                                                                             2 ||
                                                                                                                             '' !==
                                                                                                                             s[0] ||
                                                                                                                             '' !==
                                                                                                                             s[1] ? (this._$AH
            = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = D
    }

    get tagName() {
        return this.element.tagName
    }

    get _$AU() {
        return this._$AM._$AU
    }

    _$AI(t, i = this, s, e) {
        const h2 = this.strings
        let o = false
        if (void 0 === h2) {
            t = z(this, t, i, 0), o = !st(t) || t !== this._$AH && t !== R, o && (this._$AH = t)
        } else {
            const e2 = t
            let n2, r
            for (t = h2[0], n2 = 0; n2 < h2.length - 1; n2++) {
                r = z(this, e2[s + n2], i, n2), r === R && (r = this._$AH[n2]), o ||
                                                                                (o = !st(r) ||
                                                                                r !==
                                                                                this._$AH[n2]), r === D
                    ? t = D
                    : t !== D && (t += (r ?? '') + h2[n2 + 1]), this._$AH[n2] = r
            }
        }
        o && !e && this.j(t)
    }

    j(t) {
        t === D ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? '')
    }
}
var Y = class extends G {
    constructor() {
        super(...arguments), this.type = 3
    }

    j(t) {
        this.element[this.name] = t === D ? void 0 : t
    }
}
var Z = class extends G {
    constructor() {
        super(...arguments), this.type = 4
    }

    j(t) {
        this.element.toggleAttribute(this.name, !!t && t !== D)
    }
}
var q = class extends G {
    constructor(t, i, s, e, h2) {
        super(t, i, s, e, h2), this.type = 5
    }

    _$AI(t, i = this) {
        if ((t = z(this, t, i, 0) ?? D) === R) return
        const s = this._$AH, e = t === D && s !== D || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive, h2 = t !== D && (s === D || e)
        e && this.element.removeEventListener(this.name, this, s), h2 && this.element.addEventListener(this.name, this, t), this._$AH = t
    }

    handleEvent(t) {
        'function' == typeof this._$AH ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t)
    }
}
var K = class {
    constructor(t, i, s) {
        this.element = t, this.type = 6, this._$AN = void 0, this._$AM = i, this.options = s
    }

    get _$AU() {
        return this._$AM._$AU
    }

    _$AI(t) {
        z(this, t)
    }
}
var si = {M:f, P:v, A:m, C:1, L:U, R:F, D:$, V:z, I:et, H:G, N:Z, U:q, B:Y, F:K}
var Re = n.litHtmlPolyfillSupport
Re?.(B, et), (n.litHtmlVersions ?? (n.litHtmlVersions = [])).push('3.2.0')
var Q = (t, i, s) => {
    const e = s?.renderBefore ?? i
    let h2 = e._$litPart$
    if (void 0 === h2) {
        const t2 = s?.renderBefore ?? null
        e._$litPart$ = h2 = new et(i.insertBefore(lt(), t2), t2, void 0, s ?? {});
    }
    return h2._$AI(t), h2;
};

export {
    ke,
    Oe,
    Se,
    R,
    D,
    si,
    Q
};
/*! Bundled license information:

 lit-html/lit-html.js:
 (**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 *)
 */
