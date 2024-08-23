import {assert, describe, it} from 'vitest'
import {DisplayMode}          from '../types'
import {mustRender}           from './mustRender'

describe('MustRender', () => {
  it('should fail with no data and default', () => {
    assert.isFalse(mustRender(undefined), 'default with no data')
  })

  it('should pass with no data and default', () => {
    assert.isTrue(mustRender('a'), 'default with data')
  })

  it('should pass with no data but verbose in structure mode', () => {
    assert.isTrue(mustRender('a', DisplayMode.narrative, true), 'data, narrative, verbose')
  })

  it('should pass with no data but verbose in structure mode', () => {
    assert.isTrue(mustRender(undefined, DisplayMode.structure, true), 'no data, structure, verbose')
  })

  it('should fail with no data but verbose in structure mode', () => {
    assert.isFalse(mustRender(undefined, DisplayMode.structure, false), 'no data, structure, not verbose')
  })
})
