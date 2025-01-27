import {__decorateClass}            from './chunk.CLOX737Y.js'
import {ae}                         from './chunk.GZGGK7P6.js'
import {visually_hidden_default}    from './chunk.KX7DECVB.js'
import {Ft}                         from './chunk.NLNLKEIA.js'
import {page_mobile_styles_default} from './chunk.PDINVKXG.js'
import {ke}                         from './chunk.S3625EU6.js'
import {getComputedStyle}           from './chunk.VMC5F4YQ.js'
import {co}                         from './chunk.YLDBZ3SZ.js'
import {e, n, t, WebAwesomeElement} from './chunk.ZFRMLSYQ.js'

// src/internal/css-values.ts
var definedProperties = /* @__PURE__ */ new Set()
var initialValues = {
    length:'0px',
    time:'0s',
    angle:'0deg',
    color:'transparent'
}

function resolve(value, {on = document.documentElement, as = 'length', initialValue = initialValues[as]} = {}) {
    const resolver = `--wa-${as}-resolver`
    if (!window.CSS || !CSS.registerProperty) {
        return value
    }
    if (!definedProperties.has(resolver)) {
        CSS.registerProperty({
                                 name:resolver,
                                 syntax:`<${as}>`,
                                 inherits:false,
                                 initialValue
                             })
        definedProperties.add(resolver)
    }
    const previousValue = on.style.getPropertyValue(resolver)
    on.style.setProperty(resolver, value)
    const ret = getComputedStyle(on)?.getPropertyValue(resolver)
    on.style.setProperty(resolver, previousValue)
    return ret ?? value
}

function toPx(value, element = document.documentElement) {
    if (!Number.isNaN(Number(value))) {
        return Number(value)
    }
    const resolved = resolve(value, {on:element})
    if (resolved?.endsWith('px')) {
        return parseFloat(resolved)
    }
    return Number(resolved)
}

function toLength(px) {
    return Number.isNaN(Number(px)) ? px : `${px}px`
}

// src/components/page/page.css
var page_default = ':host {\n  display: block;\n  background-color: var(--wa-color-surface-default);\n  box-sizing: border-box;\n  height: 100%;\n  --menu-width: auto;\n  --main-width: 1fr;\n  --aside-width: auto;\n  --banner-height: 0px;\n  --header-height: 0px;\n  --subheader-height: 0px;\n  --scroll-margin-top: calc(var(--header-height, 0px) + var(--subheader-height, 0px));\n}\n\nslot[name]:not([name=\'skip-to-content\'], [name=\'navigation-toggle\'])::slotted(*) {\n  display: flex;\n  background-color: var(--wa-color-surface-default);\n}\n\n::slotted([slot=\'banner\']) {\n  align-items: center;\n  justify-content: center;\n  gap: var(--wa-space-m);\n  padding: var(--wa-space-xs) var(--wa-space-m);\n}\n\n::slotted([slot=\'header\']) {\n  align-items: center;\n  justify-content: space-between;\n  flex-wrap: wrap;\n  gap: var(--wa-space-m);\n  padding: var(--wa-space-m);\n  flex: auto;\n}\n\n::slotted([slot=\'subheader\']) {\n  align-items: center;\n  justify-content: space-between;\n  flex-wrap: wrap;\n  gap: var(--wa-space-m);\n  padding: var(--wa-space-xs) var(--wa-space-m);\n}\n\n::slotted([slot*=\'navigation\']),\n::slotted([slot=\'menu\']),\n::slotted([slot=\'aside\']) {\n  flex-direction: column;\n  gap: var(--wa-space-m);\n  padding: var(--wa-space-m);\n}\n\n::slotted([slot=\'main-header\']) {\n  align-items: center;\n  justify-content: space-between;\n  flex-wrap: wrap;\n  gap: var(--wa-space-m);\n  padding: var(--wa-space-m) var(--wa-space-3xl);\n}\n\nslot:not([name]) {\n  /* See #331 */\n  &::slotted(main),\n  &::slotted(section) {\n    padding: var(--wa-space-3xl);\n  }\n}\n\n::slotted([slot=\'main-footer\']),\n::slotted([slot=\'footer\']) {\n  align-items: start;\n  justify-content: space-between;\n  flex-wrap: wrap;\n  gap: var(--wa-space-m);\n  padding: var(--wa-space-3xl);\n}\n\n:host([disable-sticky~=\'banner\']) :is([part~=\'header\'], [part~=\'subheader\']) {\n  --banner-height: 0px !important;\n}\n:host([disable-sticky~=\'header\']) [part~=\'subheader\'] {\n  --header-height: 0px !important;\n}\n\n/* Nothing else depends on subheader-height. */\n:host([disable-sticky~=\'subheader\']) {\n}\n:host([disable-sticky~=\'aside\']) [part~=\'aside\'],\n:host([disable-sticky~=\'menu\']) [part~=\'menu\'] {\n  height: unset;\n  max-height: unset;\n}\n\n:host([disable-sticky~=\'banner\']) [part~=\'banner\'],\n:host([disable-sticky~=\'header\']) [part~=\'header\'],\n:host([disable-sticky~=\'subheader\']) [part~=\'subheader\'],\n:host([disable-sticky~=\'aside\']) [part~=\'aside\'],\n:host([disable-sticky~=\'menu\']) [part~=\'menu\'] {\n  position: static;\n  overflow: unset;\n}\n\n:host([disable-sticky~=\'aside\']) [part~=\'aside\'],\n:host([disable-sticky~=\'menu\']) [part~=\'menu\'] {\n  height: auto;\n  max-height: auto;\n}\n\n[part~=\'base\'] {\n  min-height: 100%;\n  display: grid;\n  grid-template-rows: repeat(3, minmax(0, auto)) minmax(0, 1fr) minmax(0, auto);\n  grid-template-columns: 100%;\n  width: 100%;\n  grid-template-areas:\n    \'banner\'\n    \'header\'\n    \'subheader\'\n    \'body\'\n    \'footer\';\n}\n\n/* Grid areas */\n[part~=\'banner\'] {\n  grid-area: banner;\n}\n[part~=\'header\'] {\n  grid-area: header;\n}\n[part~=\'subheader\'] {\n  grid-area: subheader;\n}\n[part~=\'menu\'] {\n  grid-area: menu;\n}\n[part~=\'body\'] {\n  grid-area: body;\n}\n[part~=\'main\'] {\n  grid-area: main;\n}\n[part~=\'aside\'] {\n  grid-area: aside;\n}\n[part~=\'footer\'] {\n  grid-area: footer;\n}\n\n/* Z-indexes */\n[part~=\'banner\'],\n[part~=\'header\'],\n[part~=\'subheader\'] {\n  position: sticky;\n  z-index: 5;\n}\n[part~=\'banner\'] {\n  top: 0px;\n}\n[part~=\'header\'] {\n  top: var(--banner-height);\n\n  /** Make the header flex so that you don\'t unexpectedly have the default toggle button appearing above a slotted div because block elements are fun. */\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  justify-content: space-between;\n}\n[part~=\'subheader\'] {\n  top: calc(var(--header-height) + var(--banner-height));\n}\n[part~=\'body\'] {\n  display: grid;\n  height: 100%;\n  align-items: flex-start;\n  grid-template-columns: minmax(0, var(--menu-width)) minmax(0, var(--main-width)) minmax(0, var(--aside-width));\n  grid-template-rows: minmax(0, 1fr);\n  grid-template-areas: \'menu main aside\';\n}\n[part~=\'main\'] {\n  display: grid;\n  min-height: 100%;\n  grid-template-columns: minmax(0, 1fr);\n  grid-template-rows: minmax(0, auto) minmax(0, 1fr) minmax(0, auto);\n  grid-template-areas:\n    \'main-header\'\n    \'main-content\'\n    \'main-footer\';\n}\n[part~=\'main-header\'] {\n  grid-area: main-header;\n}\n[part~=\'main-content\'] {\n  grid-area: main-content;\n}\n[part~=\'main-footer\'] {\n  grid-area: main-footer;\n}\n\n.skip-to-content {\n  position: absolute;\n  top: var(--wa-space-m);\n  left: var(--wa-space-m);\n  z-index: 6;\n  border-radius: var(--wa-corners-1x);\n  background-color: var(--wa-color-surface-default);\n  color: var(--wa-color-text-link);\n  text-decoration: none;\n  padding: var(--wa-space-s) var(--wa-space-m);\n  box-shadow: var(--wa-shadow-l);\n  outline: var(--wa-focus-ring);\n  outline-offset: var(--wa-focus-ring-offset);\n}\n\n[part~=\'menu\'],\n[part~=\'aside\'] {\n  position: sticky;\n  top: calc(var(--banner-height) + var(--header-height) + var(--subheader-height));\n  z-index: 4;\n  height: calc(100dvh - var(--header-height) - var(--banner-height) - var(--subheader-height));\n  max-height: calc(100dvh - var(--header-height) - var(--banner-height) - var(--subheader-height));\n  overflow: auto;\n}\n\n[part~=\'navigation\'] {\n  height: 100%;\n  display: grid;\n  grid-template-columns: minmax(0, 1fr);\n  grid-template-rows: minmax(0, auto) minmax(0, 1fr) minmax(0, auto);\n}\n\n[part~=\'drawer\']::part(dialog) {\n  background-color: var(--wa-color-surface-default);\n}\n\n/* Set these on the slot because we don\'t always control the navigation-toggle since that may be slotted. */\nslot[name~=\'navigation-toggle\'],\n:host([disable-navigation-toggle]) slot[name~=\'navigation-toggle\'] {\n  display: none;\n}\n\n/* Sometimes the media query in the viewport is stubborn in iframes. This is an extra check to make it behave properly. */\n:host(:not([disable-navigation-toggle])[view=\'mobile\']) slot[name~=\'navigation-toggle\'] {\n  display: contents;\n}\n\n[part~=\'navigation-toggle\'] {\n  /* Use only a margin-inline-start because the slotted header is expected to have default padding\n       so it looks really awkward if this sets a margin-inline-end and the slotted header has a padding-inline-start. */\n  margin-inline-start: var(--wa-space-m);\n}\n'

// src/components/page/page.ts
if (typeof ResizeObserver === 'undefined') {
    globalThis.ResizeObserver = class {
        // eslint-disable-next-line
        constructor(..._args) {
        }

        // eslint-disable-next-line
        observe(..._args) {
        }

        // eslint-disable-next-line
        unobserve(..._args) {
        }

        // eslint-disable-next-line
        disconnect(..._args) {
        }
    }
}
var WaPage = class extends WebAwesomeElement {
    constructor() {
        super()
        this.headerResizeObserver = this.slotResizeObserver('header')
        this.subheaderResizeObserver = this.slotResizeObserver('subheader')
        this.bannerResizeObserver = this.slotResizeObserver('banner')
        this.footerResizeObserver = this.slotResizeObserver('footer')
        this.handleNavigationToggle = (e2) => {
            if (this.view === 'desktop') {
                this.hideNavigation()
                return
            }
            const path = e2.composedPath()
            const navigationToggleSlot = this.navigationToggleSlot
            if (path.find((el) => {
                return el.hasAttribute?.('data-toggle-nav') || el.assignedSlot === navigationToggleSlot || el === navigationToggleSlot
            })) {
                e2.preventDefault()
                this.toggleNavigation()
            }
        }
        this.view = 'desktop'
        this.navOpen = false
        this.mobileBreakpoint = '768px'
        this.navigationPlacement = 'start'
        this.disableNavigationToggle = false
        this.pageResizeObserver = new ResizeObserver((entries) => {
            for (const entry of entries) {
                if (entry.contentBoxSize) {
                    const contentBoxSize = entry.borderBoxSize[0]
                    const pageWidth = contentBoxSize.inlineSize
                    const oldView = this.view
                    if (pageWidth >= toPx(this.mobileBreakpoint)) {
                        this.view = 'desktop'
                    } else {
                        this.view = 'mobile'
                    }
                    this.requestUpdate('view', oldView)
                }
            }
        })
        if (!co) {
            this.addEventListener('click', this.handleNavigationToggle)
        }
    }

    slotResizeObserver(slot) {
        return new ResizeObserver((entries) => {
            for (const entry of entries) {
                if (entry.contentBoxSize) {
                    const contentBoxSize = entry.borderBoxSize[0]
                    this.style.setProperty(`--${slot}-height`, `${contentBoxSize.blockSize}px`)
                }
            }
        })
    }

    update(changedProperties) {
        if (changedProperties.has('view')) {
            this.hideNavigation()
        }
        super.update(changedProperties)
    }

    connectedCallback() {
        super.connectedCallback()
        this.pageResizeObserver.observe(this)
        const navQuery = ':not([slot=\'toggle-navigation\']) [data-toggle-nav]'
        this.disableNavigationToggle = Boolean(this.querySelector(navQuery))
        setTimeout(() => {
            this.headerResizeObserver.observe(this.header)
            this.subheaderResizeObserver.observe(this.subheader)
            this.bannerResizeObserver.observe(this.banner)
            this.footerResizeObserver.observe(this.footer)
            this.disableNavigationToggle = Boolean(this.querySelector(navQuery))
        })
    }

    firstUpdated() {
        if (!document.getElementById('main-content')) {
            const div = document.createElement('div')
            div.id = 'main-content'
            div.slot = 'skip-to-content-target'
            this.prepend(div)
        }
    }

    disconnectedCallback() {
        super.disconnectedCallback()
        this.pageResizeObserver.unobserve(this)
        this.headerResizeObserver.unobserve(this.header)
        this.subheaderResizeObserver.unobserve(this.subheader)
        this.footerResizeObserver.unobserve(this.footer)
        this.bannerResizeObserver.unobserve(this.banner)
    }

    /**
     * Shows the mobile navigation drawer
     */
    showNavigation() {
        this.navOpen = true
    }

    /**
     * Hides the mobile navigation drawer
     */
    hideNavigation() {
        this.navOpen = false
    }

    /**
     * Toggles the mobile navigation drawer
     */
    toggleNavigation() {
        this.navOpen = !this.navOpen
    }

    render() {
        return ke`
      <a href="#main-content" part="skip-to-content" class="wa-visually-hidden">
        <slot name="skip-to-content">Skip to content</slot>
      </a>

      <!-- unsafeHTML needed for SSR until this is solved: https://github.com/lit/lit/issues/4696 -->
      ${ae(`
        <style id="mobile-styles">
          ${page_mobile_styles_default(toLength(this.mobileBreakpoint))}
        </style>
      `)}

      <div class="base" part="base">
        <div class="banner" part="banner">
          <slot name="banner"></slot>
        </div>
        <div class="header" part="header">
          <slot name="navigation-toggle">
            <wa-button part="navigation-toggle" size="small" appearance="plain" variant="neutral">
              <slot name="navigation-toggle-icon">
                <wa-icon name="bars" part="navigation-toggle-icon" label="Toggle navigation drawer"></wa-icon>
              </slot>
            </wa-button>
          </slot>
          <slot name="header"></slot>
        </div>
        <div class="subheader" part="subheader">
          <slot name="subheader"></slot>
        </div>
        <div class="body" part="body">
          <div class="menu" part="menu">
            <slot name="menu">
              <nav name="navigation" class="navigation" part="navigation navigation-desktop">
                <!-- Add fallback divs so that CSS grid works properly. -->
                <slot name="desktop-navigation-header">
                  <slot name=${this.view === 'desktop' ? 'navigation-header' : '___'}><div></div></slot>
                </slot>
                <slot name="desktop-navigation">
                  <slot name=${this.view === 'desktop' ? 'navigation' : '____'}><div></div></slot>
                </slot>
                <slot name="desktop-navigation-footer">
                  <slot name=${this.view === 'desktop' ? 'navigation-footer' : '___'}><div></div></slot>
                </slot>
              </nav>
            </slot>
          </div>
          <div class="main" part="main">
            <div class="main-header" part="main-header">
              <slot name="main-header"></slot>
            </div>
            <div class="main-content" part="main-content">
              <slot name="skip-to-content-target"></slot>
              <slot></slot>
            </div>
            <div class="main-footer" part="main-footer">
              <slot name="main-footer"></slot>
            </div>
          </div>
          <div class="aside" part="aside">
            <slot name="aside"></slot>
          </div>
        </div>
        <div class="footer" part="footer">
          <slot name="footer"></slot>
        </div>
      </div>
      <wa-drawer
        part="drawer"
        placement=${this.navigationPlacement}
        light-dismiss
        ?open=${Ft(this.navOpen)}
        @wa-after-show=${() => this.navOpen = this.navigationDrawer.open}
        @wa-after-hide=${() => this.navOpen = this.navigationDrawer.open}
        exportparts="
          dialog:drawer__dialog,
          overlay:drawer__overlay,
          panel:drawer__panel,
          header:drawer__header,
          header-actions:drawer__header-actions,
          title:drawer__title,
          close-button:drawer__close-button,
          close-button__base:drawer__close-button__base,
          body:drawer__body,
          footer:drawer__footer
        "
        class="navigation-drawer"
        with-header
        with-footer
      >
        <slot slot="label" part="navigation-header" name="mobile-navigation-header">
          <slot name=${this.view === 'mobile' ? 'navigation-header' : '___'}></slot>
        </slot>
        <slot name="mobile-navigation">
          <slot name=${this.view === 'mobile' ? 'navigation' : '____'}></slot>
        </slot>

        <slot name="mobile-navigation-footer">
          <slot
            part="navigation-footer"
            slot="footer"
            name=${this.view === 'mobile' ? 'navigation-footer' : '___'}
          ></slot>
        </slot>
      </wa-drawer>
    `
    }
}
WaPage.shadowStyle = [visually_hidden_default, page_default]
__decorateClass([
                    e('[part~=\'header\']')
                ], WaPage.prototype, 'header', 2)
__decorateClass([
                    e('[part~=\'subheader\']')
                ], WaPage.prototype, 'subheader', 2)
__decorateClass([
                    e('[part~=\'footer\']')
                ], WaPage.prototype, 'footer', 2)
__decorateClass([
                    e('[part~=\'banner\']')
                ], WaPage.prototype, 'banner', 2)
__decorateClass([
                    e('[part~=\'drawer\']')
                ], WaPage.prototype, 'navigationDrawer', 2)
__decorateClass([
                    e('slot[name~=\'navigation-toggle\']')
                ], WaPage.prototype, 'navigationToggleSlot', 2)
__decorateClass([
                    n({attribute:'view', reflect:true})
                ], WaPage.prototype, 'view', 2)
__decorateClass([
                    n({attribute:'nav-open', reflect:true, type:Boolean})
                ], WaPage.prototype, 'navOpen', 2)
__decorateClass([
                    n({attribute:'mobile-breakpoint', type:String})
                ], WaPage.prototype, 'mobileBreakpoint', 2)
__decorateClass([
                    n({attribute:'navigation-placement', reflect:true})
                ], WaPage.prototype, 'navigationPlacement', 2)
__decorateClass([
                    n({attribute:'disable-navigation-toggle', reflect:true, type:Boolean})
                ], WaPage.prototype, 'disableNavigationToggle', 2)
WaPage = __decorateClass([
                             t('wa-page')
                         ], WaPage)

export {
    WaPage
}
