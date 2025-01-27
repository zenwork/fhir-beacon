// src/internal/animate.ts
async function animate(el, keyframes, options) {
    return el.animate(keyframes, options).finished.catch(() => {
    })
}

function animateWithClass(el, className) {
    return new Promise((resolve) => {
        const controller = new AbortController()
        const {signal} = controller
        el.classList.remove(className)
        el.classList.add(className)
        let onEnd = () => {
            el.classList.remove(className)
            resolve()
            controller.abort()
        }
        el.addEventListener('animationend', onEnd, {once:true, signal})
        el.addEventListener('animationcancel', onEnd, {once:true, signal})
    })
}

function parseDuration(duration) {
    duration = duration.toString().toLowerCase()
    if (duration.indexOf('ms') > -1) {
        return parseFloat(duration) || 0
    }
    if (duration.indexOf('s') > -1) {
        return (parseFloat(duration) || 0) * 1e3
    }
    return parseFloat(duration) || 0
}

function prefersReducedMotion() {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    return query.matches
}

export {
    animate,
    animateWithClass,
    parseDuration,
    prefersReducedMotion
}
