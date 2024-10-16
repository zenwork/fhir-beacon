const getAncestor = (child: HTMLElement | null) => {
  if (child) {
    if (child.getRootNode() instanceof ShadowRoot) {
      return (child.getRootNode({ composed: false }) as unknown as any).host
    }
    return child?.parentElement
  }
  return null
}

export const hasSameAncestor = (child: HTMLElement | null): boolean => {

  let found = false
  const childName = child?.tagName
  let currentAncestor = getAncestor(child)
  let currentName = currentAncestor?.tagName

  while (currentAncestor) {
    if (childName === currentName) {
      found = true
      currentAncestor = null
    } else {
      currentAncestor = getAncestor(currentAncestor)
      currentName = currentAncestor?.tagName
    }


  }

  return found
}
