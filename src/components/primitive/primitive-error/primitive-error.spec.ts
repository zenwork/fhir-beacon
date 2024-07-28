import {html}                    from 'lit'
import {describe, expect, test}  from 'vitest'
import {emptyLitShadow, fixture} from '../../../../tests/lit/lit-vitest-fixture'
import {PrimitiveError}          from './primitive-error'


describe('PrimitiveError', () => {
  test('should be empty when undefined', async () => {

    const error = await fixture<PrimitiveError>(html`
      <fhir-error ></fhir-error >
    `).first()

    expect(error.shadowRoot!.innerHTML).toMatch(emptyLitShadow)
  })

  test('should show provided error', async () => {
    const error = await fixture<PrimitiveError>(html`
      <fhir-error text="Some error message"></fhir-error >
    `).first()

    const err = error.deepQuerySelector({ select: 'div' })
    expect(err).toHaveTextContent('Some error message')
  })
})
