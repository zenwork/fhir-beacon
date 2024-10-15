## fhir simple/core property

### template

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

### object model

```mermaid
classDiagram
    fhir-primitive *--> "0..1" fhir-primitve-wrapper
    fhir-primitve-wrapper *--> "0..1" fhir-label
    fhir-primitve-wrapper *--> "0..1" fhir-value
    fhir-primitve-wrapper *--> "0..1" fhir-context
    fhir-primitve-wrapper *--> "0..1" fhir-error
```

## List of properties

### template

```html

<fhir-wrapper>
    <fhir-primitive ></fhir-primitive >
    <fhir-primitive ></fhir-primitive >
    <fhir-primitive ></fhir-primitive >
</fhir-wrapper>

```

### object model

```mermaid
classDiagram
    BaseElementContextProvider <|-- Shell
    Shell *--> `fhir-[element name]`
    ContextConsumerController <|-- `fhir-[element name]`
```

## FHIR element model

### object model

```mermaid
classDiagram
    note for ContextConsumerController "TODO: should be a mixin"
    note for BaseElementContextProvider "TODO: should be a mixin"
    note for `fhir-[element name]-resource` "TODO: add '-resource' suffix to resources"

    class ContextConsumerController
    class BaseElementContextProvider

%%    BaseElement <|-- ContextConsumerController
%%    BaseElement <|-- BaseElementContextProvider
%%    BaseElementContextProvider <|-- Resource
    BaseElement <|-- Resource
    Resource <|-- DomainResource
%%    ContextConsumerController <|-- `fhir-[element name]`
    BaseElement <|-- `fhir-[element name]`
    DomainResource <|-- `fhir-[element name]-resource`: "context\nproducer\nelements"
    `fhir-[element name]-resource` *--> "1" `fhir-[element name]`: "context\nconsumer\nelements"
    `fhir-[element name]-resource` *--> "0..*" fhir-primitive: "context\nconsumer\nelements"
    `fhir-[element name]` *--> "0..*" fhir-primitive
%%    `fhir-[element name]` *--> "1" fhir-wrapper
%%    `fhir-[element name]` *--> "0..*" fhir-structure-wrapper
%%    fhir-wrapper *--> "0..*" fhir-primitive
    fhir-structure-wrapper *--> "0..*" fhir-primitive

```
