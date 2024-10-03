import {html, TemplateResult}              from 'lit'
import {customElement}                     from 'lit/decorators.js'
import {FhirAddressUse, FhirIdentifierUse} from '../../../codesystems'
import {ValueSetIdentifierType}            from '../../../codesystems/ValueSet-identifier-type'
import {BaseElement, errors, Validations}  from '../../../internal'
import {Decorated}                         from '../../../internal/base'
import {DisplayConfig}                     from '../../../types'
import {PrimitiveType}                     from '../../primitive/type-converters/type-converters'
import {CodingData}                        from '../coding'
import {IdentifierData}                    from './identifier.data'

@customElement('fhir-identifier')
export class Identifier extends BaseElement<IdentifierData> {

  constructor() {super('Identifier')}

  public renderDisplay(config: DisplayConfig,
                       data: Decorated<IdentifierData>,
                       // eslint-disable-next-line @typescript-eslint/no-unused-vars
                       validations: Validations): TemplateResult[] {

    return [
      html`
          <fhir-primitive label="id" .value=${data.value} .context=${data.system} summary></fhir-primitive >
          <fhir-codeable-concept label="type" .data=${data.type} .errors=${data[errors]} summary></fhir-codeable-concept >
          <fhir-period .data=${data.period} summary></fhir-period >
      `
    ]
  }

  public renderStructure(config: DisplayConfig,
                         data: Decorated<IdentifierData>,
                         validations: Validations): TemplateResult[] {

    if (data) {
      return [
        html`
            <fhir-primitive label="use" type=${PrimitiveType.code} .value=${data.use} errormessage=${validations.errFor(
                    'use')} summary
            ></fhir-primitive >
            <fhir-codeable-concept label="type" .data=${data.type} .errors=${data[errors]} summary></fhir-codeable-concept >
            <fhir-primitive label="system" type=${PrimitiveType.uri} .value=${data.system} summary></fhir-primitive >
            <fhir-primitive label="value" .value=${data.value} summary></fhir-primitive >
            <fhir-period label="period" .data=${data.period} summary></fhir-period >
            <fhir-reference label="assigner" .data=${data.assigner} summary></fhir-reference > `
      ]
    }
    return [html``]
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public validate(data: IdentifierData, validations: Validations, fetched: boolean): void {

    if (data.use) {
      if (!FhirIdentifierUse.find(c => c.code === data.use)) {
        validations.addErr({
                             key: 'use',
                             err: 'identifier use is not one of accepted: ' + FhirAddressUse.map(c => c.code).join(', ')
                           })
      }
    }

    if (data.type?.coding) {
      const values = ValueSetIdentifierType.compose.include[0].concept
      const codings: CodingData[] = data.type.coding
      codings.filter(coding => !values.find(v => v.code === coding.code))
             .forEach((_, index) => {
               validations.addErr({
                                    parent: ['type', 'coding', index + ''],
                                    key: 'code',
                                    err: 'identifier type is not one of accepted: ' + values.map(c => c.code).join(', ')
                                  })

             })


    }

  }
}
