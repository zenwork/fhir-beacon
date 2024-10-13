import {SlDetails}            from '@shoelace-style/shoelace'
import {html}                 from 'lit'
import {describe, expect, it} from 'vitest'
import {fixture}              from '../../../../tests/lit/lit-vitest-fixture'
import {Wrapper2}             from './wrapper2'

describe('Wrapper2', () => {
  it('should render nothing when nothing is slotted', async () => {
    const el = await fixture<Wrapper2>(html`
        <fhir-wrapper-2></fhir-wrapper-2>
    `).first()

    const wrapped = el.queryShadow({ select: 'div', expect: 1 })
    expect(wrapped).toHaveTextContent('')

  })

  it('should indent content in display mode', async () => {
    const wrapper = await fixture<Wrapper2>(html`
        <fhir-wrapper-2>
            <div>a</div>
            <div>b</div>
            <div>c</div>
        </fhir-wrapper-2>
    `, 'fhir-wrapper-2').first()

    const slotedDivs = wrapper.queryShadowDefaultSlot().filter(n => n instanceof HTMLDivElement)
    expect(slotedDivs).to.have.lengthOf(3)

    const wrapped: HTMLDivElement[] = wrapper.queryShadow({ select: ['#wrapped', 'div'], expect: 3 })
    expect(wrapped[0]).toHaveTextContent('a')
    expect(wrapped[1]).toHaveTextContent('b')
    expect(wrapped[2]).toHaveTextContent('c')

  })

  it('should display different in structure mode', async () => {

    const el = await fixture<Wrapper2>(html`
        <fhir-wrapper-2 mode="structure" label='foobar'>
            <div>a</div>
        </fhir-wrapper-2>
    `).first()


    const details: SlDetails = el.queryShadow({ select: ['sl-details'], expect: 1 })
    const summary: Element = details.queryShadowNamedSlot('summary')[0]
    expect(summary).toHaveTextContent('foobar')

  })
})
