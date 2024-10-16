import {describe, expect, it} from 'vitest'
import {toDate}               from './toDate'


describe('toDate', () => {
  it('should convert valid dates successfully', () => {
    const validDates = ['2023-01-01', '2023-12-31', '2023-01']

    validDates.forEach(date => {
      expect(toDate(date)).toBe(date)
    })
  })

  it('should throw TypeError for invalid dates', () => {
    const invalidDates = [
      '2023-13-01', // Invalid month
      '2023-00-01', // Invalid month
      '2023-01-32', // Invalid day
      //'2023-02-30', // Invalid day for February
      'invalid-date' // Completely invalid
      // '2015-06-31' // Invalid day
    ]

    invalidDates.forEach(date => {
      expect(() => toDate(date), `testing: ${date}`).toThrow(TypeError)
    })
  })
})
