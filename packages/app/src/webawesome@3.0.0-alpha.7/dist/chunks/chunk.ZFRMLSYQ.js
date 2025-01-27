import {__decorateClass, __privateAdd, __privateGet, __privateSet} from './chunk.CLOX737Y.js'
import {co, f, h, r, u}                                            from './chunk.YLDBZ3SZ.js'

// node_modules/@lit/reactive-element/decorators/custom-element.js
var t = (t3) => (e3, o2) => {
    void 0 !== o2 ? o2.addInitializer(() => {
        customElements.define(t3, e3)
    }) : customElements.define(t3, e3)
}

// node_modules/@lit/reactive-element/decorators/property.js
var o = {attribute:true, type:String, converter:u, reflect:false, hasChanged:f}
var r2 = (t3 = o, e3, r5) => {
    const {kind:n2, metadata:i} = r5
    let s = globalThis.litPropertyMetadata.get(i)
    if (void 0 === s && globalThis.litPropertyMetadata.set(i, s = /* @__PURE__ */ new Map()), s.set(r5.name, t3), 'accessor' === n2) {
        const {name:o2} = r5
        return {
            set(r6) {
                const n3 = e3.get.call(this)
                e3.set.call(this, r6), this.requestUpdate(o2, n3, t3)
            }, init(e4) {
                return void 0 !== e4 && this.P(o2, void 0, t3), e4
            }
        }
    }
    if ('setter' === n2) {
        const {name:o2} = r5
        return function (r6) {
            const n3 = this[o2]
            e3.call(this, r6), this.requestUpdate(o2, n3, t3)
        }
    }
    throw Error('Unsupported decorator location: ' + n2)
}

function n(t3) {
    return (e3, o2) => 'object' == typeof o2 ? r2(t3, e3, o2) : ((t4, e4, o3) => {
        const r5 = e4.hasOwnProperty(o3)
        return e4.constructor.createProperty(o3, r5 ? {...t4, wrapped:true} : t4), r5 ? Object.getOwnPropertyDescriptor(e4, o3) : void 0
    })(t3, e3, o2)
}

// node_modules/@lit/reactive-element/decorators/state.js
function r3(r5) {
    return n({...r5, state:true, attribute:false})
}

// node_modules/@lit/reactive-element/decorators/event-options.js
function t2(t3) {
    return (n2, o2) => {
        const c = 'function' == typeof n2 ? n2 : n2[o2]
        Object.assign(c, t3)
    }
}

// node_modules/@lit/reactive-element/decorators/base.js
var e = (e3, t3, c) => (c.configurable = true, c.enumerable = true, Reflect.decorate && 'object' != typeof t3 && Object.defineProperty(e3, t3, c), c)

// node_modules/@lit/reactive-element/decorators/query.js
function e2(e3, r5) {
    return (n2, s, i) => {
        const o2 = (t3) => t3.renderRoot?.querySelector(e3) ?? null
        if (r5) {
            const {get:e4, set:r6} = 'object' == typeof s ? n2 : i ?? (() => {
                const t3 = Symbol()
                return {
                    get() {
                        return this[t3]
                    }, set(e5) {
                        this[t3] = e5
                    }
                }
            })()
            return e(n2, s, {
                get() {
                    let t3 = e4.call(this)
                    return void 0 === t3 && (t3 = o2(this), (null !== t3 || this.hasUpdated) && r6.call(this, t3)), t3
                }
            })
        }
        return e(n2, s, {
            get() {
                return o2(this)
            }
        })
    }
}

// node_modules/@lit/reactive-element/decorators/query-async.js
function r4(r5) {
    return (n2, e3) => e(n2, e3, {
        async get() {
            return await this.updateComplete, this.renderRoot?.querySelector(r5) ?? null
        }
    })
}

// src/events/invalid.ts
var WaInvalidEvent = class extends Event {
    constructor() {
        super('wa-invalid', {bubbles:true, cancelable:false, composed:true})
    }
}

// src/styles/shadow/component.css
var component_default = ':host {\n  box-sizing: border-box !important;\n}\n\n:host *,\n:host *::before,\n:host *::after {\n  box-sizing: inherit !important;\n}\n\n[hidden] {\n  display: none !important;\n}\n'

// src/internal/validators/custom-error-validator.ts
var CustomErrorValidator = () => {
    return {
        observedAttributes:['custom-error'],
        checkValidity(element) {
            const validity = {
                message:'',
                isValid:true,
                invalidKeys:[]
            }
            if (element.customError) {
                validity.message = element.customError
                validity.isValid = false
                validity.invalidKeys = ['customError']
            }
            return validity
        }
    }
}

// src/internal/webawesome-element.ts
var _hasRecordedInitialProperties
var WebAwesomeElement = class extends h {
    constructor() {
        super()
        this.didSSR = co || Boolean(this.shadowRoot)
        __privateAdd(this, _hasRecordedInitialProperties, false)
        // Store the constructor value of all `static properties = {}`
        this.initialReflectedProperties = /* @__PURE__ */ new Map()
        try {
            this.internals = this.attachInternals()
        } catch (_e) {
            console.error('Element internals are not supported in your browser. Consider using a polyfill')
        }
    }

    /** The base styles property will only get called if the subclass does not define a styles property of its own */
    static get styles() {
        const shadowStyle = this.shadowStyle ? Array.isArray(this.shadowStyle) ? this.shadowStyle : [this.shadowStyle] : []
        const shadowStyles = [component_default, ...shadowStyle].map(
            (style) => typeof style === 'string' ? r(style) : style
        )
        return shadowStyles
    }

    willUpdate(changedProperties) {
        super.willUpdate(changedProperties)
        this.initialReflectedProperties.forEach((value, prop) => {
            if (changedProperties.has(prop) && this[prop] == null) {
                this[prop] = value
            }
        })
    }

    update(changedProperties) {
        try {
            super.update(changedProperties)
        } catch (e3) {
            if (this.didSSR && !this.hasUpdated) {
                const event = new Event('lit-hydration-error', {bubbles:true, composed:true, cancelable:false})
                event.error = e3
                this.dispatchEvent(event)
            }
            throw e3
        }
    }

    firstUpdated(changedProperties) {
        super.firstUpdated(changedProperties)
        if (this.didSSR) {
            this.shadowRoot?.querySelectorAll('slot').forEach((slotElement) => {
                slotElement.dispatchEvent(new Event('slotchange', {bubbles:true, composed:false, cancelable:false}))
            })
        }
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (!__privateGet(this, _hasRecordedInitialProperties)) {
            this.constructor.elementProperties.forEach(
                (obj, prop) => {
                    if (obj.reflect && this[prop] != null) {
                        this.initialReflectedProperties.set(prop, this[prop])
                    }
                }
            )
            __privateSet(this, _hasRecordedInitialProperties, true)
        }
        super.attributeChangedCallback(name, oldValue, newValue)
    }

    /** Checks if states are supported by the element */
    hasStatesSupport() {
        return Boolean(this.internals?.states)
    }

    /** Adds a custom state to the element. */
    addCustomState(state) {
        if (this.hasStatesSupport()) {
            this.internals.states.add(state)
        }
    }

    /** Removes a custom state from the element. */
    deleteCustomState(state) {
        if (this.hasStatesSupport()) {
            this.internals.states.delete(state)
        }
    }

    /** Toggles a custom state on the element. */
    toggleCustomState(state, force) {
        if (typeof force === 'boolean') {
            if (force) {
                this.addCustomState(state)
            } else {
                this.deleteCustomState(state)
            }
            return
        }
        this.toggleCustomState(state, !this.hasCustomState(state))
    }

    /** Determines if the element has the specified custom state. */
    hasCustomState(state) {
        return this.hasStatesSupport() ? this.internals.states.has(state) : false
    }
}
_hasRecordedInitialProperties = new WeakMap()
__decorateClass([
                    n()
                ], WebAwesomeElement.prototype, 'dir', 2)
__decorateClass([
                    n()
                ], WebAwesomeElement.prototype, 'lang', 2)
__decorateClass([
                    n({type:Boolean, reflect:true, attribute:'did-ssr'})
                ], WebAwesomeElement.prototype, 'didSSR', 2)
var WebAwesomeFormAssociatedElement = class extends WebAwesomeElement {
    constructor() {
        super()
        this.name = null
        this.disabled = false
        this.required = false
        this.assumeInteractionOn = ['wa-input']
        this.validators = []
        this.valueHasChanged = false
        this.hasInteracted = false
        this.customError = null
        this.emittedEvents = []
        this.emitInvalid = (e3) => {
            if (e3.target !== this) return
            this.hasInteracted = true
            this.dispatchEvent(new WaInvalidEvent())
        }
        this.handleInteraction = (event) => {
            const emittedEvents = this.emittedEvents
            if (!emittedEvents.includes(event.type)) {
                emittedEvents.push(event.type)
            }
            if (emittedEvents.length === this.assumeInteractionOn?.length) {
                this.hasInteracted = true
            }
        }
        if (!co) {
            this.addEventListener('invalid', this.emitInvalid)
        }
    }

    /**
     * Validators are static because they have `observedAttributes`, essentially attributes to "watch"
     * for changes. Whenever these attributes change, we want to be notified and update the validator.
     */
    static get validators() {
        return [CustomErrorValidator()]
    }

    get labels() {
        return this.internals.labels
    }

    get validity() {
        return this.internals.validity
    }

    // Not sure if this supports `novalidate`. Will need to test.
    get willValidate() {
        return this.internals.willValidate
    }

    get validationMessage() {
        return this.internals.validationMessage
    }

    /**
     * Override this to change where constraint validation popups are anchored.
     */
    get validationTarget() {
        return this.input || void 0
    }

    get allValidators() {
        const staticValidators = this.constructor.validators || []
        const validators = this.validators || []
        return [...staticValidators, ...validators]
    }

    willUpdate(changedProperties) {
        if (!co && changedProperties.has('customError')) {
            if (!this.customError) {
                this.customError = null
            }
            this.setCustomValidity(this.customError || '')
        }
        if (changedProperties.has('value') || changedProperties.has('disabled')) {
            const value = this.value
            if (Array.isArray(value)) {
                if (this.name) {
                    const formData = new FormData()
                    for (const val of value) {
                        formData.append(this.name, val)
                    }
                    this.setValue(formData, formData)
                }
            } else {
                this.setValue(value, value)
            }
        }
        if (changedProperties.has('disabled')) {
            this.toggleCustomState('disabled', this.disabled)
            if (this.hasAttribute('disabled') || !co && !this.matches(':disabled')) {
                this.toggleAttribute('disabled', this.disabled)
            }
        }
        this.updateValidity()
        super.willUpdate(changedProperties)
    }

    firstUpdated(...args) {
        super.firstUpdated(...args)
        this.updateValidity()
    }

    connectedCallback() {
        super.connectedCallback()
        this.updateValidity()
        this.assumeInteractionOn.forEach((event) => {
            this.addEventListener(event, this.handleInteraction)
        })
    }

    // Append all Validator "observedAttributes" into the "observedAttributes" so they can run.
    static get observedAttributes() {
        const parentAttrs = new Set(super.observedAttributes || [])
        for (const validator of this.validators) {
            if (!validator.observedAttributes) {
                continue
            }
            for (const attr of validator.observedAttributes) {
                parentAttrs.add(attr)
            }
        }
        return [...parentAttrs]
    }

    getForm() {
        return this.internals.form
    }

    checkValidity() {
        this.updateValidity()
        return this.internals.checkValidity()
    }

    reportValidity() {
        this.updateValidity()
        this.hasInteracted = true
        return this.internals.reportValidity()
    }

    setValidity(...args) {
        const flags = args[0]
        const message = args[1]
        let anchor = args[2]
        if (!anchor) {
            anchor = this.validationTarget
        }
        this.internals.setValidity(flags, message, anchor || void 0)
        this.requestUpdate('validity')
        this.setCustomStates()
    }

    setCustomStates() {
        const required = Boolean(this.required)
        const isValid = this.internals.validity.valid
        const hasInteracted = this.hasInteracted
        this.toggleCustomState('required', required)
        this.toggleCustomState('optional', !required)
        this.toggleCustomState('invalid', !isValid)
        this.toggleCustomState('valid', isValid)
        this.toggleCustomState('user-invalid', !isValid && hasInteracted)
        this.toggleCustomState('user-valid', isValid && hasInteracted)
    }

    /**
     * Do not use this when creating a "Validator". This is intended for end users of components.
     * We track manually defined custom errors so we don't clear them on accident in our validators.
     *
     */
    setCustomValidity(message) {
        if (!message) {
            this.customError = null
            this.setValidity({})
            return
        }
        this.customError = message
        this.setValidity({customError:true}, message, this.validationTarget)
    }

    formResetCallback() {
        this.resetValidity()
        this.hasInteracted = false
        this.valueHasChanged = false
        this.emittedEvents = []
        this.updateValidity()
    }

    formDisabledCallback(isDisabled) {
        this.disabled = isDisabled
        this.updateValidity()
    }

    /**
     * Called when the browser is trying to restore element’s state to state in which case reason is "restore", or when
     * the browser is trying to fulfill autofill on behalf of user in which case reason is "autocomplete". In the case of
     * "restore", state is a string, File, or FormData object previously set as the second argument to setFormValue.
     */
    formStateRestoreCallback(state, reason) {
        this.value = state
        if (reason === 'restore') {
            this.resetValidity()
        }
        this.updateValidity()
    }

    setValue(...args) {
        const [value, state] = args
        this.internals.setFormValue(value, state)
    }

    /**
     * Reset validity is a way of removing manual custom errors and native validation.
     */
    resetValidity() {
        this.setCustomValidity('')
        this.setValidity({})
    }

    updateValidity() {
        if (this.disabled || this.hasAttribute('disabled') || !this.willValidate) {
            this.resetValidity()
            return
        }
        const validators = this.allValidators
        if (!validators?.length) {
            return
        }
        const flags = {
            // Don't trust custom errors from the Browser. Safari breaks the spec.
            customError:Boolean(this.customError)
        }
        const formControl = this.validationTarget || this.input || void 0
        let finalMessage = ''
        for (const validator of validators) {
            const {isValid, message, invalidKeys} = validator.checkValidity(this)
            if (isValid) {
                continue
            }
            if (!finalMessage) {
                finalMessage = message
            }
            if (invalidKeys?.length >= 0) {
                invalidKeys.forEach((str) => flags[str] = true)
            }
        }
        if (!finalMessage) {
            finalMessage = this.validationMessage
        }
        this.setValidity(flags, finalMessage, formControl)
    }
}
WebAwesomeFormAssociatedElement.formAssociated = true
__decorateClass([
                    n({reflect:true})
                ], WebAwesomeFormAssociatedElement.prototype, 'name', 2)
__decorateClass([
                    n({type:Boolean})
                ], WebAwesomeFormAssociatedElement.prototype, 'disabled', 2)
__decorateClass([
                    n({state:true, attribute:false})
                ], WebAwesomeFormAssociatedElement.prototype, 'valueHasChanged', 2)
__decorateClass([
                    n({state:true, attribute:false})
                ], WebAwesomeFormAssociatedElement.prototype, 'hasInteracted', 2)
__decorateClass([
                    n({attribute:'custom-error', reflect:true})
                ], WebAwesomeFormAssociatedElement.prototype, 'customError', 2)
__decorateClass([
                    n({attribute:false, state:true, type:Object})
                ], WebAwesomeFormAssociatedElement.prototype, 'validity', 1)

export {
    t,
    n,
    r3 as r,
    t2,
    e2 as e,
    r4 as r2,
    WaInvalidEvent,
    WebAwesomeElement,
    WebAwesomeFormAssociatedElement
}
/*! Bundled license information:

 @lit/reactive-element/decorators/custom-element.js:
 (**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 *)

 @lit/reactive-element/decorators/property.js:
 (**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 *)

 @lit/reactive-element/decorators/state.js:
 (**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 *)

 @lit/reactive-element/decorators/event-options.js:
 (**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 *)

 @lit/reactive-element/decorators/base.js:
 (**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 *)

 @lit/reactive-element/decorators/query.js:
 (**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 *)

 @lit/reactive-element/decorators/query-async.js:
 (**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 *)

 @lit/reactive-element/decorators/query-all.js:
 (**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 *)

 @lit/reactive-element/decorators/query-assigned-elements.js:
 (**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 *)

 @lit/reactive-element/decorators/query-assigned-nodes.js:
 (**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 *)
 */
