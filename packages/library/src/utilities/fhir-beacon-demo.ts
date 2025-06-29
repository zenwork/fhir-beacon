import {html, LitElement, TemplateResult} from 'lit'
import {customElement}                    from 'lit/decorators.js'




@customElement('fhir-beacon-demo')
export class FhirBeaconDemo extends LitElement {

  public render(): TemplateResult {
    return html`<div style="display:grid; grid-template-columns:1fr 1fr">
    <div>
        <h4>display</h4>
        <fhir-shell mode="display" open>
           <slot name="display"></slot>

        </fhir-shell>
    </div>
    <div>
        <h4>structure</h4>
        <fhir-shell mode="structure" open>
            <slot name="structure"></slot>

        </fhir-shell>
    </div>
    <div style="grid-column:1 / span 2">
        <h4>data</h4>
        <fhir-shell mode="debug" open>
           <slot name="debug"></slot>

        </fhir-shell>
    </div>
</div>
    `
  }


}
