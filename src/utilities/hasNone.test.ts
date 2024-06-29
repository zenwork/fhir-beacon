import {expect}  from '@esm-bundle/chai'
import {hasNone} from './hasNone'

describe('function: has none', () => {

  const obj = { a: 'aa', b: 'bb', c: 'cc', d: 'dd' }
  it('should find no properties', () => {
    expect(hasNone(obj, ['x', 'y'])).to.be.true
  })

  it('should find no properties when none are provided', () => {
    expect(hasNone(obj, [])).to.be.true
  })

  it('should find some properties', () => {
    expect(hasNone(obj, ['a', 'f'])).to.be.false
  })

  it('should find all properties', () => {
    expect(hasNone(obj, ['a', 'b', 'c'])).to.be.false
  })

  it('should find some properties', () => {
    expect(hasNone(obj, ['a', 'b', 'c', 'd', 'e'])).to.be.false
  })
})
