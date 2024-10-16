import {describe, expect, it} from 'vitest'
import {toPositiveInt}        from './toPositiveInt'

describe('toPositiveInt Function', () => {
  it('should convert a valid positive integer string', () => {
    const result = toPositiveInt('200')
    expect(result).toBe(200)
  })

  it('should convert a valid positive integer number', () => {
    const result = toPositiveInt(200)
    expect(result).toBe(200)
  })

  it('should convert a valid positive BigInt', () => {
    const result = toPositiveInt(BigInt(1234))
    expect(result).toBe(1234)
  })

  const invalidInputs = [
    -200,
    '-200',
    2_147_483_648,
    '2147483648',
    '2147.1234',
    'ABC',
    BigInt(2147483648),
    new Date(),
    {},
    []
  ]

  invalidInputs.forEach((input) => {
    it(`should throw error for invalid input: ${input}`, () => {
      expect(() => toPositiveInt(input)).toThrow(
        'Input must be a non-negative integer within the range 1 to 2,147,483,647'
      )
    })
  })
})
