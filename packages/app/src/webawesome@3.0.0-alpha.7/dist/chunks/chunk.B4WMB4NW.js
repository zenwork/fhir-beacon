// src/events/after-hide.ts
var WaAfterHideEvent = class extends Event {
    constructor() {
        super('wa-after-hide', {bubbles:true, cancelable:false, composed:true})
    }
}

// src/events/after-show.ts
var WaAfterShowEvent = class extends Event {
    constructor() {
        super('wa-after-show', {bubbles:true, cancelable:false, composed:true})
    }
}

// src/events/hide.ts
var WaHideEvent = class extends Event {
    constructor(detail) {
        super('wa-hide', {bubbles:true, cancelable:true, composed:true})
        this.detail = detail
    }
}

// src/events/show.ts
var WaShowEvent = class extends Event {
    constructor() {
        super('wa-show', {bubbles:true, cancelable:true, composed:true})
    }
}

export {
    WaAfterHideEvent,
    WaAfterShowEvent,
    WaHideEvent,
    WaShowEvent
}
