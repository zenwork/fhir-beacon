import {assert, describe, expect, test} from 'vitest'
import {Code}                           from '../primitive.data'
import {toCode}                         from './toCode'
import {toUrl}                          from './toUrl'


describe('Primitives', () => {
  test('should parse a URL', () => {
    const url = toUrl('http://hl7.org/fhir/sid/icd-10')

    expect(url.protocol).to.equal('http:')
    expect(url.hostname).to.equal('hl7.org')
    expect(url.pathname).to.equal('/fhir/sid/icd-10')

  })

  test('should fail to parse a valid URL', () => {
    assert.throws(() => {
      toUrl('')
    })

    assert.throws(() => {
      toUrl(null as unknown as string)
    })

    assert.throws(() => {
      toUrl('http//hl7.org/fhir/sid/icd-10')
    })

  })

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
      toCode('G44  .1 asdsa')

    })
  })
})
