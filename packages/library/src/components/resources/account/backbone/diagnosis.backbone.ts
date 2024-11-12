import {html, TemplateResult} from 'lit'
import {customElement}        from 'lit/decorators.js'
import {Backbone, Decorated}  from '../../../../internal'
import {strap, wrap}          from '../../../../shell'
import {DisplayConfig}        from '../../../../types'
import {PrimitiveType}        from '../../../primitive'
import {AccountDiagnosisData} from '../account.data'

@customElement('fhir-account-diagnosis')
export class Diagnosis extends Backbone<AccountDiagnosisData> {
  constructor() {super('AccountDiagnosis')}

  public renderDisplay(config: DisplayConfig, data: Decorated<AccountDiagnosisData>): TemplateResult[] {
    return [
      html`
          <fhir-primitive key="sequence" .value=${data.sequence} .type=${PrimitiveType.positiveInt}></fhir-primitive>
          <fhir-codeable-reference key="condition" .data=${data.condition}></fhir-codeable-reference>
          <fhir-primitive key="dateOfOrigin"
                          .value=${data.dateOfOrigin}
                          type=${PrimitiveType.datetime}
          ></fhir-primitive>
          ${wrap({ key: 'type', collection: data.type, generator: 'fhir-codeable-concept', config })}
          <fhir-primitive key="onAdmission" .value=${data.onAdmission} .type=${PrimitiveType.boolean}></fhir-primitive>
          ${wrap({ key: 'packageCode', collection: data.packageCode, generator: 'fhir-codeable-concept', config })}


      `
    ]
  }

  public renderStructure(config: DisplayConfig,
                         data: Decorated<AccountDiagnosisData>): TemplateResult[] {
    return [
      html`

          <fhir-primitive key="sequence" .value=${data.sequence} .type=${PrimitiveType.positiveInt}></fhir-primitive>
          <fhir-codeable-reference key="condition" .data=${data.condition}></fhir-codeable-reference>
          <fhir-primitive key="dateOfOrigin"
                          .value=${data.dateOfOrigin}
                          type=${PrimitiveType.datetime}
          ></fhir-primitive>
          ${strap({ key: 'type', collection: data.type, generator: 'fhir-codeable-concept', config })}
          <fhir-primitive key="onAdmission" .value=${data.onAdmission} .type=${PrimitiveType.boolean}></fhir-primitive>
          ${strap({ key: 'packageCode', collection: data.packageCode, generator: 'fhir-codeable-concept', config })}


      `
    ]
  }
}
