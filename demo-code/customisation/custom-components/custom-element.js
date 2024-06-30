import {html}               from 'lit-html'
import {FhirContextElement} from '../../../src/fhir-context-element'

/**
 * Simple Component that doesn't implement LitElement reactive elements
 */
class MyCustomElement extends FhirContextElement {

    constructor() {super('$.id')}

    /**
     * The render method is called when data resolved with `data-path` attribute is resolved and attached to the `this.value` field.
     *
     * TODO: this example shouldn't depend on the Lit's html template.
     */
    render() {
        return html`<p >id: ${this.value ?? 'unable to resolve path'}</p >`
    }
}

customElements.define('custom-element', MyCustomElement)
