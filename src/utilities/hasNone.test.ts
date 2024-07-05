import {expect}  from '@open-wc/testing'
import {hasNone} from './hasNone'

describe('function: has none', () => {

  const obj = { a: 'aa', b: 'bb', c: 'cc', d: 'dd' }
  it('should find no properties', async () => {
    await expect(hasNone(obj, ['x', 'y'])).to.equal(true)
  })

  it('should find no properties when none are provided', async () => {
    await expect(hasNone(obj, [])).to.equal(true)
  })

  it('should find some properties in subset', async () => {
    await expect(hasNone(obj, ['a', 'f'])).to.equal(false)
  })

  it('should find all properties in subset', async () => {
    await expect(hasNone(obj, ['a', 'b', 'c'])).to.equal(false)
  })

  it('should find some properties in superset', async () => {
    await expect(hasNone(obj, ['a', 'b', 'c', 'd', 'e'])).to.equal(false)
  })
})
