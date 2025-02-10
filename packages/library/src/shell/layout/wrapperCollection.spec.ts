import {html}                 from 'lit'
import {describe, expect, it} from 'vitest'
import {fixture}              from '../../../tests/lit/lit-vitest-fixture'
import {DisplayMode}          from '../displayMode'
import {Wrapper}              from './wrapper'
import {wrap}                 from './wrapper/wrap'



describe('wrapperCollection', () => {
  it.skip('renders correctly', async () => {
    const el = await fixture<Wrapper>(html`

        <h1>multiple</h1>
        <h2>normal</h2>
        ${wrap(
                {
                    key: 'characterSet',
                    pluralBase: 'letter',
                    collection: ['a', 'b', 'c'],
                    generator: (data, label, key) => html`${label}: ${data} (${key})`,
                    config: {
                        source: 'unknown',
                        mode: DisplayMode.display,
                        summaryonly: false,
                        showerror: false,
                        verbose: false,
                        open: false,
                        input: false
                    }
                }
        )}
        <h2>verbose</h2>
        ${wrap(
                {
                    key: 'characterSet',
                    pluralBase: 'letter',
                    collection: ['a', 'b', 'c'],
                    generator: (data, label, key) => html`${label}: ${data} (${key})`,
                    config: {
                        source: 'unknown',
                        mode: DisplayMode.display,
                        summaryonly: false,
                        showerror: false,
                        verbose: true,
                        open: false,
                        input: false
                    }
                }
        )}

        <h1>single</h1>
        <h2>normal</h2>
        ${wrap(
                {
                    key: 'characterSet',
                    pluralBase: 'letter',
                    collection: ['a'],
                    generator: (data, label, key) => html`${label}: ${data} (${key})`,
                    config: {
                        source: 'unknown',
                        mode: DisplayMode.display,
                        summaryonly: false,
                        showerror: false,
                        verbose: false,
                        open: false,
                        input: false
                    }
                }
        )}
        <h2>verbose</h2>
        ${wrap(
                {
                    key: 'characterSet',
                    pluralBase: 'letter',
                    collection: ['a'],
                    generator: (
                            data, label, key
                    ) => html`${label}: ${data} (${key})`,
                    config: {
                        source: 'unknown',
                        mode: DisplayMode.display,
                        summaryonly: false,
                        showerror: false,
                        verbose: true,
                        open: false,
                        input: false
                    }
                }
        )}

    `, 'fhir-wrapper').first()

    expect(el.queryShadowByText('letters')).toContainHTML('label')

    const elements: Wrapper[] = el.queryShadow<Wrapper[]>({ select: 'fhir-wrapper', expect: 3 })
    expect(elements[0].queryShadowByText('1')).toContainHTML('label')
    expect(elements[1].queryShadowByText('2')).toContainHTML('label')
    expect(elements[2].queryShadowByText('3')).toContainHTML('label')

  })

})
