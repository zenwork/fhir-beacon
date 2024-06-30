import {expect, test}  from '@playwright/test'
import {isWholeNumber} from './isWhole'

test.describe('function: is a whole number', () => {


  test('should handle number', () => {
    expect(isWholeNumber(222)).toEqual(true)
  })

  test('should handle strings', () => {
    expect(isWholeNumber('222')).toEqual(true)
  })


})
