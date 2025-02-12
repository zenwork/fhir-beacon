import {html, TemplateResult}                        from 'lit'
import {customElement}                               from 'lit/decorators.js'
import {useSystem}                                   from '../../../codes/use-system'
import {BaseElement, Decorated, errors, Validations} from '../../../internal'
import {DisplayConfig}                               from '../../../shell/types'
import {PrimitiveType}                               from '../../primitive/type-converters/type-converters'
import {CodingData}                                  from '../coding'
import {IdentifierData}                              from './identifier.data'



@customElement('fhir-identifier')
export class Identifier extends BaseElement<IdentifierData> {

  constructor() {super('Identifier')}

  public renderDisplay(_config: DisplayConfig,
                       data: Decorated<IdentifierData>,
                       validations: Validations): TemplateResult[] {

    return [
      html`
          <fhir-primitive key="id" label="id" .value=${data.value} .context=${data.system} summary></fhir-primitive>
          <fhir-codeable-concept key="type"
                                 label="type"
                                 .data=${data.type}
                                 .errors=${validations.sliceForFQK({ path: [{ node: 'type' }] })}
                                 summary
          ></fhir-codeable-concept>
          <fhir-period key="period" .data=${data.period} summary></fhir-period>
      `
    ]
  }

  public renderStructure(_config: DisplayConfig,
                         data: Decorated<IdentifierData>,
                         validations: Validations): TemplateResult[] {
      return [
        html`
            <fhir-primitive label="use" type=${PrimitiveType.code} .value=${data.use}
                            errormessage=${validations.msgFor('use')} summary
            ></fhir-primitive>
            <fhir-codeable-concept label="type" .data=${data.type}
                                   .errors=${data[errors]} summary
            ></fhir-codeable-concept>
            <fhir-primitive label="system" type=${PrimitiveType.uri} .value=${data.system} summary></fhir-primitive>
            <fhir-primitive label="value" .value=${data.value} summary></fhir-primitive>
            <fhir-period label="period" .data=${data.period} summary></fhir-period>
            <fhir-reference label="assigner" .data=${data.assigner} summary></fhir-reference> `
      ]
  }


  public validate(data: IdentifierData, validations: Validations, _fetched: boolean): void {

    if (data.use) {
      if (!useSystem('http://hl7.org/fhir/identifier-use').choices.find(c => c.value === data.use)) {
        validations.add({
                          fqk: { path: [{ node: 'use' }] },
                          message: 'identifier use is not one of accepted: ' + useSystem(
                            'http://hl7.org/fhir/address-use')
                            .choices.map(c => c.value).join(', ')
                           })
      }
    }

    if (data.type?.coding) {
      const values = useSystem('http://hl7.org/fhir/ValueSet/identifier-type').choices
      const codings: CodingData[] = data.type.coding
      codings.filter(coding => !values.find(v => v.value === coding.code))
             .forEach((_, index) => {
               validations.add({
                                 fqk: {
                                   path: [{ node: 'type' }, { node: 'coding', index: index }],
                                   key: 'code'
                                 },
                                 message: 'identifier type is not one of accepted: ' + values.map(c => c.value).join(
                                   ', ')
                                  })

             })


    }

  }
}
