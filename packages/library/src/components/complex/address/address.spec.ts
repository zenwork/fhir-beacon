import {html}                         from 'lit'
import {assert, describe, expect, it} from 'vitest'
import {fixture}                      from '../../../../tests/lit/lit-vitest-fixture'
import {AddressData}                  from '../../resources'
import {Address}                      from './address'
import {data}                         from './address.story.data'



describe('Address', () => {

  it('renders correctly', async () => {
    const address = await fixture<Address>(html`
        <fhir-shell showerror>
            <fhir-address .data=${data}></fhir-address >
        </fhir-shell >
    `, 'fhir-address').first()

    expect(address).toBeInTheDocument()
    assert.ok(address.queryShadow({ select: 'fhir-error', expect: 0 }))
  })

  it('renders error when use is invalid', async () => {
    const modifiedData: AddressData = { ...data }
    modifiedData.use = 'some other place'
    const address = await fixture<Address>(html`
        <fhir-shell showerror>
            <fhir-address .data=${modifiedData}></fhir-address >
        </fhir-shell >
    `, 'fhir-address').first()

    expect(address).toBeInTheDocument()
    assert.ok(address.queryShadow({ select: 'fhir-error', expect: 1 }))

  })

  it('renders error when type is invalid', async () => {
    const modifiedData: AddressData = { ...data }
    modifiedData.type = 'someOtherType'
    const address = await fixture<Address>(html`
        <fhir-shell showerror>
            <fhir-address .data=${modifiedData}></fhir-address >
        </fhir-shell >
    `, 'fhir-address').first()

    expect(address).toBeInTheDocument()
    assert.ok(address.queryShadow({ select: 'fhir-error', expect: 1 }))

  })
})
