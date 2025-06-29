import {html}                 from 'lit'
import {describe, expect, it} from 'vitest'
import {fixture}              from '../../../tests/lit/lit-vitest-fixture'
import {DisplayMode}          from '../displayMode'
import {Wrapper}              from './wrapper'
import {wrap}                 from './wrapper/wrap'



describe('wrapperCollection', () => {
  it('renders correctly', async () => {
    const el = await fixture<Wrapper>(html`

        <h1>multiple</h1>
        <h2>normal</h2>
        ${wrap(
                {
                    key: 'characterSet',
                    pluralBase: 'thing',
                    collection: ['a', 'b', 'c'],
                    generator: (data, label, key) => html`
                        <li>${label}: ${data} (${key})</li>`,
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
                    generator: (data, label, key) => html`
                        <li>${label}: ${data} (${key})</li>`,
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

    `).all()


    expect(el[0].queryShadowByText('things')).toContainHTML('label')

    const elements: HTMLElement[] = el[0].queryShadow<Wrapper[]>({ select: 'li', expect: 3 })

    expect(elements[0]).toHaveTextContent('1: a (characterSet)')
    expect(elements[1]).toHaveTextContent('2: b (characterSet)')
    expect(elements[2]).toHaveTextContent('3: c (characterSet)')


  })

})
