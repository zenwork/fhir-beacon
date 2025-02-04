# The Component Model

## FHIR element model

### object model

```mermaid
---
title: Core Model
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

    namespace Base {
        class ConfigurableElement["&lt;&lt;abstract&gt;&gt;\nConfigurableElement"]:::base
        class DataElement["&lt;&lt;abstract&gt;&gt;\nDataElement"]:::base
        class PresentableElement["&lt;&lt;abstract&gt;&gt;\nPresentableElement"]:::base
    }

    namespace FhirBeaconCore {
        class BaseElement["&lt;&lt;abstract&gt;&gt;\nBaseElement"]:::base

        class Primitive["&lt;fhir-primitive&gt;"]:::prim
    }

    namespace FhirModelImplementation {
        class FhirModelImpl["&lt;fhir-*&gt;"]:::base
    }

    ConfigurableElement --|> LitElement
    DataElement --|> ConfigurableElement
    PresentableElement --|> DataElement
    BaseElement --|> PresentableElement
    Primitive --|> ConfigurableElement
    FhirModelImpl --|> BaseElement
    FhirModelImpl *--> FhirModelImpl
    FhirModelImpl *--> Primitive



```


```mermaid
---
title: Fhir Element Model
config:
  theme: neutral
  class:
    hideEmptyMembersBox: true
---
classDiagram
    direction TB

    namespace FhirBeaconCore {
        class BaseElement["&lt;&lt;abstract&gt;&gt;\nBaseElement"]:::base
        class Resource["&lt;&lt;abstract&gt;&gt;\nResource"]:::base
        class DomainResource["&lt;&lt;abstract&gt;&gt;\nDomainResource"]:::base
        class Backbone["&lt;&lt;abstract&gt;&gt;\nBackbone"]:::base

        class Primitive["&lt;fhir-primitive&gt;"]:::prim
    }

    Resource --|> BaseElement
    DomainResource --|> Resource
    Backbone --|> BaseElement


```

```mermaid
---
title: Complex Elements
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
    }

    namespace FhirModelElements {
        class CodeableConcept["&lt;fhir-codeable-concept&gt;"]:::cmp
        class HumanName["&lt;fhir-human-name&gt;"]:::cmp
        class Ratio["&lt;fhir-ratio&gt;"]:::cmp
        class Etc2["..."]:::cmp
    }

    ConfigurableElement --|> LitElement
    BaseElement --|> ConfigurableElement
    BaseElement <--* BaseElement: as custom-element
    CodeableConcept --|> BaseElement
    HumanName --|> BaseElement
    Ratio --|> BaseElement
    Etc2 --|> BaseElement


```


```mermaid
---
title: Resource Elements
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
