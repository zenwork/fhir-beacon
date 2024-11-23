import {
  Code,
  CodeableConceptData,
  DomainResourceData,
  IdentifierData,
  Instant,
  ResourceData,
  SlotData
}                             from 'fhir-beacon'
import {html, LitElement}     from 'lit'
import {customElement, state} from 'lit/decorators.js'
import '@shoelace-style/shoelace/dist/components/card/card.js'
import '@shoelace-style/shoelace/dist/components/button/button.js'
import 'fhir-beacon'


@customElement('app-slot')
export class AppBook extends LitElement {

  @state()
  private data: IdentifierData = createIdentifier()

  render() {
    return html`
        <main>
            <h2>Create an Appointment Slot</h2>
            <app-identifier-form label="New Identifier" .data=${this.data} showerror headless>
            </app-identifier-form>

        </main>
    `
  }
}

function createEmptySlot(): SlotData {
  return {
    ...createEmptyDomainResource('Slot'),
    identifier: [createIdentifier()],
    serviceCategory: [],
    serviceType: [],
    specialty: [],
    appointmentType: [],
    schedule: {} as CodeableConceptData,
    status: '' as Code,
    start: '' as Instant,
    end: '' as Instant

  }
}

function createIdentifier(): IdentifierData {
  return {
    use: 'official',
    system: 'http://www.acmehosp.com/patients',
    value: '44552',
    period: {
      start: '2003-05-03'
    }
  }
}

function createEmptyDomainResource(name: string): DomainResourceData {
  return {
    ...createEmptyResource(name),
    contained: [],
    extension: [],
    modifierExtension: []
  }
}

function createEmptyResource(name: string): ResourceData {
  return { resourceType: name }
}
