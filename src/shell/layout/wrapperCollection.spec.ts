import {html}                 from 'lit'
import {describe, expect, it} from 'vitest'
import {fixture}              from '../../../tests/lit/lit-vitest-fixture'
import {Wrapper}              from './wrapper'
import {wrap} from './wrapper/wrap'

describe('wrapperCollection', () => {
  it('renders correctly', async () => {
    const el = await fixture<Wrapper>(html`

        <h1 >multiple</h1 >
        <h2 >normal</h2 >
        ${wrap(
                'characterSet', 'letter', ['a', 'b', 'c'], false, (
                        data, label, key
                ) => html`${label}: ${data} (${key})`
        )}
        <h2 >verbose</h2 >
        ${wrap(
                'characterSet', 'letter', ['a', 'b', 'c'], true, (
                        data, label, key
                ) => html`${label}: ${data} (${key})`
        )}

        <h1 >single</h1 >
        <h2 >normal</h2 >
        ${wrap(
                'characterSet', 'letter', ['a'], false, (
                        data, label, key
                ) => html`${label}: ${data} (${key})`
        )}
        <h2 >verbose</h2 >
        ${wrap(
                'characterSet', 'letter', ['a'], true, (
                        data, label, key
                ) => html`${label}: ${data} (${key})`
        )}

    `, 'fhir-wrapper').first()

    expect(el.queryShadowByText('letters')).toContainHTML('label')

    const elements: Wrapper[] = el.queryShadow<Wrapper[]>({ select: 'fhir-wrapper', expect: 3 })
    expect(elements[0].queryShadowByText('1')).toContainHTML('label')
    expect(elements[1].queryShadowByText('2')).toContainHTML('label')
    expect(elements[2].queryShadowByText('3')).toContainHTML('label')

  })

})
