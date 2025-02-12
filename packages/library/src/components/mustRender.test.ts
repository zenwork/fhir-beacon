import {assert, describe, it} from 'vitest'
import {DisplayMode}          from '../shell/displayMode'
import {mustRender}           from './mustRender'



describe('MustRender', () => {
  it('should fail with no data and default', () => {
    assert.isFalse(mustRender(undefined), 'default with no data')
  })

  it('should pass with data and default', () => {
    assert.isTrue(mustRender('a'), 'default with data')
  })

  it('should pass with data, verbose, and in narrative mode', () => {
    assert.isTrue(mustRender('a', DisplayMode.narrative, true), 'data, narrative, verbose')
  })

  it('should pass with no data, verbose, and in structure mode', () => {
    assert.isTrue(mustRender(undefined, DisplayMode.structure, true), 'no data, structure, verbose')
  })

  it('should fail with no data, verbose, and in structure mode', () => {
    assert.isFalse(mustRender(undefined, DisplayMode.structure, false), 'no data, structure, not verbose')
  })
  it('should pass with false', () => {
    assert.isTrue(mustRender(false), 'no data, structure, not verbose')
  })
  it('should pass with true', () => {
    assert.isTrue(mustRender(true), 'no data, structure, not verbose')
  })
  it('should fail when summary=false and summaryonly=true', () => {
    assert.isFalse(mustRender('foo', DisplayMode.structure, false, true, false), 'summary=false and summaryonly=true')
  })
})
