export function hostOf(el: HTMLElement): string {

  const host = parentHost(el)
  return `  ${host} > ${el.tagName.toLowerCase()}`
}

function parentHost(child: Node) {
  let host = '*'
  let label = ''
  if (child.parentNode) {
    if (child.parentNode instanceof ShadowRoot) {
      host = child.parentNode.host.tagName.toLowerCase()
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      label = child.parentNode.host.label ? `|${child.parentNode.host.label}|` : ''
      if (child.parentNode.host.parentNode) {
        host = parentHost(child.parentNode.host) + ' > ' + host + label
      }
    } else if (child.parentNode instanceof HTMLElement) {
      host = child.parentNode.tagName.toLowerCase()
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      label = child.parentNode.label ? `|${child.parentNode.label}|` : ''
      if (child.parentNode.parentNode) {
        host = parentHost(child.parentNode) + ' > ' + host + label
      }
    } else {
      host = ''
    }

  }
  return host
}
