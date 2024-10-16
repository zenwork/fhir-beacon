import {html}                    from 'lit'
import {describe, expect, test}  from 'vitest'
import {emptyLitShadow, fixture} from '../../../../tests/lit/lit-vitest-fixture'
import {PrimitiveContext}        from './primitive-context'

describe('PrimitiveContext', () => {

  test('should show nothing when no value is provided', async () => {
    const context = await fixture<PrimitiveContext>(html`
      <fhir-context ></fhir-context >
    `).first()

    // TODO: find a way to assert emptiness better
    // only contains lit specific comments
    expect(context.shadowRoot!.innerHTML).toMatch(emptyLitShadow)

  })

  test('should show provided context', async () => {
    const context = await fixture<PrimitiveContext>(html`
      <fhir-context text="some context"></fhir-context >
    `).first()

    const span = context.queryShadow({ select: 'span' })
    expect(span).toHaveTextContent('(some context)')

  })
})
