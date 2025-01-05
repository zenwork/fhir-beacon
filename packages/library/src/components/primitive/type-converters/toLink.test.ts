import {describe, expect, it} from 'vitest'
import {Link}                 from '../primitive.data'
import {toLink}               from './toLink'

describe('toLink', () => {
  it('should convert a valid HTTP link', () => {
    const value = 'http://example.com'
    const result: Link = toLink(value)
    expect(result).toBe(value)
  })

  it('should convert a valid HTTPS link', () => {
    const value = 'https://example.com'
    const result: Link = toLink(value)
    expect(result).toBe(value)
  })

  it('should throw an error for an invalid link', () => {
    const value = 'invalid-link'
    expect(() => toLink(value)).toThrow('Invalid web link')
  })

  it('should throw an error for a link without a protocol', () => {
    const value = 'www.example.com'
    expect(() => toLink(value)).toThrow('Invalid web link')
  })

  it('should throw an error for a link with an unsupported protocol', () => {
    const value = 'ftp://example.com'
    expect(() => toLink(value)).toThrow('Invalid web link')
  })

  it('should handle non-string inputs gracefully', () => {
    const value = 12345
    expect(() => toLink(value)).toThrow('Invalid web link')
  })

  it('should handle null input gracefully', () => {
    const value = null
    expect(() => toLink(value)).toThrow('Invalid web link')
  })

  it('should handle undefined input gracefully', () => {
    const value = undefined
    expect(() => toLink(value)).toThrow('Invalid web link')
  })
})
