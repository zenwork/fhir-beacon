import {html}                         from 'lit'
import {assert, describe, expect, it} from 'vitest'
import {aTimeout}                     from '../../../../tests/aTimeout'
import {fixture}                      from '../../../../tests/lit/lit-vitest-fixture'
import {Reference}                    from './reference'

describe('Reference', () => {

  it('should fail when ref link starts with # but no contained values are present', async () => {

    const data = {
      reference: '#',
      type: 'Patient'
    }

    const el = await fixture<Reference>(html`
        <fhir-shell showerror>
            <fhir-reference .data=${data}></fhir-reference >
        </fhir-shell >
    `).first()

    await aTimeout()

    const err = el.queryShadow({ select: ['fhir-error', 'div'] })
    assert.ok(err)
    expect(err).toHaveTextContent('ref-1: Does not have a contained resource when reference starts with #')

  })

  it('should pass when only reference and display is present', async () => {

    const data = { reference: 'Organization/f201', display: 'AUMC' }

    const el = await fixture<Reference>(html`
        <fhir-shell showerror>
            <fhir-reference .data=${data}></fhir-reference>
        </fhir-shell>
    `, 'fhir-reference').first()

    await aTimeout()

    const value: HTMLElement = el.queryShadow({ select: ['fhir-value', 'div'] })
    expect(value).toContainHTML('<a href="Organization/f201"')
    expect(value).toHaveTextContent('AUMC')


  })
})
