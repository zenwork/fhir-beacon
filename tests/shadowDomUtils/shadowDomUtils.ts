export function hostOf(el: HTMLElement): string {

  const host = parentHost(el)
  return `  ${host} > ${el.tagName.toLowerCase()}`
}

function parentHost(child: Node) {
  let host = '*'
  if (child.parentNode) {
    if (child.parentNode instanceof ShadowRoot) {
      host = child.parentNode.host.tagName.toLowerCase()
      if (child.parentNode.host.parentNode) {
        host = parentHost(child.parentNode.host) + ' > ' + host
      }
    } else if (child.parentNode instanceof HTMLElement) {
      host = child.parentNode.tagName.toLowerCase()
      if (child.parentNode.parentNode) {
        host = parentHost(child.parentNode) + ' > ' + host
      }
    } else {
      host = ''
    }

  }
  return host
}
