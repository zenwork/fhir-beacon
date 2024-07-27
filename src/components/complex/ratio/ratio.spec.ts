import {html}           from 'lit'
import {describe, test} from 'vitest'
import {fixture}        from '../../../../tests/lit-vitest-fixture'

describe('Ratio', () => {
  test.skip('should return the ratio of two numbers', () => {
    const data = { numerator: { value: '1' }, denominator: { value: '128' } }

    fixture(html`
      <fhir-ratio label="ratio" .data=${data} mode="structure"></fhir-ratio >`)
  })
})
