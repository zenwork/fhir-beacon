import {describe, expect, it, test} from 'vitest'
import {toPositiveInt}              from './toPositiveInt'

describe('Primitive Type Converters for integer types', () => {
  describe('positive integer', () => {

    it('should convert a string', () => {
      const number = toPositiveInt('200')
      expect(number).to.equal(200)
    })

    it('should convert a number', () => {
      const number = toPositiveInt(200)
      expect(number, `evaluating [${200}]`).to.equal(200)
    })

    it('should convert a BigInt', () => {
      const number = toPositiveInt(BigInt(1234))
      expect(number, `evaluating [${1234}]`).to.equal(1234)
    })

    test.each([
      [-200],
      ['-200'],
      [2_147_483_648],
      ['2147483648'],
      ['2147.1234'],
      ['ABC'],
      [BigInt(2147483648)],
      [new Date()],
      [{}],
      [[]]
    ])('should fail when out of range', (num) => {
      try {
        toPositiveInt(num)
        expect.unreachable(`Did not throw an error for ${num}`)
      } catch (e: any) {
        expect(e.message, `evaluating [${num}]`).toBe('Input must be a non-negative integer within the range 1 to 2,147,483,647')
      }

    })
  })
})
