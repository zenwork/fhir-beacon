let globalSheets: CSSStyleSheet[] = []

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
