import {describe, expect, it} from 'vitest'
import {toUuid}               from './toUuid'



describe('toUuid', () => {
  describe('valid UUIDs', () => {
    it('should convert a valid UUID string to Uuid type', () => {
      const validUuid = 'urn:uuid:c757873d-ec9a-4326-a141-556f43239520'
      const result = toUuid(validUuid)

      expect(result).toBe(validUuid)
      expect(typeof result).toBe('string')
    })

    it('should handle UUID with all lowercase hexadecimal characters', () => {
      const validUuid = 'urn:uuid:12345678-abcd-efab-cdef-123456789abc'
      const result = toUuid(validUuid)

      expect(result).toBe(validUuid)
    })

    it('should handle UUID with all zeros', () => {
      const validUuid = 'urn:uuid:00000000-0000-0000-0000-000000000000'
      const result = toUuid(validUuid)

      expect(result).toBe(validUuid)
    })

    it('should handle UUID with all fs', () => {
      const validUuid = 'urn:uuid:ffffffff-ffff-ffff-ffff-ffffffffffff'
      const result = toUuid(validUuid)

      expect(result).toBe(validUuid)
    })
  })

  describe('invalid UUIDs', () => {
    it('should throw TypeError for UUID without urn:uuid prefix', () => {
      const invalidUuid = 'c757873d-ec9a-4326-a141-556f43239520'

      expect(() => toUuid(invalidUuid)).toThrow(TypeError)
      expect(() => toUuid(invalidUuid)).toThrow(
        'must be a UUID (aka GUID) represented as a URI (RFC 4122 icon); e.g. urn:uuid:c757873d-ec9a-4326-a141-556f43239520'
      )
    })

    it('should throw TypeError for UUID with wrong prefix', () => {
      const invalidUuid = 'uuid:c757873d-ec9a-4326-a141-556f43239520'

      expect(() => toUuid(invalidUuid)).toThrow(TypeError)
    })

    it('should throw TypeError for UUID with missing segments', () => {
      const invalidUuid = 'urn:uuid:c757873d-ec9a-4326-556f43239520'

      expect(() => toUuid(invalidUuid)).toThrow(TypeError)
    })

    it('should throw TypeError for UUID with too many segments', () => {
      const invalidUuid = 'urn:uuid:c757873d-ec9a-4326-a141-556f-43239520'

      expect(() => toUuid(invalidUuid)).toThrow(TypeError)
    })

    it('should throw TypeError for UUID with invalid characters', () => {
      const invalidUuid = 'urn:uuid:c757873g-ec9a-4326-a141-556f43239520'

      expect(() => toUuid(invalidUuid)).toThrow(TypeError)
    })

    it('should throw TypeError for UUID with wrong segment lengths', () => {
      const invalidUuid = 'urn:uuid:c757873-ec9a-4326-a141-556f43239520'

      expect(() => toUuid(invalidUuid)).toThrow(TypeError)
    })

    it('should throw TypeError for empty string', () => {
      expect(() => toUuid('')).toThrow(TypeError)
    })

    it('should throw TypeError for UUID with uppercase URN prefix', () => {
      const invalidUuid = 'URN:UUID:c757873d-ec9a-4326-a141-556f43239520'

      expect(() => toUuid(invalidUuid)).toThrow(TypeError)
    })

    it('should throw TypeError for UUID with extra characters', () => {
      const invalidUuid = 'urn:uuid:c757873d-ec9a-4326-a141-556f43239520-extra'

      expect(() => toUuid(invalidUuid)).toThrow(TypeError)
    })

    it('should throw TypeError for UUID with spaces', () => {
      const invalidUuid = 'urn:uuid: c757873d-ec9a-4326-a141-556f43239520'

      expect(() => toUuid(invalidUuid)).toThrow(TypeError)
    })
  })

  describe('edge cases', () => {
    it('should throw TypeError for null input', () => {
      expect(() => toUuid(null as any)).toThrow(TypeError)
    })

    it('should throw TypeError for undefined input', () => {
      expect(() => toUuid(undefined as any)).toThrow(TypeError)
    })

    it('should throw TypeError for number input', () => {
      expect(() => toUuid(123 as any)).toThrow(TypeError)
    })

    it('should throw TypeError for object input', () => {
      expect(() => toUuid({} as any)).toThrow(TypeError)
    })
    it('should throw TypeError for UUID with mixed case hexadecimal characters', () => {
      expect(() => toUuid('urn:uuid:12345678-ABCD-efab-CDEF-123456789abc')).toThrow(TypeError)
    })
  })
})
