import {expect}          from '@esm-bundle/chai'
import {hasSameAncestor} from './hasSameAncestor'

let id = 0
const create = ({tagName, ancestor, shadow = false, addSlot = false, appendToSlot = false}: {
  tagName: string,
  ancestor: HTMLElement,
  shadow?: boolean,
  addSlot?: boolean,
  appendToSlot?: boolean
}) => {
  let child = document.createElement(tagName)
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

  it('should return false when null is provided', () => {
    expect(hasSameAncestor(null)).to.equal(false)
  })

  it('should return false if it reaches body without finding a match', () => {
    let child = create({tagName: 'div', ancestor: document.body})
    expect(hasSameAncestor(child)).to.equal(false)
  })

  it('should return true if first ancestor is same', () => {
    let child = create({tagName: 'div', ancestor: document.body})
    child = create({tagName: 'div', ancestor: child})
    expect(hasSameAncestor(child)).to.equal(true)
  })

  it('should return true if same ancestor is far away', () => {
    let child = create({tagName: 'div', ancestor: document.body})
    child = create({tagName: 'p', ancestor: child})
    child = create({tagName: 'p', ancestor: child})
    child = create({tagName: 'div', ancestor: child})
    expect(hasSameAncestor(child)).to.equal(true)
  })

  it('should return true if there is a shadowroot in between', () => {
    let child = create({tagName: 'div', ancestor: document.body})
    child = create({tagName: 'p', ancestor: child})
    child = create({tagName: 'p', ancestor: child, shadow: true})
    child = create({tagName: 'div', ancestor: child})
    expect(hasSameAncestor(child)).to.equal(true)
  })

  it('should return true if the starting point is a shadowroot', () => {
    let child = create({tagName: 'div', ancestor: document.body})
    child = create({tagName: 'p', ancestor: child})
    child = create({tagName: 'p', ancestor: child})
    child = create({tagName: 'div', ancestor: child, shadow: true})
    expect(hasSameAncestor(child)).to.equal(true)
  })

  it('should return true if they are all shadowroots', () => {
    let child = create({tagName: 'div', ancestor: document.body, shadow: true})
    child = create({tagName: 'p', ancestor: child, shadow: true})
    child = create({tagName: 'p', ancestor: child, shadow: true})
    child = create({tagName: 'div', ancestor: child, shadow: true})
    expect(hasSameAncestor(child)).to.equal(true)
  })

  it('should return true if there are many shadowroots in between', () => {
    let child = create({tagName: 'div', ancestor: document.body})
    child = create({tagName: 'p', ancestor: child})
    child = create({tagName: 'p', ancestor: child})
    child = create({tagName: 'p', ancestor: child, shadow: true})
    child = create({tagName: 'p', ancestor: child})
    child = create({tagName: 'p', ancestor: child})
    child = create({tagName: 'p', ancestor: child, shadow: true})
    child = create({tagName: 'div', ancestor: child})
    expect(hasSameAncestor(child)).to.equal(true)
  })

  it('should return false if there are many shadowroots but no same element', () => {
    let child = create({tagName: 'p', ancestor: document.body})
    child = create({tagName: 'p', ancestor: child})
    child = create({tagName: 'p', ancestor: child})
    child = create({tagName: 'p', ancestor: child, shadow: true})
    child = create({tagName: 'p', ancestor: child})
    child = create({tagName: 'p', ancestor: child})
    child = create({tagName: 'p', ancestor: child, shadow: true})
    child = create({tagName: 'div', ancestor: child})
    expect(hasSameAncestor(child)).to.equal(false)
  })

  it('should return true with slotted elements', () => {
    let child = create({tagName: 'div', ancestor: document.body, shadow: true})
    child = create({tagName: 'p', ancestor: child})
    child = create({tagName: 'p', ancestor: child, shadow: true, addSlot: true})
    child = create({tagName: 'div', ancestor: child, appendToSlot: true})
    expect(hasSameAncestor(child)).to.equal(true)
  })

})
