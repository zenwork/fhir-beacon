import {expect, test} from '@playwright/test'
import {toCode}       from '../../src/data/primitive/converters/ToCode'
import {toUrl}        from '../../src/data/primitive/converters/ToUrl'
import {Code}         from '../../src/data/primitive/structures'


test.describe('Primitives', () => {
  test('should parse a URL', async ({page}) => {
    let url = toUrl('http://hl7.org/fhir/sid/icd-10')

    expect(url.protocol).toBe('http:')
    expect(url.hostname).toBe('hl7.org')
    expect(url.pathname).toBe('/fhir/sid/icd-10')

  })

  test('should fail to parse a valid URL', async ({page}) => {
    expect(() => {
      toUrl('')
    }).toThrowError()

    expect(() => {
      toUrl(null as unknown as string)
    }).toThrowError()

    expect(() => {
      toUrl('http//hl7.org/fhir/sid/icd-10')
    }).toThrowError()

  })

  test('should parse a valid Code', async ({page}) => {

    let code: Code = toCode('G44.1')
    expect(code).toBe('G44.1')

    code = toCode('G44.1 123')
    expect(code).toBe('G44.1 123')

    code = toCode('A-B-C D')
    expect(code).toBe('A-B-C D')
  })

  test('should fail to parse invalid Code', async ({page}) => {

    expect(() => {
      toCode('G44  .1 asdsa')

    }).toThrowError()
  })
})
