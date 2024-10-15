import {SlDetails}            from '@shoelace-style/shoelace'
import {html}                 from 'lit'
import {describe, expect, it} from 'vitest'
import {fixture}              from '../../../../tests/lit/lit-vitest-fixture'
import {Wrapper}              from './wrapper'

describe('Wrapper2', () => {
  it('should render nothing when nothing is slotted', async () => {
    const el = await fixture<Wrapper>(html`
        <fhir-wrapper></fhir-wrapper>
    `).first()

    const wrapped = el.queryShadow({ select: 'ol', expect: 1 })
    expect(wrapped).toHaveTextContent('')

  })

  it('should indent content in display mode', async () => {
    const wrapper = await fixture<Wrapper>(html`
        <fhir-wrapper>
            <div>a</div>
            <div>b</div>
            <div>c</div>
        </fhir-wrapper>
    `, 'fhir-wrapper').first()

    const slotedDivs = wrapper.queryShadowDefaultSlot().filter(n => n instanceof HTMLDivElement)
    expect(slotedDivs).to.have.lengthOf(3)

    const wrapped: HTMLDivElement[] = wrapper.queryShadow({ select: ['#wrapped', 'div'], expect: 3 })
    expect(wrapped[0]).toHaveTextContent('a')
    expect(wrapped[1]).toHaveTextContent('b')
    expect(wrapped[2]).toHaveTextContent('c')

  })

  it('should display different in structure mode', async () => {

    const el = await fixture<Wrapper>(html`
        <fhir-wrapper variant="details" label='foobar'>
            <div>a</div>
        </fhir-wrapper>
    `).first()


    const details: SlDetails = el.queryShadow({ select: ['sl-details'], expect: 1 })
    const summary: Element = details.queryShadowNamedSlot('summary')[0]
    expect(summary).toHaveTextContent('foobar')

  })
})
