import {describe, expect, it} from 'vitest'
import {Markdown}             from '../primitive.data'
import {toMarkdown}           from './toMarkdown'


describe('toMarkdown', () => {
  it('should convert a valid string to Markdown', () => {
    const validString = 'This is a valid Markdown content'
    expect(toMarkdown(validString)).toBe(validString as Markdown)
  })

  it('should throw TypeError for an invalid Markdown string', () => {
    const invalidString = '' // test with an empty string here as invalid
    expect(() => toMarkdown(invalidString)).toThrow(TypeError)
  })


})
