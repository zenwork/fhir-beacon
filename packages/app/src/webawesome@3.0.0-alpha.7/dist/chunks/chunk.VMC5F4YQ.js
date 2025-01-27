// src/internal/computedStyle.ts
var computedStyleMap = /* @__PURE__ */ new WeakMap()

function getComputedStyle(el) {
    let computedStyle = computedStyleMap.get(el)
    if (!computedStyle && globalThis.window) {
        computedStyle = window.getComputedStyle(el)
        computedStyleMap.set(el, computedStyle)
    }
    return computedStyle ?? null
}

export {
    getComputedStyle
}
