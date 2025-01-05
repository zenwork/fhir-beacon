export function getSlotContent(slot: HTMLSlotElement): string {
  if (slot) {
    const assignedNodes = slot.assignedNodes()
    const content = assignedNodes.map(node => node.textContent).join(', ')
    return content
  }
  return ''
}
