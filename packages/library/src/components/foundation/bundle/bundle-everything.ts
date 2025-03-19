import {Decorated}            from 'internal'
import {html, TemplateResult} from 'lit'
import {customElement}        from 'lit/decorators.js'
import {DisplayConfig}        from 'shell'
import {Bundle}               from './bundle'
import {BundleData}           from './bundle.data'



@customElement('fhir-bundle-everything')
export class BundleEverything extends Bundle {

  public renderDisplay(_config: DisplayConfig, data: Decorated<BundleData>): TemplateResult[] {
    return [
      html`
        <fhir-patient .data=${data.entry[0].resource} summaryonly></fhir-patient>
        <ol>
            ${data.entry.slice(1).map(entry => html`
                <li>${entry.resource!.resourceType} - ${entry.resource!.id}</li>`)}
        </ol>
    `
    ]
  }
}
