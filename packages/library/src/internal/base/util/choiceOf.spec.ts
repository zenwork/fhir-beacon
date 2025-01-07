import {html}                         from 'lit'
import {assert, describe, expect, it} from 'vitest'
import {fixture}                      from '../../../../tests/lit/lit-vitest-fixture'
import {PrimitiveValue}               from '../../../components'
import {BaseElement} from '../../BaseElement'
import {oneOf}       from './oneOf'

describe('OneOrError', () => {
  it('Should show an error if there is more than one value to show', async () => {
    const base: BaseElement<any> = {
      type: 'foo',
      mode: 'display',
      showerror: true,
      extendedData: { errors: [] }
    } as unknown as BaseElement<any>
    const el = await fixture(html`
        ${oneOf(base,
                'foo',
                'err',
                [
                       {
                           data: 'abc',
                           html: (d: any) => html`
                               <fhir-primitive .value=${d}></fhir-primitive>`
                       },
                       {
                           data: '123',
                           html: (d: any) => html`
                               <fhir-primitive .value=${d}></fhir-primitive>`
                       }
                   ])}
    `).first()

    assert.ok(el.queryShadow({ select: 'fhir-error', expect: 1 }))
  })

  it('Should handle booleans correctly', async () => {
    const base: BaseElement<any> = {
      type: 'foo',
      mode: 'display',
      showerror: true,
      extendedData: { errors: [] }
    } as unknown as BaseElement<any>

    const el = await fixture(html`
        ${oneOf(base,
                'foo',
                'err',
                [
                       {
                           data: false,
                           html: (d: any) => html`
                               <fhir-primitive .value=${d}></fhir-primitive>`
                       },
                       {
                           data: null,
                           html: (d: any) => html`
                               <fhir-primitive .value=${d}></fhir-primitive>`
                       }
                   ])}
    `).first()

    const value: PrimitiveValue = el.queryShadow({ select: ['fhir-value', 'div'], expect: 1 })
    assert.ok(value)
    expect(value).toHaveTextContent('false')
  })
})
