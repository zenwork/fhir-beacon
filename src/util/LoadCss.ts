let cssText = ''

async function load(shadow: ShadowRoot, url: string) {
  if (!cssText) {
    const response = await fetch(url)
    cssText = await response.text()
  }
  const sheet = new CSSStyleSheet()
  sheet.replaceSync(cssText)
  if (shadow) shadow.adoptedStyleSheets = [sheet, ...shadow.adoptedStyleSheets]
}

export async function loadStyles(shadow: ShadowRoot) {

  // return await load(shadow, 'https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.15.0/cdn/themes/light.css')
}
