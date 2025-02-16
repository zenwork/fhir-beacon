import {html}                         from 'lit'
import {assert, describe, expect, it} from 'vitest'
import {fixture}                      from '../../../../tests/lit/lit-vitest-fixture'
import {Narrative}                    from './narrative'
import {NarrativeData}                from './narrative.data'



describe('Narrative', () => {

  it('renders correctly but empty', async () => {

    const narrative = await fixture<Narrative>(
      html`
          <fhir-narrative ></fhir-narrative > `,
      'fhir-narrative').first()

    expect(narrative).toBeVisible()
    assert(narrative.queryShadow({ select: '*', expect: 0 }))
  })

  it('renders correctly in narrative mode', async () => {
    const data: NarrativeData = {
      id: 'abc-123',
      div: `<h1>Sample</h1><p>Some content!!</p>`,
      status: 'test data'
    }

    const narrative = await fixture<Narrative>(
      html`
          <fhir-shell mode='narrative'>
              <fhir-narrative .data=${data}></fhir-narrative >
          </fhir-shell >`,
      'fhir-narrative').first()


    assert.ok(narrative.queryShadow({ select: 'h1', expect: 1 }))
    assert.ok(narrative.queryShadow({ select: 'p', expect: 1 }))
    assert.ok(narrative.queryShadowByText('Sample'))
    assert.ok(narrative.queryShadowByText('Some content!!'))
  })

  it('renders correctly in structure mode', async () => {
    const data: NarrativeData = {
      id: 'abc-123',
      div: `<h1>Sample</h1><p>Some content!!</p>`,
      status: 'test data'
    }

    const narrative = await fixture<Narrative>(
      html`
          <fhir-shell mode='structure'>
              <fhir-narrative label='content' .data=${data}></fhir-narrative >
          </fhir-shell >`,
      'fhir-narrative').first()


    assert.ok(narrative.queryShadow({ select: 'fhir-wrapper', expect: 2 }))
    assert.ok(narrative.queryShadow({ select: 'fhir-primitive', expect: 3 }))

  })

  it('renders correctly in display mode', async () => {
    const data: NarrativeData = {
      id: 'abc-123',
      div: `<h1>Sample</h1><p>Some content!!</p>`,
      status: 'test data'
    }

    const narrative = await fixture<Narrative>(
      html`
          <fhir-shell mode='display'>
              <fhir-narrative .data=${data}></fhir-narrative >
          </fhir-shell >`,
      'fhir-narrative').first()

    assert.ok(narrative.queryShadowByText('summary'))
    assert.ok(narrative.queryShadow({ select: 'fhir-wrapper', expect: 2 }))
    assert.ok(narrative.queryShadow({ select: 'h1', expect: 1 }))
    assert.ok(narrative.queryShadowByText('Sample'))
    assert.ok(narrative.queryShadow({ select: 'p', expect: 1 }))
    assert.ok(narrative.queryShadowByText('Some content!!'))
  })
})
