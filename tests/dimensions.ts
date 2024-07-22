const convertToRems = (el: HTMLElement, inPixels: number) => {
  const rootFontSize = parseFloat(getComputedStyle(el).fontSize)
  return inPixels / rootFontSize
}

const getPixDimmensions = (el: HTMLElement) => {
  const rect = el.getBoundingClientRect()
  const hPx = rect.height
  const wPx = rect.width
  return { hPx, wPx }
}

export const dimmensions = (div: HTMLElement, as: 'px' | 'rem') => {
  const { hPx, wPx } = getPixDimmensions(div)
  if (as === 'px') {
    return { h: hPx, w: wPx }
  }

  if (as === 'rem') {
    const h = convertToRems(div, hPx)
    const w = convertToRems(div, wPx)
    return { h, w }
  }

  throw new Error('must compute px or rem dimensions')
}
