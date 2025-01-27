// src/utilities/base-path.ts
var basePath = ''
var kitCode = ''

function setBasePath(path) {
    basePath = path
}

function getBasePath(subpath = '') {
    if (!basePath) {
        const el = document.querySelector('[data-webawesome]')
        if (el?.hasAttribute('data-webawesome')) {
            const rootRelativeUrl = new URL(el.getAttribute('data-webawesome') ?? '', window.location.href).pathname
            setBasePath(rootRelativeUrl)
        } else {
            const scripts = [...document.getElementsByTagName('script')]
            const waScript = scripts.find(
                (script) => script.src.endsWith('webawesome.js') ||
                            script.src.endsWith('webawesome.loader.js') ||
                            script.src.endsWith('webawesome.ssr-loader.js')
            )
            if (waScript) {
                const path = String(waScript.getAttribute('src'))
                setBasePath(path.split('/').slice(0, -1).join('/'))
            }
        }
    }
    return basePath.replace(/\/$/, '') + (subpath ? `/${subpath.replace(/^\//, '')}` : ``)
}

function setKitCode(code) {
    kitCode = code
}

function getKitCode() {
    if (!kitCode) {
        const el = document.querySelector('[data-fa-kit-code]')
        if (el) {
            setKitCode(el.getAttribute('data-fa-kit-code') || '')
        }
    }
    return kitCode
}

// src/components/icon/library.default.ts
function getIconUrl(name, family, variant) {
    const kitCode2 = getKitCode()
    const isPro = kitCode2.length > 0
    let folder = 'solid'
    if (family === 'classic') {
        if (variant === 'thin') folder = 'thin'
        if (variant === 'light') folder = 'light'
        if (variant === 'regular') folder = 'regular'
        if (variant === 'solid') folder = 'solid'
    }
    if (family === 'sharp') {
        if (variant === 'thin') folder = 'sharp-thin'
        if (variant === 'light') folder = 'sharp-light'
        if (variant === 'regular') folder = 'sharp-regular'
        if (variant === 'solid') folder = 'sharp-solid'
    }
    if (family === 'brands') {
        folder = 'brands'
    }
    if (family === 'duotone') {
        folder = 'duotone'
    }
    return isPro
        ? `https://ka-p.fontawesome.com/releases/v6.5.2/svgs/${folder}/${name}.svg?token=${encodeURIComponent(kitCode2)}`
        : `https://ka-f.fontawesome.com/releases/v6.5.2/svgs/${folder}/${name}.svg`
}

var library = {
    name:'default',
    resolver:(name, family = 'classic', variant = 'solid') => {
        return getIconUrl(name, family, variant)
    }
}
var library_default_default = library

export {
    setBasePath,
    getBasePath,
    setKitCode,
    getKitCode,
    library_default_default
}
