# FHIR Beacon 

A FHIR data library for the frontend.

* library docs: [library](./packages/library/README.md).
* storybook: https://fhir-beacon.deno.dev
* showcase: https://fhir-beacon-app.deno.dev
* for details about the project read the [background](./packages/library/docs/background.md)
    
## Usage example:
```typescript

import {DisplayConfig, ObservationData, PatientData} from 'fhir-beacon'
import {html} from 'lit'

type FhirRendererProps = {
  data: { patient: PatientData; observation: ObservationData; }
  config: DisplayConfig
};

export const FhirRenderer= ({ data, config }:FhirRendererProps) => {
  return html`
    <div>
      <fhir-patient .data=${data.patient} ?summaryonly=${config.summaryonly} ></fhir-patient>
      <hr/>
      <fhir-observation .data=${data.observation} ?showerror=${config.showerror} ></fhir-observation>
    </div>
  `
}


```
## The Core Model

```mermaid
---
title: Resource Custom Elements
config:
  theme: neutral
  class:
    hideEmptyMembersBox: true
---
%%{
  init: {
    'theme': 'base',
    'themeVariables': {
          'lineColor': 'blue',
          'primaryColor': '#BB2528',
          'primaryTextColor': '#fff',
          'primaryBorderColor': '#7C0000',
          'lineColor': '#F8B229',
          'secondaryColor': '#006100',
          'tertiaryColor': '#fff'
    }
  }
}%%
classDiagram
    direction BT

    namespace lit {
        class LitElement:::dep
    }

    namespace FhirBeaconCore {
        class ConfigurableElement["&lt;&lt;abstract&gt;&gt;\nConfigurableElement"]:::base
        class BaseElement["&lt;&lt;abstract&gt;&gt;\nBaseElement"]:::base
        class Resource["&lt;&lt;abstract&gt;&gt;\nResource"]:::base
        class DomainResource["&lt;&lt;abstract&gt;&gt;\nDomainResource"]:::base
        class Backbone["&lt;&lt;abstract&gt;&gt;\nBackbone"]:::base
    }

    namespace CustomElements {
        class Patient["&lt;fhir-patient&gt;"]:::res
        class Observation["&lt;fhir-observation&gt;"]:::res
        class Medication["&lt;fhir-medication&gt;"]:::res
        class Etc["..."]:::res

        class AppointmentRecTmplt["&lt;fhir-appointment-recurrence-template&gt;"]:::res
        class MedicationIngredient["&lt;fhir-medication-ingredient&gt;"]:::res
        class ObservationRefRange["&lt;fhir-observation-refference-range&gt;"]:::res
        class Etc3["..."]:::res
    }

    ConfigurableElement --|> LitElement
    BaseElement --|> ConfigurableElement
    Resource --|> BaseElement
    DomainResource --|> Resource
    Backbone --|> BaseElement
    DomainResource *--> Backbone: as custom-element
    BaseElement <--* BaseElement: as custom-element
    Medication --|> DomainResource
    Patient --|> DomainResource
    Observation --|> DomainResource
    Etc --|> DomainResource
    AppointmentRecTmplt --|> Backbone
    MedicationIngredient --|> Backbone
    ObservationRefRange --|> Backbone
    Etc3 --|> Backbone



```

## Packages

### [`library`](./packages/library/README.md)
The library provides a collection of web components for working with FHIR data in the browser.
- [storybook catalog app](https://fhir-beacon.deno.dev)
- [read more docs](./packages/library/README.md)
- [the model](./packages/library/docs/model.md)
### [`app`](./packages/app/README.md)
A showcase application for demonstrating the integration use-cases.
- [use-case showcase app](https://fhir-beacon-app.deno.dev)
- [read more](./packages/app/README.md)

### `data`
Development and testing time data. It mostly contains FHIR reference data.

### `server`
Development and testing time configuration for running HAPI FHIR server in docker.
