# The Component Model

## FHIR Primitives

### as a template

```html
<fhir-primitve >
    <fhir-primitive-wrapper >
        <fhir-label ></fhir-label >
        <fhir-value ></fhir-value >
        <fhir-context ></fhir-context >
        <fhir-error ></fhir-error >
    </fhir-primitive-wrapper >
</fhir-primitve >
```

### as and object model

```mermaid
classDiagram
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
    <fhir-primitive ></fhir-primitive >
    <fhir-primitive ></fhir-primitive >
    <fhir-primitive ></fhir-primitive >
</fhir-wrapper>

```

### as an object model

NOTE: missing diagram

## FHIR element model

### as a template

```html

<fhir-medication></fhir-medication>

```    

### object model

```mermaid
---
title: Object Model
config:
  theme: dark
  class:
    hideEmptyMembersBox: true
---
classDiagram
    direction BT

    namespace lit {
        class LitElement:::dep
    }

    namespace base {
        class ConfigurableElement["&lt;&lt;abstract&gt;&gt;\nConfigurableElement"]:::base
        class BaseElement["&lt;&lt;abstract&gt;&gt;\nBaseElement"]:::base
        class Resource["&lt;&lt;abstract&gt;&gt;\nResource"]:::base
        class DomainResource["&lt;&lt;abstract&gt;&gt;\nDomainResource"]:::base
        class Backbone["&lt;&lt;abstract&gt;&gt;\nBackbone"]:::base
    }

    namespace complexElements {
        class CodeableConcept["&lt;fhir-codeable-concept&gt;"]:::cmp
        class HumanName["&lt;fhir-human-name&gt;"]:::cmp
        class Ratio["&lt;fhir-ratio&gt;"]:::cmp
        class Etc2["..."]:::cmp
    }

    namespace resourceElements {
        class Patient["&lt;fhir-patient&gt;"]:::res
        class Observation["&lt;fhir-observation&gt;"]:::res
        class Medication["&lt;fhir-medication&gt;"]:::res
        class Etc["..."]:::res
    }

    namespace primitive {
        class Primitive["&lt;fhir-primitive&gt;"]:::prim
        class ShoelaceStyledElement["&lt;&lt;abstract&gt;&gt;\nShoelaceStyledElement"]:::prim
        class PrimitiveLabel["&lt;fhir-label&gt;"]:::prim
        class PrimitiveValue["&lt;fhir-value&gt;"]:::prim
        class PrimitiveContext["&lt;fhir-context&gt;"]:::prim
        class PrimitiveError["&lt;fhir-error&gt;"]:::pink
    }

    ConfigurableElement --|> LitElement
    BaseElement --|> ConfigurableElement
    Resource --|> BaseElement
    DomainResource --|> Resource
    Backbone --|> BaseElement
    Primitive --|> ConfigurableElement
    ShoelaceStyledElement --|> LitElement
    PrimitiveLabel --|> ShoelaceStyledElement
    PrimitiveValue --|> ShoelaceStyledElement
    PrimitiveContext --|> ShoelaceStyledElement
    PrimitiveError --|> ShoelaceStyledElement
    Primitive *--> PrimitiveLabel
    Primitive *--> PrimitiveValue
    Primitive *--> PrimitiveContext
    Primitive *--> PrimitiveError
    Primitive <--* BaseElement: as custom element
    BaseElement <--* BaseElement: implementation as custom element
    Medication --|> DomainResource
    Patient --|> DomainResource
    Observation --|> DomainResource
    Etc --|> DomainResource
    CodeableConcept --|> BaseElement
    HumanName --|> BaseElement
    Ratio --|> BaseElement
    Etc2 --|> BaseElement




```
