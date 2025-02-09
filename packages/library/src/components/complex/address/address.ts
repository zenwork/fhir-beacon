import {html, nothing, TemplateResult}       from 'lit'
import {customElement}                       from 'lit/decorators.js'
import {useSystem}                           from '../../../codes/use-system'
import {BaseElement, Decorated, Validations} from '../../../internal'
import {hasSome, strapLines, wrapLines}      from '../../../shell'
import {DisplayConfig}                       from '../../../types'
import {hasOnly}                             from '../../../utilities'
import {PrimitiveType}                       from '../../primitive'
import {AddressData}                         from './address.data'



const address_use = useSystem('http://hl7.org/fhir/address-use')
const address_type = useSystem('http://hl7.org/fhir/address-type')

@customElement('fhir-address')
export class Address extends BaseElement<AddressData> {
  constructor() {
    super('Address')
  }

  public renderDisplay(config: DisplayConfig,
                       data: Decorated<AddressData>,
                       vldtns: Validations): TemplateResult[] {
    if (hasOnly(data, 'text')) {
      return [
        html`
            <fhir-primitive label="text" .value=${data.text} .type=${PrimitiveType.fhir_string} summary></fhir-primitive > `
      ]
    }

    return [
      html`
          <fhir-primitive
                  key="use"
                  .value=${address_use.choices.filter(c => c.value === data.use)[0]?.display ?? data.use}
                  .errormessage=${vldtns.msgFor('use')}
                  summary
          ></fhir-primitive >
          <fhir-primitive
                  key="type"
                  .value=${address_type.choices.filter(c => c.value === data.type)[0]?.display ?? data.type}
                  .errormessage=${vldtns.msgFor('type')}
                  summary
          ></fhir-primitive >
          ${hasSome(data.line, this.verbose)
            ? wrapLines('',
                        'line',
                        data.line,
                        config.verbose,
                        (d, l, k) => html`
                            <fhir-primitive key=${k} label=${l} .value=${d} .type=${PrimitiveType.fhir_string} summary>
                                <span slot="after">,</span >
                            </fhir-primitive >
                        `
                  )
            : nothing}
          <fhir-primitive label="city" .value=${data.city} .type=${PrimitiveType.fhir_string} summary></fhir-primitive >
          <fhir-primitive label="district" .value=${data.district} .type=${PrimitiveType.fhir_string} summary></fhir-primitive >
          <fhir-primitive label="state" .value=${data.state} .type=${PrimitiveType.fhir_string} summary></fhir-primitive >
          <fhir-primitive label="postalCode" .value=${data.postalCode} .type=${PrimitiveType.fhir_string} summary></fhir-primitive >
          <fhir-primitive label="country" .value=${data.country} .type=${PrimitiveType.fhir_string} summary></fhir-primitive >
          <fhir-period label="period" .data=${data.period} summary></fhir-period >
      `
    ]
  }

  public renderStructure(config: DisplayConfig, data: Decorated<AddressData>, vldtns: Validations): TemplateResult[] {
    return [
      html`
          <fhir-primitive
                  label="use"
                  .value=${data.use}
                  .type=${PrimitiveType.code}
                  errormessage=${vldtns.msgFor('use')}
                  summary
          ></fhir-primitive >
          <fhir-primitive
                  label="type"
                  .value=${data.type}
                  .type=${PrimitiveType.code}
                  errormessage=${vldtns.msgFor('type')}
                  summary
          ></fhir-primitive >
          <fhir-primitive label="text"
                  .value=${data.text}
                  .type=${PrimitiveType.fhir_string}
                  summary
          ></fhir-primitive >
          ${hasSome(data.line, this.verbose)
            ? strapLines('',
                         'line',
                         data.line,
                         config.verbose,
                         (l, i) => html`
                             <fhir-primitive
                                     label="${i}"
                                     .value=${l}
                                     .type=${PrimitiveType.fhir_string}
                                     summary
                             ></fhir-primitive > `
                  )
            : nothing}
          <fhir-primitive label="city" .value=${data.city} .type=${PrimitiveType.fhir_string} summary></fhir-primitive >
          <fhir-primitive label="district" .value=${data.district} .type=${PrimitiveType.fhir_string} summary></fhir-primitive >
          <fhir-primitive label="state" .value=${data.state} .type=${PrimitiveType.fhir_string} summary></fhir-primitive >
          <fhir-primitive label="postalCode" .value=${data.postalCode} .type=${PrimitiveType.fhir_string} summary></fhir-primitive >
          <fhir-primitive label="country" .value=${data.country} .type=${PrimitiveType.fhir_string} summary></fhir-primitive >
          <fhir-period label="period" .data=${data.period} summary></fhir-period >
      `
    ]
  }


  public renderEditableDisplay(config: DisplayConfig,
                               data: Decorated<AddressData>,
                               vldtns: Validations): TemplateResult[] {

    return [
      html`
          <fhir-primitive
                  key="use"
                  .value=${data.use}
                  .type=${PrimitiveType.code}
                  errormessage=${vldtns.msgFor('use')}
                  .choices=${address_use.choices}
                  summary
          ></fhir-primitive>
          <fhir-primitive
                  key="type"
                  .value=${data.type}
                  .type=${PrimitiveType.code}
                  errormessage=${vldtns.msgFor('type')}
                  .choices=${address_type.choices}
                  summary
          ></fhir-primitive>
          <fhir-primitive label="text"
                          .value=${data.text}
                          .type=${PrimitiveType.fhir_string}
                          summary
          ></fhir-primitive>
          ${hasSome(data.line, this.verbose)
            ? wrapLines('',
                        'line',
                        data.line,
                        config.verbose,
                        (d, l, k) => html`
                            <fhir-primitive key=${k} label=${l} .value=${d} .type=${PrimitiveType.fhir_string} summary>
                                <span slot="after">,</span>
                            </fhir-primitive>
                        `
                  )
            : nothing}
          <fhir-primitive label="city" .value=${data.city} .type=${PrimitiveType.fhir_string} summary></fhir-primitive>
          <fhir-primitive label="district"
                          .value=${data.district}
                          .type=${PrimitiveType.fhir_string}
                          summary
          ></fhir-primitive>
          <fhir-primitive label="state"
                          .value=${data.state}
                          .type=${PrimitiveType.fhir_string}
                          summary
          ></fhir-primitive>
          <fhir-primitive label="postalCode"
                          .value=${data.postalCode}
                          .type=${PrimitiveType.fhir_string}
                          summary
          ></fhir-primitive>
          <fhir-primitive label="country"
                          .value=${data.country}
                          .type=${PrimitiveType.fhir_string}
                          summary
          ></fhir-primitive>
          <fhir-period label="period" .data=${data.period} summary></fhir-period>
      `
    ]
  }

// eslint-disable-next-line @typescript-eslint/no-unused-vars
  public validate(data: AddressData, validations: Validations, _fetched: boolean): void {


    if (data.use) {
      if (!address_use.choices.some(c => c.value == data.use)) {
        validations.add({
                          fqk: { path: [{ node: 'use' }] },
                          message: 'address use is not one of accepted: '
                                   + useSystem('http://hl7.org/fhir/address-type').choices.map(c => c.value).join(', ')
                    })
      }
    }

    if (data.type) {
      if (!address_type.choices.some(c => c.value == data.type)) {
        validations.add({
                          fqk: { path: [{ node: 'type' }] },
                          message: 'address type is not one of accepted: ' + useSystem(
                            'http://hl7.org/fhir/address-type').choices.map(c => c.value).join(', ')
                    })
      }
    }

  }
}
