import {html, PropertyValues, TemplateResult} from 'lit'
import {customElement}                        from 'lit/decorators.js'
import {describe, expect, it}                 from 'vitest'
import {fixture}                              from '../../../../tests/lit/lit-vitest-fixture'
import {FhirElementData, ValidationErrors}    from '../data'
import {FhirPresentableElement}               from './fhir-presentable-element'

describe('FhirPresentableElement', () => {
  const cases = [
    { mode: 'structure', open: false, showerror: true, verbose: false }
    // { mode: 'display', open: true, showerror: false, verbose: false },
    // { mode: 'display' },
    // { mode: 'structure', verbose: true }
    // { mode: 'structure' }
  ]
  describe('display config', () => {
    it.skip('should set defaults correctly on element', async () => {
      const el = await fixture<DisplayConfigTest>(html`
          <fhir-test-element ></fhir-test-element >
      `).first()

      expect(el.getDisplayConfig()).toEqual({
                                              mode: 'display',
                                              open: false,
                                              showerror: false,
                                              verbose: false
                                            })
    })

    it.skip('should set defaults correctly on shell', async () => {
      const el = await fixture<DisplayConfigTest>(html`
          <fhir-shell >
              <fhir-test-element ></fhir-test-element >
          </fhir-shell >
      `, 'fhir-test-element').first()

      expect(el.getDisplayConfig()).toEqual({
                                              mode: 'display',
                                              open: false,
                                              showerror: false,
                                              verbose: false
                                            })
    })

    it('should correctly inherit from shell', async () => {

      for (const c of cases) {

        const el = await fixture<DisplayConfigTest>(html`
            <fhir-shell mode="${c.mode}" ?verbose=${c.verbose} ?showerror=${c.showerror} ?open=${c.open}>
                <fhir-test-element ></fhir-test-element >
            </fhir-shell >
        `, 'fhir-test-element').first()

        const conf = el.getDisplayConfig()

        expect(conf.mode, 'mode:' + c.mode).toEqual(c.mode)
        expect(conf.verbose, 'verbose:' + c.verbose).toEqual(!!c.verbose)
        expect(conf.showerror, 'show error:' + c.showerror).toEqual(!!c.showerror)
        expect(conf.open, 'open:' + c.open).toEqual(!!c.open)

      }
    })

    it.skip('should be set correctly directly on the element', async () => {

      for (const c of cases) {

        const el = await fixture<DisplayConfigTest>(html`
            <fhir-test-element mode="${c.mode}" ?verbose=${c.verbose} ?showerror=${c.showerror} ?open=${c.open}>
            </fhir-test-element >
        `, 'fhir-test-element').first()

        const conf = el.getDisplayConfig()

        expect(conf.mode, 'mode:' + c.mode).toEqual(c.mode)
        expect(conf.verbose, 'verbose:' + c.verbose).toEqual(!!c.verbose)
        expect(conf.showerror, 'show error:' + c.showerror).toEqual(!!c.showerror)
        expect(conf.open, 'open:' + c.open).toEqual(!!c.open)

      }
    })

  })

  it.skip('should correctly get set from shell and then be overridden when set directly', async () => {


    const el = await fixture<DisplayConfigTest>(html`
        <fhir-shell mode="structure" verbose>
            <fhir-test-element mode="structure_summary" ?verbose=${false}></fhir-test-element >
        </fhir-shell >
    `, 'fhir-test-element').first()

    const conf = el.getDisplayConfig()

    expect(conf.mode, 'mode: structure_summary').toEqual('structure_summary')
    expect(conf.verbose, 'verbose:' + false).toEqual(false)


  })

})

@customElement('fhir-test-element')
class DisplayConfigTest extends FhirPresentableElement<FhirElementData> {
  constructor() {super('TestElement')}

  protected renderDisplay(data: FhirElementData): TemplateResult | TemplateResult[] {
    return html`
        <fhir-primitive label="display" value="bar" type="decimal"></fhir-primitive >`
  }

  protected renderStructure(data: FhirElementData): TemplateResult | TemplateResult[] {
    return html`
        <fhir-primitive label="structure" value="bar" type="decimal"></fhir-primitive >`
  }

  protected renderAll(data: FhirElementData): TemplateResult | TemplateResult[] {
    return html`test rendering`
  }

  protected validate(data: FhirElementData): ValidationErrors {
    return []
  }

  protected convertData(data: FhirElementData) {
    return data
  }


  protected willUpdate(_changedProperties: PropertyValues) {
    super.willUpdate(_changedProperties)
    // console.log(this.type, this.mode)
  }
}
