# FHIR Beacon 

A FHIR data library for the frontend.

* library docs: [library](./packages/library/README.md).
* storybook: https://fhir-beacon.deno.dev
* showcase: https://fhir-beacon-app.deno.dev
    
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

## Development Notes:

This project is unstable and not entirely consistent at the moment. I am driven by exploration and experimentation
at the moment. It is getting mature enough that it could be used in some specific contexts, but it's still today a
one-person show!

There's a backlog of issues where I am tracking work and ideas:  https://github.com/users/zenwork/projects/4

There is nowhere near enough tests!

Many ideas have evolved over time and I have not taken the time to refactor everything.  


## Background

I started this project to learn FHIR and give myself a reason to read through the FHIR specification in the spring of
2024 . I needed to learn more about FHIR to lead a large team building an EPR system based on FHIR. This system has many
frontends, healthcare organisation integrations, and adapters to legacy protocols such as SOAP and Syslog. In other
words... lots of moving parts.

I don't quite remember when this learning project took on a life of its own!

One of the big questions is to decide where the data protocol boundaries should be. So I needed to understand FHIR
better. I have worked for decades on many data interoperability problems in various sectors. Some problems are the same
and some are different. One of the common problems is that data modelling language is highly correlated to the layers of
a system and to the technology/language used.
The [Object-relational impedance mismatch](https://en.wikipedia.org/wiki/Object%E2%80%93relational_impedance_mismatch)
is a well known problem that leads to all sorts of technology/framework/tooling solutions to try and resolve what is
ultimately a hard problem. There are diminishing returns on introducing marshalling, indirection, mapping tools. This
can be further aggravated in service-oriented architectures where data is travelling through many layers written with
different langauges running on different technology. We already have enough of a problem dealing with the domain's
interoperability problems, the legacy technologies of the sector, as well as the extremely complex nature data
governance in digital health care.

Along the way I attended a couple of FHIR DevDays conferences and listened to everyone. I also got deep into many
digital healthcare topics to help my organisation design the architecture of our new EPR.

My thinking then solidified: The FHIR interoperability standard defines a metamodel that is portable across
organisations, systems, and even technology or programming language boundaries. It follows then that we should be able
to use it anywhere "AS IS". A developer should be able to look at the core FHIR specification, a profile, an IG and
unambiguously map it to their code.

A project emerged: How would a library of browser components components that mapped idiomatically to the FHIR standard
look like. How could the FHIR metamodel be supported so that a base `<fhir-observation>` component could be extended to
support extensions, profiles, and ultimately IGs. I was not sure if all of this was possible(and still not) but the
shared qualities of the FHIR metamodel and the "HTML-JS-CSS-Browser Api" stack gave me hope:

- FHIR and HTML are object-oriented model and so is the DOM (document object model).
- FHIR and HTML are declarative in nature.
- FHIR and HTML are metamodels that define building blocks and rules.
- FHIR and HTML is composable, decomposable, and extendable.
- FHIR and HTML are designed for interoperability
  and [progressive enhancement](https://en.wikipedia.org/wiki/Progressive_enhancement)


### Goals reached to date:

- use web components to model the different data types in FHIR
- create a component lifecycle that provides dynamic rendering when data changes.
  see: [life-cycle models](./packages/library/docs/model.md)
- implement support for validation based on per-type rules
- enable rendering in different formats (simple, structural, narrative, raw data) based on runtime configuration
- enable rendering of different data depth (present, summary, verbose) based on runtime configuration
- experiment with user-land extension of the library
- experiment with user-land integration into applications

### Ongoing efforts:

- rendering of forms for editing purposes
- code generation of value sets and codesystem choices
- complete support for bindings to value sets and code systems
- first attempt at supporting extensions
- add more tests

### Future goals:
- reach feature completeness for primitives, metadata, special and complex datatype
- reach feature completeness for formats and display-depth
- support for FHIR path
- first attempt at supporting profiling and IGs
- focus on developer experience when using the library in a project.
- focus on developer experience when developing their own components.
- code generation of 140+ resources
