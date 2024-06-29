let globalSheets: CSSStyleSheet[] = []

// TODO: I don't think I need this feature. Probably fine to require that it's loaded by the parent page

export function loadShoelaceStylesFromPage(shadow: ShadowRoot) {
  shadow.adoptedStyleSheets.push(...getGlobalStyleSheets())
}

export function getGlobalStyleSheets() {
  if (globalSheets.length === 0) {
    globalSheets.push(...Array
      .from(document.styleSheets)
      .filter(css => css.title ? css.title === 'fhir-style' : false)
      .map(x => {

        const sheet = new CSSStyleSheet()
        const css = Array.from(x.cssRules).map(rule => rule.cssText).join(' ')
        sheet.replaceSync(css)
        return sheet
      }))
  }

  return globalSheets
}
