# The Component Model

## FHIR element model

### as a template

```html

<fhir-medication></fhir-medication>

```    

### object model

```mermaid
---
title: Fhir Element Model
config:
  theme: neutral
  class:
    hideEmptyMembersBox: true
---
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
        class CodeableConcept["&lt;fhir-codeable-concept&gt;"]:::cmp
        class HumanName["&lt;fhir-human-name&gt;"]:::cmp
        class Ratio["&lt;fhir-ratio&gt;"]:::cmp
        class Etc2["..."]:::cmp

        class Patient["&lt;fhir-patient&gt;"]:::res
        class Observation["&lt;fhir-observation&gt;"]:::res
        class Medication["&lt;fhir-medication&gt;"]:::res
        class Etc["..."]:::res
        class AppointmentRecTmplt["&lt;fhir-appointment-recurrence-template&gt;"]:::res
        class MedicationIngredient["&lt;fhir-medication-ingredient&gt;"]:::res
        class ObservationRefRange["&lt;fhir-observation-refference-range&gt;"]:::res
        class Etc3["..."]:::res

        class Primitive["&lt;fhir-primitive&gt;"]:::prim
    %%        class ShoelaceStyledElement["&lt;&lt;abstract&gt;&gt;\nShoelaceStyledElement"]:::prim
    %%        class PrimitiveLabel["&lt;fhir-label&gt;"]:::prim
    %%        class PrimitiveValue["&lt;fhir-value&gt;"]:::prim
    %%        class PrimitiveContext["&lt;fhir-context&gt;"]:::prim
    %%        class PrimitiveError["&lt;fhir-error&gt;"]:::pink
    }

    ConfigurableElement --|> LitElement
    BaseElement --|> ConfigurableElement
    Resource --|> BaseElement
    DomainResource --|> Resource
    Backbone --|> BaseElement
    Primitive --|> ConfigurableElement
    AppointmentRecTmplt --|> Backbone
    MedicationIngredient --|> Backbone
    ObservationRefRange --|> Backbone
    Etc3 --|> Backbone
    DomainResource *--> Backbone: as custom-element
%%    ShoelaceStyledElement --|> LitElement
%%    Primitive --|> ShoelaceStyledElement
%%    PrimitiveLabel --|> ShoelaceStyledElement
%%    PrimitiveValue --|> ShoelaceStyledElement
%%    PrimitiveContext --|> ShoelaceStyledElement
%%    PrimitiveError --|> ShoelaceStyledElement
%%    Primitive *--> PrimitiveLabel
%%    Primitive *--> PrimitiveValue
%%    Primitive *--> PrimitiveContext
%%    Primitive *--> PrimitiveError
    Primitive <--* BaseElement: as custom-element
    BaseElement <--* BaseElement: as custom-element
    Medication --|> DomainResource
    Patient --|> DomainResource
    Observation --|> DomainResource
    Etc --|> DomainResource
    CodeableConcept --|> BaseElement
    HumanName --|> BaseElement
    Ratio --|> BaseElement
    Etc2 --|> BaseElement




```

## FHIR Primitives

### as a template

```html

<fhir-primitve>
    <fhir-primitive-wrapper>
        <fhir-label></fhir-label>
        <fhir-value></fhir-value>
        <fhir-context></fhir-context>
        <fhir-error></fhir-error>
    </fhir-primitive-wrapper>
</fhir-primitve>
```

### as and object model

```mermaid
---
title: FHIR Primitive Element Model
config:
  theme: neutral
---
classDiagram
    direction BT
    fhir-primitive *--> "0..1" fhir-primitve-wrapper
    fhir-primitve-wrapper *--> "0..1" fhir-label
    fhir-primitve-wrapper *--> "0..1" fhir-value
    fhir-primitve-wrapper *--> "0..1" fhir-context
    fhir-primitve-wrapper *--> "0..1" fhir-error
```

## Listing properties

### as a template

```html

<fhir-wrapper>
    <fhir-primitive></fhir-primitive>
    <fhir-primitive></fhir-primitive>
    <fhir-primitive></fhir-primitive>
</fhir-wrapper>

```

### as an object model

NOTE: missing diagram
