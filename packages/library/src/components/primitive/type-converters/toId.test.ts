import {describe, expect, it} from 'vitest'
import {Id}                   from '../primitive.data'
import {toId}                 from './toId'

// Given the provided regex, define some valid and invalid test cases
const validIds = [
  'abc123',
  'ABC-123',
  '123456',
  'some-id',
  'a1-2.3'
]

const invalidIds = [
  '',
  'invalid-id-!',
  'id_with_underscores',
  'id with spaces',
  'id-that-is-waaaaaaaaaaaaaaaaaaaaaaaaaaaaay-too-long-for-the-regex'
]

describe('toId function', () => {
  // Test cases for valid IDs
  validIds.forEach(validId => {
    it(`should convert ${validId} to Id`, () => {
      expect(() => toId(validId)).not.toThrow()
      expect(toId(validId)).toBe(validId as Id)
    })
  })

  // Test cases for invalid IDs
  invalidIds.forEach(invalidId => {
    it(`should throw an error for invalid ID: ${invalidId}`, () => {
      expect(() => toId(invalidId)).toThrow(TypeError)
      try {
        toId(invalidId)
      } catch (e) {
        if (e instanceof TypeError) {
          expect(e.message).toMatch(/id must match/)
        }
      }
    })
  })
})
