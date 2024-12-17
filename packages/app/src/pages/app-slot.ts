import {Code, DomainResourceData, Instant, ReferenceData, ResourceData, SlotData} from 'fhir-beacon'
import {html, LitElement}                                                         from 'lit'
import {customElement, state}                                                     from 'lit/decorators.js'
import '@shoelace-style/shoelace/dist/components/card/card.js'
import '@shoelace-style/shoelace/dist/components/button/button.js'
import 'fhir-beacon'



@customElement('app-slot')
export class AppBook extends LitElement {

  @state()
  private data: SlotData = createEmptySlot()

  @state()
  private submitted: SlotData | null = null

  @state()
  private toggle: boolean = true


  render() {
    return html`
        <main>
            <h2>Create an Appointment Slot</h2>
            <form @submit=${(evt: SubmitEvent) => {
                evt.preventDefault()

                this.submitted = this.data
                this.requestUpdate()

            }}
            >
                <sl-switch @sl-change=${() => this.toggle = !this.toggle}>edit</sl-switch>
                <br/>
                <br/>
                <br/>
                <fhir-slot label="New Slot"
                           .data=${this.data || null}
                           @bkn-invalid=${() => console.log('error!')}
                           ?input=${this.toggle}
                           showerror
                           headless
                           verbose
                >
                </fhir-slot>
                <br/>
                <br/>
                <sl-button type='submit'>validate</sl-button>
            </form>
            <br/>
            <br/>
            <br/>
            <br/>
            <h2>Submitted</h2>
            <pre><code>${JSON.stringify(this.submitted, null, 2)}</code></pre>
        </main>
    `
  }
}

function createEmptySlot(): SlotData {
  return {
    ...createEmptyDomainResource('Slot'),
    identifier: [],
    serviceCategory: [],
    serviceType: [],
    specialty: [],
    appointmentType: [],
    schedule: { display: 'flo\'s schedule', type: 'Schedule', reference: 'Schedule/123' } as ReferenceData,
    status: 'free' as Code,
    start: '2024-12-22T00:00:00.000Z' as Instant,
    end: '2025-01-03T14:00:00-01:00' as Instant

  }
}

// function createIdentifier(): IdentifierData {
//   return {
//     use: 'official',
//     system: 'http://www.acmehosp.com/patients',
//     value: '44552',
//     period: {
//       start: '2003-05-03'
//     }
//   }
// }

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
