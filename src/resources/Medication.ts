import {customElement}  from 'lit/decorators.js'
import {DomainResource} from './DomainResource'
import {MedicationData} from './structures'

@customElement('fhir-medication')
export class Medication extends DomainResource<MedicationData> {

}
