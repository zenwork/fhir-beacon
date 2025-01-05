import {assert, describe, expect, test} from 'vitest'
import {Code}                           from '../primitive.data'
import {toCode}                         from './toCode'


describe('toCode function', () => {
  test('should parse a valid Code', () => {
    let code: Code = toCode('G44.1')
    expect(code).to.equal('G44.1')

    code = toCode('G44.1 123')
    expect(code).to.equal('G44.1 123')

    code = toCode('A-B-C D')
    expect(code).to.equal('A-B-C D')
  })

  test('should fail to parse invalid Code', () => {
    assert.throws(() => {
      toCode(' G44.1') // Leading space
    }, TypeError)

    assert.throws(() => {
      toCode('G44.1 ') // Trailing space
    }, TypeError)

    assert.throws(() => {
      toCode('G44  .1') // More than one space
    }, TypeError)

  })
})
