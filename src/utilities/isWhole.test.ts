import {expect}        from '@open-wc/testing'
import {isWholeNumber} from './isWhole'

describe('function: is a whole number', () => {

  it('should handle number', async () => {
    await expect(isWholeNumber(222)).to.equal(true)
  })

  it('should handle strings', async () => {
    await expect(isWholeNumber('222')).to.equal(true)
  })

})
