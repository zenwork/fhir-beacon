import {html}                         from 'lit'
import {assert, describe, expect, it} from 'vitest'
import {fixture}                      from '../../../../tests/lit/lit-vitest-fixture'
import {Identifier}                   from './identifier'
import {IdentifierData}               from './identifier.data'
import {data2}                        from './identifier.story.data'

describe('Identifier', () => {
  it('should be rendered', async () => {

    const identifier = await fixture<Identifier>(html`
        <fhir-shell showerror>
            <fhir-identifier .data=${data2}></fhir-identifier >`, 'fhir-identifier').first()

    expect(identifier).toBeInTheDocument()
    assert.ok(identifier.queryShadow({ select: 'fhir-error', expect: 0 }))
  })

  it('should display one error when use is not correct', async () => {

    const modifiedData: IdentifierData = { ...data2 }
    modifiedData.use = 'some other place'
    const identifier = await fixture<Identifier>(html`
        <fhir-shell mode="structure" showerror>
            <fhir-identifier .data=${modifiedData}></fhir-identifier >`, 'fhir-identifier').first()

    expect(identifier).toBeInTheDocument()
    assert.ok(identifier.queryShadow({ select: 'fhir-error', expect: 1 }))
  })

  //TODO: figure out the correct type rule before removing skip
  it.skip('should display one error when type is not correct', async () => {

    const modifiedData: IdentifierData = { ...data2 }
    modifiedData.type = { coding: [{ code: 'FOOOBAR' }] }
    const identifier = await fixture<Identifier>(html`
        <fhir-shell mode="structure" showerror>
            <fhir-identifier .data=${modifiedData}></fhir-identifier >
        </fhir-shell >`, 'fhir-identifier').first()

    expect(identifier).toBeInTheDocument()
    assert.ok(identifier.queryShadow({ select: 'fhir-error', expect: 1 }))
  })
})
