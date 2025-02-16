import {describe, expect, it} from 'vitest'
import {asDecodedBase64}      from '../../../../src/components/primitive/type-formatters/asDecodedBase64'



describe('asDecodedBase64', () => {
  it('should decode base64', () => {
    expect(asDecodedBase64('VGhpcyBpcyBCYXNlNjQgZW5jb2RlZCB2YWx1ZQ==')).toBe('This is Base64 encoded value')
  })
})
