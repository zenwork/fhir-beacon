import {expect} from '@open-wc/testing'

import {hasSameAncestor} from './hasSameAncestor'

let id = 0
const create = ({tagName, ancestor, shadow = false, addSlot = false, appendToSlot = false}: {
  tagName: string,
  ancestor: HTMLElement,
  shadow?: boolean,
  addSlot?: boolean,
  appendToSlot?: boolean
}) => {
  const child = document.createElement(tagName)
  child.id = 'c' + id++

  if (shadow) {
    child.attachShadow({mode: 'open'})
    if (addSlot) {
      child.shadowRoot!.innerHTML = ('c' + id).padStart(id, '-') + '<slot></slot>'
    } else {
      child.innerHTML = ('c' + id).padStart(id, '-')

    }
  } else {
    child.innerHTML = ('c' + id).padStart(id, '-')
  }

  if (ancestor.shadowRoot && !appendToSlot) {
    ancestor.shadowRoot?.appendChild(child)
  } else {
    ancestor.appendChild(child)

  }

  return child
}
describe('function: has same ancestor', () => {

  it('should return false when null is provided', async () => {
    await expect(hasSameAncestor(null)).to.equal(false)
  })

  it('should return false if it reaches body without finding a match', async () => {
    const child = create({ tagName: 'div', ancestor: document.body })
    await expect(hasSameAncestor(child)).to.equal(false)
  })

  it('should return true if first ancestor is same', async () => {
    let child = create({tagName: 'div', ancestor: document.body})
    child = create({tagName: 'div', ancestor: child})
    await expect(hasSameAncestor(child)).to.equal(true)
  })

  it('should return true if same ancestor is far away', async () => {
    let child = create({tagName: 'div', ancestor: document.body})
    child = create({tagName: 'p', ancestor: child})
    child = create({tagName: 'p', ancestor: child})
    child = create({tagName: 'div', ancestor: child})
    await expect(hasSameAncestor(child)).to.equal(true)
  })

  it('should return true if there is a shadowroot in between', async () => {
    let child = create({tagName: 'div', ancestor: document.body})
    child = create({tagName: 'p', ancestor: child})
    child = create({tagName: 'p', ancestor: child, shadow: true})
    child = create({tagName: 'div', ancestor: child})
    await expect(hasSameAncestor(child)).to.equal(true)
  })

  it('should return true if the starting point is a shadowroot', async () => {
    let child = create({tagName: 'div', ancestor: document.body})
    child = create({tagName: 'p', ancestor: child})
    child = create({tagName: 'p', ancestor: child})
    child = create({tagName: 'div', ancestor: child, shadow: true})
    await expect(hasSameAncestor(child)).to.equal(true)
  })

  it('should return true if they are all shadowroots', async () => {
    let child = create({tagName: 'div', ancestor: document.body, shadow: true})
    child = create({tagName: 'p', ancestor: child, shadow: true})
    child = create({tagName: 'p', ancestor: child, shadow: true})
    child = create({tagName: 'div', ancestor: child, shadow: true})
    await expect(hasSameAncestor(child)).to.equal(true)
  })

  it('should return true if there are many shadowroots in between', async () => {
    let child = create({tagName: 'div', ancestor: document.body})
    child = create({tagName: 'p', ancestor: child})
    child = create({tagName: 'p', ancestor: child})
    child = create({tagName: 'p', ancestor: child, shadow: true})
    child = create({tagName: 'p', ancestor: child})
    child = create({tagName: 'p', ancestor: child})
    child = create({tagName: 'p', ancestor: child, shadow: true})
    child = create({tagName: 'div', ancestor: child})
    await expect(hasSameAncestor(child)).to.equal(true)
  })

  it('should return false if there are many shadowroots but no same element', async () => {
    let child = create({tagName: 'p', ancestor: document.body})
    child = create({tagName: 'p', ancestor: child})
    child = create({tagName: 'p', ancestor: child})
    child = create({tagName: 'p', ancestor: child, shadow: true})
    child = create({tagName: 'p', ancestor: child})
    child = create({tagName: 'p', ancestor: child})
    child = create({tagName: 'p', ancestor: child, shadow: true})
    child = create({tagName: 'div', ancestor: child})
    await expect(hasSameAncestor(child)).to.equal(false)
  })

  it('should return true with slotted elements', async () => {
    let child = create({tagName: 'div', ancestor: document.body, shadow: true})
    child = create({tagName: 'p', ancestor: child})
    child = create({tagName: 'p', ancestor: child, shadow: true, addSlot: true})
    child = create({tagName: 'div', ancestor: child, appendToSlot: true})
    await expect(hasSameAncestor(child)).to.equal(true)
  })

})
