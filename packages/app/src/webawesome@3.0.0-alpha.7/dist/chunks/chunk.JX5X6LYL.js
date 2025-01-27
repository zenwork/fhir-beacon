import {__decorateClass}      from './chunk.CLOX737Y.js'
import {LocalizeController}   from './chunk.JVQWFNCH.js'
import {ke}                   from './chunk.S3625EU6.js'
import {t, WebAwesomeElement} from './chunk.ZFRMLSYQ.js'

// src/components/spinner/spinner.css
var spinner_default = ':host {\n  --track-width: 2px;\n  --track-color: var(--wa-color-neutral-fill-normal);\n  --indicator-color: var(--wa-color-brand-fill-loud);\n  --speed: 2s;\n\n  /* Resizing a spinner element using anything but font-size will break the animation because the animation uses em units.\n   Therefore, if a spinner is used in a flex container without `flex: none` applied, the spinner can grow/shrink and\n   break the animation. The use of `flex: none` on the host element prevents this by always having the spinner sized\n   according to its actual dimensions.\n  */\n  flex: none;\n  display: inline-flex;\n  width: 1em;\n  height: 1em;\n}\n\nsvg {\n  width: 100%;\n  height: 100%;\n  aspect-ratio: 1;\n  animation: spin var(--speed) linear infinite;\n}\n\n.track {\n  stroke: var(--track-color);\n}\n\n.indicator {\n  stroke: var(--indicator-color);\n  stroke-dasharray: 75, 100;\n  stroke-dashoffset: -5;\n  animation: dash 1.5s ease-in-out infinite;\n  stroke-linecap: round;\n}\n\n@keyframes spin {\n  0% {\n    transform: rotate(0deg);\n  }\n  100% {\n    transform: rotate(360deg);\n  }\n}\n\n@keyframes dash {\n  0% {\n    stroke-dasharray: 1, 150;\n    stroke-dashoffset: 0;\n  }\n  50% {\n    stroke-dasharray: 90, 150;\n    stroke-dashoffset: -35;\n  }\n  100% {\n    stroke-dasharray: 90, 150;\n    stroke-dashoffset: -124;\n  }\n}\n'

// src/components/spinner/spinner.ts
var WaSpinner = class extends WebAwesomeElement {
    constructor() {
        super(...arguments)
        this.localize = new LocalizeController(this)
    }

    render() {
        return ke`
      <svg
        part="base"
        role="progressbar"
        aria-label=${this.localize.term('loading')}
        fill="none"
        viewBox="0 0 50 50"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle class="track" cx="25" cy="25" r="20" fill="none" stroke-width="5" />
        <circle class="indicator" cx="25" cy="25" r="20" fill="none" stroke-width="5" />
      </svg>
    `
    }
}
WaSpinner.shadowStyle = spinner_default
WaSpinner = __decorateClass([
                                t('wa-spinner')
                            ], WaSpinner)

export {
    WaSpinner
}
