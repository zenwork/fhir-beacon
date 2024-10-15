import {describe, expect, it} from 'vitest'
import {isBlank}              from './isBlank'

describe('isBlank', () => {

  it('Should return true if no value is given', () => {
    expect(isBlank(undefined)).to.eql(true)
  })

  it('Should return true if value is null', () => {
    expect(isBlank(null)).to.eql(true)
  })

  it('Should return true if value is \'\'', () => {
    expect(isBlank('')).to.eql(true)
  })

  it('Should return true if value is boolean true', () => {
    expect(isBlank(true)).to.eql(false)
  })

  it('Should return true if value is boolean false', () => {
    expect(isBlank(false)).to.eql(false)
  })

  it('Should return false if value is an object', () => {
    expect(isBlank({})).to.eql(false)
  })

  it('Should return false if value is an object', () => {
    expect(isBlank([])).to.eql(true)
  })
})
