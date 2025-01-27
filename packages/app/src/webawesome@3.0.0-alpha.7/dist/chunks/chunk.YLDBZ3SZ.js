import {Q, R} from './chunk.S3625EU6.js'

// node_modules/lit-html/is-server.js
var co = false

// node_modules/@lit/reactive-element/css-tag.js
var t = globalThis
var e = t.ShadowRoot &&
        (void 0 === t.ShadyCSS || t.ShadyCSS.nativeShadow) &&
        'adoptedStyleSheets' in
        Document.prototype &&
        'replace' in
        CSSStyleSheet.prototype
var s = Symbol()
var o = /* @__PURE__ */ new WeakMap()
var n = class {
    constructor(t2, e3, o3) {
        if (this._$cssResult$ = true, o3 !== s) throw Error('CSSResult is not constructable. Use `unsafeCSS` or `css` instead.')
        this.cssText = t2, this.t = e3
    }

    get styleSheet() {
        let t2 = this.o
        const s2 = this.t
        if (e && void 0 === t2) {
            const e3 = void 0 !== s2 && 1 === s2.length
            e3 && (t2 = o.get(s2)), void 0 === t2 && ((this.o = t2 = new CSSStyleSheet()).replaceSync(this.cssText), e3 && o.set(s2, t2))
        }
        return t2
    }

    toString() {
        return this.cssText
    }
}
var r = (t2) => new n('string' == typeof t2 ? t2 : t2 + '', void 0, s)
var S = (s2, o3) => {
    if (e) {
        s2.adoptedStyleSheets = o3.map((t2) => t2 instanceof CSSStyleSheet ? t2 : t2.styleSheet)
    } else {
        for (const e3 of o3) {
            const o4 = document.createElement('style'), n3 = t.litNonce
            void 0 !== n3 && o4.setAttribute('nonce', n3), o4.textContent = e3.cssText, s2.appendChild(o4)
        }
    }
}
var c = e ? (t2) => t2 : (t2) => t2 instanceof CSSStyleSheet ? ((t3) => {
    let e3 = ''
    for (const s2 of t3.cssRules) e3 += s2.cssText
    return r(e3)
})(t2) : t2

// node_modules/@lit/reactive-element/reactive-element.js
var {is:i2, defineProperty:e2, getOwnPropertyDescriptor:r2, getOwnPropertyNames:h, getOwnPropertySymbols:o2, getPrototypeOf:n2} = Object
var a = globalThis
var c2 = a.trustedTypes
var l = c2 ? c2.emptyScript : ''
var p = a.reactiveElementPolyfillSupport
var d = (t2, s2) => t2
var u = {
    toAttribute(t2, s2) {
        switch (s2) {
            case Boolean:
                t2 = t2 ? l : null
                break
            case Object:
            case Array:
                t2 = null == t2 ? t2 : JSON.stringify(t2)
        }
        return t2
    }, fromAttribute(t2, s2) {
        let i3 = t2
        switch (s2) {
            case Boolean:
                i3 = null !== t2
                break
            case Number:
                i3 = null === t2 ? null : Number(t2)
                break
            case Object:
            case Array:
                try {
                    i3 = JSON.parse(t2)
                } catch (t3) {
                    i3 = null
                }
        }
        return i3
    }
}
var f = (t2, s2) => !i2(t2, s2)
var y = {attribute:true, type:String, converter:u, reflect:false, hasChanged:f}
Symbol.metadata ?? (Symbol.metadata = Symbol('metadata')), a.litPropertyMetadata ?? (a.litPropertyMetadata = /* @__PURE__ */ new WeakMap())
var b = class extends HTMLElement {
    constructor() {
        super(), this._$Ep = void 0, this.isUpdatePending = false, this.hasUpdated = false, this._$Em = null, this._$Ev()
    }

    static get observedAttributes() {
        return this.finalize(), this._$Eh && [...this._$Eh.keys()]
    }

    get updateComplete() {
        return this.getUpdateComplete()
    }

    static addInitializer(t2) {
        this._$Ei(), (this.l ?? (this.l = [])).push(t2)
    }

    static createProperty(t2, s2 = y) {
        if (s2.state && (s2.attribute = false), this._$Ei(), this.elementProperties.set(t2, s2), !s2.noAccessor) {
            const i3 = Symbol(), r3 = this.getPropertyDescriptor(t2, i3, s2)
            void 0 !== r3 && e2(this.prototype, t2, r3)
        }
    }

    static getPropertyDescriptor(t2, s2, i3) {
        const {get:e3, set:h3} = r2(this.prototype, t2) ?? {
            get() {
                return this[s2]
            }, set(t3) {
                this[s2] = t3
            }
        }
        return {
            get() {
                return e3?.call(this)
            }, set(s3) {
                const r3 = e3?.call(this)
                h3.call(this, s3), this.requestUpdate(t2, r3, i3)
            }, configurable:true, enumerable:true
        }
    }

    static getPropertyOptions(t2) {
        return this.elementProperties.get(t2) ?? y
    }

    static _$Ei() {
        if (this.hasOwnProperty(d('elementProperties'))) return
        const t2 = n2(this)
        t2.finalize(), void 0 !== t2.l && (this.l = [...t2.l]), this.elementProperties = new Map(t2.elementProperties)
    }

    static finalize() {
        if (this.hasOwnProperty(d('finalized'))) return
        if (this.finalized = true, this._$Ei(), this.hasOwnProperty(d('properties'))) {
            const t3 = this.properties, s2 = [...h(t3), ...o2(t3)]
            for (const i3 of s2) this.createProperty(i3, t3[i3])
        }
        const t2 = this[Symbol.metadata]
        if (null !== t2) {
            const s2 = litPropertyMetadata.get(t2)
            if (void 0 !== s2) for (const [t3, i3] of s2) this.elementProperties.set(t3, i3)
        }
        this._$Eh = /* @__PURE__ */ new Map()
        for (const [t3, s2] of this.elementProperties) {
            const i3 = this._$Eu(t3, s2)
            void 0 !== i3 && this._$Eh.set(i3, t3)
        }
        this.elementStyles = this.finalizeStyles(this.styles)
    }

    static finalizeStyles(s2) {
        const i3 = []
        if (Array.isArray(s2)) {
            const e3 = new Set(s2.flat(1 / 0).reverse())
            for (const s3 of e3) i3.unshift(c(s3))
        } else {
            void 0 !== s2 && i3.push(c(s2))
        }
        return i3
    }

    static _$Eu(t2, s2) {
        const i3 = s2.attribute
        return false === i3 ? void 0 : 'string' == typeof i3 ? i3 : 'string' == typeof t2 ? t2.toLowerCase() : void 0
    }

    _$Ev() {
        this._$ES = new Promise((t2) => this.enableUpdating = t2), this._$AL
            = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((t2) => t2(this))
    }

    addController(t2) {
        (this._$EO ?? (this._$EO = /* @__PURE__ */ new Set())).add(t2), void 0 !== this.renderRoot && this.isConnected && t2.hostConnected?.()
    }

    removeController(t2) {
        this._$EO?.delete(t2)
    }

    _$E_() {
        const t2 = /* @__PURE__ */ new Map(), s2 = this.constructor.elementProperties
        for (const i3 of s2.keys()) this.hasOwnProperty(i3) && (t2.set(i3, this[i3]), delete this[i3])
        t2.size > 0 && (this._$Ep = t2)
    }

    createRenderRoot() {
        const t2 = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions)
        return S(t2, this.constructor.elementStyles), t2
    }

    connectedCallback() {
        this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(true), this._$EO?.forEach((t2) => t2.hostConnected?.())
    }

    enableUpdating(t2) {
    }

    disconnectedCallback() {
        this._$EO?.forEach((t2) => t2.hostDisconnected?.())
    }

    attributeChangedCallback(t2, s2, i3) {
        this._$AK(t2, i3)
    }

    _$EC(t2, s2) {
        const i3 = this.constructor.elementProperties.get(t2), e3 = this.constructor._$Eu(t2, i3)
        if (void 0 !== e3 && true === i3.reflect) {
            const r3 = (void 0 !== i3.converter?.toAttribute ? i3.converter : u).toAttribute(s2, i3.type)
            this._$Em = t2, null == r3 ? this.removeAttribute(e3) : this.setAttribute(e3, r3), this._$Em = null
        }
    }

    _$AK(t2, s2) {
        const i3 = this.constructor, e3 = i3._$Eh.get(t2)
        if (void 0 !== e3 && this._$Em !== e3) {
            const t3 = i3.getPropertyOptions(e3),
                r3 = 'function' == typeof t3.converter ? {fromAttribute:t3.converter} : void 0 !== t3.converter?.fromAttribute ? t3.converter : u
            this._$Em = e3, this[e3] = r3.fromAttribute(s2, t3.type), this._$Em = null
        }
    }

    requestUpdate(t2, s2, i3) {
        if (void 0 !== t2) {
            if (i3 ?? (i3 = this.constructor.getPropertyOptions(t2)), !(i3.hasChanged ?? f)(this[t2], s2)) return
            this.P(t2, s2, i3)
        }
        false === this.isUpdatePending && (this._$ES = this._$ET())
    }

    P(t2, s2, i3) {
        this._$AL.has(t2) || this._$AL.set(t2, s2), true === i3.reflect && this._$Em !== t2 && (this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Set())).add(t2)
    }

    async _$ET() {
        this.isUpdatePending = true
        try {
            await this._$ES
        } catch (t3) {
            Promise.reject(t3)
        }
        const t2 = this.scheduleUpdate()
        return null != t2 && await t2, !this.isUpdatePending
    }

    scheduleUpdate() {
        return this.performUpdate()
    }

    performUpdate() {
        if (!this.isUpdatePending) return
        if (!this.hasUpdated) {
            if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
                for (const [t4, s3] of this._$Ep) this[t4] = s3
                this._$Ep = void 0
            }
            const t3 = this.constructor.elementProperties
            if (t3.size > 0) for (const [s3, i3] of t3) true !== i3.wrapped || this._$AL.has(s3) || void 0 === this[s3] || this.P(s3, this[s3], i3)
        }
        let t2 = false
        const s2 = this._$AL
        try {
            t2 = this.shouldUpdate(s2), t2 ? (this.willUpdate(s2), this._$EO?.forEach((t3) => t3.hostUpdate?.()), this.update(s2)) : this._$EU()
        } catch (s3) {
            throw t2 = false, this._$EU(), s3
        }
        t2 && this._$AE(s2)
    }

    willUpdate(t2) {
    }

    _$AE(t2) {
        this._$EO?.forEach((t3) => t3.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = true, this.firstUpdated(t2)), this.updated(t2)
    }

    _$EU() {
        this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = false
    }

    getUpdateComplete() {
        return this._$ES
    }

    shouldUpdate(t2) {
        return true
    }

    update(t2) {
        this._$Ej && (this._$Ej = this._$Ej.forEach((t3) => this._$EC(t3, this[t3]))), this._$EU()
    }

    updated(t2) {
    }

    firstUpdated(t2) {
    }
}
b.elementStyles = [], b.shadowRootOptions = {mode:'open'}, b[d('elementProperties')] = /* @__PURE__ */ new Map(), b[d('finalized')]
    = /* @__PURE__ */ new Map(), p?.({ReactiveElement:b}), (a.reactiveElementVersions ?? (a.reactiveElementVersions = [])).push('2.0.4')

// node_modules/lit-element/lit-element.js
var h2 = class extends b {
    constructor() {
        super(...arguments), this.renderOptions = {host:this}, this.o = void 0
    }

    update(t2) {
        const e3 = this.render()
        this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t2), this.o = Q(e3, this.renderRoot, this.renderOptions)
    }

    disconnectedCallback() {
        super.disconnectedCallback(), this.o?.setConnected(false)
    }

    createRenderRoot() {
        var _a
        const t2 = super.createRenderRoot()
        return (_a = this.renderOptions).renderBefore ?? (_a.renderBefore = t2.firstChild), t2
    }

    connectedCallback() {
        super.connectedCallback(), this.o?.setConnected(true)
    }

    render() {
        return R
    }
}
h2._$litElement$ = true, h2['finalized'] = true, globalThis.litElementHydrateSupport?.({LitElement:h2})
var f2 = globalThis.litElementPolyfillSupport
f2?.({LitElement:h2});
(globalThis.litElementVersions ?? (globalThis.litElementVersions = [])).push('4.1.0')

export {
    r,
    u,
    f,
    h2 as h,
    co
}
/*! Bundled license information:

 lit-html/is-server.js:
 (**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 *)

 @lit/reactive-element/css-tag.js:
 (**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 *)

 @lit/reactive-element/reactive-element.js:
 (**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 *)

 lit-element/lit-element.js:
 (**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 *)
 */
