// src/events/blur.ts
var WaBlurEvent = class extends Event {
    constructor() {
        super('wa-blur', {bubbles:true, cancelable:false, composed:true})
    }
}

// src/events/focus.ts
var WaFocusEvent = class extends Event {
    constructor() {
        super('wa-focus', {bubbles:true, cancelable:false, composed:true})
    }
}

export {
    WaBlurEvent,
    WaFocusEvent
}
