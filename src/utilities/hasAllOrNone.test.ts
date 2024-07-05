import {expect}       from '@open-wc/testing'
import {hasAllOrNone} from './hasAllOrNone'
import {hasNone}      from './hasNone'

describe('function has all or none', () => {

  const obj = { a: 'aa', b: 'bb', c: 'cc', d: 'dd' }

  it('should find no properties and pass', async () => {
    await expect(hasAllOrNone(obj, ['x', 'y'])).to.equal(true)
  })

  it('should find no properties when none are provided and pass', async () => {
    await expect(hasAllOrNone(obj, [])).to.equal(true)
  })

  it('should find some properties and fail', async () => {
    await expect(hasAllOrNone(obj, ['a', 'f'])).to.equal(false)
  })

  it('should find all properties and pass', async () => {
    await expect(hasAllOrNone(obj, ['a', 'b', 'c'])).to.equal(true)
  })

  it('should find some extra properties and fail', async () => {
    await expect(hasNone(obj, ['a', 'b', 'c', 'd', 'e'])).to.equal(false)
  })
})
