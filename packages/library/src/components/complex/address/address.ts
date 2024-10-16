import {html, nothing, TemplateResult}       from 'lit'
import {customElement}                       from 'lit/decorators.js'
import {FhirAddressTypes, FhirAddressUse}    from '../../../codesystems'
import {BaseElement, Decorated, Validations} from '../../../internal'
import {hasSome, strapLines, wrapLines}      from '../../../shell'
import {DisplayConfig}                       from '../../../types'
import {hasOnly}                             from '../../../utilities'
import {PrimitiveType}                       from '../../primitive'
import {AddressData}                         from '../../resources'

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
                  label="use"
                  .value=${data.use}
                  .type=${PrimitiveType.code}
                  errormessage=${vldtns.errFor('use')}
                  summary
          ></fhir-primitive >
          <fhir-primitive
                  label="type"
                  .value=${data.type}
                  .type=${PrimitiveType.code}
                  errormessage=${vldtns.errFor('type')}
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
                  errormessage=${vldtns.errFor('use')}
                  summary
          ></fhir-primitive >
          <fhir-primitive
                  label="type"
                  .value=${data.type}
                  .type=${PrimitiveType.code}
                  errormessage=${vldtns.errFor('type')}
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


  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public validate(data: AddressData, validations: Validations, fetched: boolean): void {


    if (data.use) {
      if (!FhirAddressUse.some(c => c.code == data.use)) {
        validations.addErr({
                             key: 'use',
                             err: 'address use is not one of accepted: ' + FhirAddressUse.map(c => c.code).join(', ')
                    })
      }
    }

    if (data.type) {
      if (!FhirAddressTypes.some(c => c.code == data.type)) {
        validations.addErr({
                             key: 'type',
                             err: 'address type is not one of accepted: ' + FhirAddressTypes.map(c => c.code).join(', ')
                    })
      }
    }

  }
}
