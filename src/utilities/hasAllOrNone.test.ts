import {expect}       from '@esm-bundle/chai'
import {hasAllOrNone} from './hasAllOrNone'
import {hasNone}      from './hasNone'

describe('function: has all or none', () => {

  const obj = { a: 'aa', b: 'bb', c: 'cc', d: 'dd' }

  it('should find no properties and pass', () => {
    expect(hasAllOrNone(obj, ['x', 'y'])).to.be.true
  })

  it('should find no properties when none are provided and pass', () => {
    expect(hasAllOrNone(obj, [])).to.be.true
  })

  it('should find some properties and fail', () => {
    expect(hasAllOrNone(obj, ['a', 'f'])).to.be.false
  })

  it('should find all properties and pass', () => {
    expect(hasAllOrNone(obj, ['a', 'b', 'c'])).to.be.true
  })

  it('should find some properties and fail', () => {
    expect(hasNone(obj, ['a', 'b', 'c', 'd', 'e'])).to.be.false
  })
})
