import {expect} from '@esm-bundle/chai'
import {hasAll} from './hasAll'

describe('function: has all', () => {

  const obj = { a: 'aa', b: 'bb', c: 'cc', d: 'dd' }
  it('should find all properties', () => {
    expect(hasAll(obj, ['a', 'c'])).to.be.true
  })

  it('should find all properties when none are provided', () => {
    expect(hasAll(obj, [])).to.be.true
  })

  it('should not find all properties', () => {
    expect(hasAll(obj, ['a', 'f'])).to.be.false
  })

  it('should not find all properties', () => {
    expect(hasAll(obj, ['x', 'f'])).to.be.false
  })

  it('should not find all properties', () => {
    expect(hasAll(obj, ['a', 'b', 'c', 'd', 'e'])).to.be.false
  })
})
