import {html}                    from 'lit'
import {describe, expect, test}  from 'vitest'
import {emptyLitShadow, fixture} from '../../../../tests/lit-vitest-fixture'
import {PrimitiveWrapper}        from './primitive-wrapper'

describe('PrimitiveWrapper', () => {

  test('renders nothing when empty', async () => {
    const wrapper = await fixture<PrimitiveWrapper>(html`
      <fhir-primitive-wrapper ></fhir-primitive-wrapper >
    `).first()

    expect(wrapper.shadowRoot!.innerHTML).to.match(emptyLitShadow)

  })

  test('renders content when not empty', async () => {

    const wrapper = await fixture<PrimitiveWrapper>(html`
      <fhir-primitive-wrapper >
        Some content
      </fhir-primitive-wrapper >
    `).first()

    expect(wrapper.shadowRoot!.innerHTML).not.to.match(emptyLitShadow)
    expect(wrapper.queryDefaultSlot()[0].textContent!.trim()).toStrictEqual('Some content')

  })
})
