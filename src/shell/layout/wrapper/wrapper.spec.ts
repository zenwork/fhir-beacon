import {html}                    from 'lit'
import {describe, expect, test}  from 'vitest'
import {emptyLitShadow, fixture} from '../../../../tests/lit-vitest-fixture'
import {Wrapper}                 from './wrapper'

describe('fhir-wrapper', () => {

  test.skip('should instantiate the component and be empty', async () => {
    const el = await fixture<Wrapper>(html`
      <fhir-wrapper ></fhir-wrapper >`).first()
    expect(el).toBeDefined()
    expect(el.shadowRoot!.innerHTML).toMatch(emptyLitShadow)
  })

})
