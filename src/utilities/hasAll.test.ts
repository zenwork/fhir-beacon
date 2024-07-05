import {expect} from '@open-wc/testing'
import {hasAll} from './hasAll'

describe('function: has all', () => {

  const obj = { a: 'aa', b: 'bb', c: 'cc', d: 'dd' }
  it('should find all properties', async () => {
    await expect(hasAll(obj, ['a', 'c'])).to.equal(true)
  })

  it('should find all properties when none are provided', async () => {
    await expect(hasAll(obj, [])).to.equal(true)
  })

  it('should not find all properties in subset', async () => {
    await expect(hasAll(obj, ['a', 'f'])).to.equal(false)
  })

  it('should not find all properties', async () => {
    await expect(hasAll(obj, ['x', 'f'])).to.equal(false)
  })

  it('should not find all properties in superset', async () => {
    await expect(hasAll(obj, ['a', 'b', 'c', 'd', 'e'])).to.equal(false)
  })
})
