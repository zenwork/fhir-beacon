import {expect}        from '@esm-bundle/chai'
import {isWholeNumber} from './isWhole'

describe('function: is a whole number', () => {


  it('should handle number', () => {
    expect(isWholeNumber(222)).to.be.true
  })

  it('should handle strings', () => {
    expect(isWholeNumber('222')).to.be.true
  })


})
