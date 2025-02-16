FHIR Beacon
===========

> [!IMPORTANT]
> This library is exploratory and not ready for production. All feedback is welcome.
> read [background](./docs/background.md)


Fhir Beacon is for working with [FHIR r5](http://hl7.org/fhir/) data in the browser without the need for a backend. It
enables web-developers to easily adopt the FHIR metamodel as is, without having to implement middleware or data
mappings. FHIR Beacon is built with web-components and aspires to be framework-agnostic and impose as few dependencies.

* 🧰 [Using FHIR Elements](#components)
* ✅ [Implemented FHIR Elements](#implemented)
* 🛠️ [Create FHIR Elements](#extending)
* 🔤 [Use FHIR Primitives](#primitive)
* ✨ [Validation & Bindings](#validations)
* 🎨 [Styling narratives](#narrative)
* 🖥️ [Using the shell](#shell)

### Features

* A default implementation of FHIR primitives, complex, and resource as HTML custom elements.
* Display elements in view, editable form, metamodel view, narrative view, or debug view.
* Extend any element to support extensions and profiles.
* Base classes, utilities to create custom FHIR elements that implements the metamodel (cardinality, bindings,
  summary, constraints, etc.)

### Status

* in full ALPHA mode. see [background](./docs/background.md)
* storybook catalog: https://fhir-beacon.deno.dev
* use-case showcase: https://fhir-beacon-app.deno.dev

Setup
-----

Add `fhir-beacon` to your project:

```shell
npm install fhir-beacon 
```

The library uses components from the [shoelace library](https://shoelace.style/). So you need to add links in the
`<head>` element of `index.html`.

```html

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.20.0/cdn/themes/light.css"/>
<script type="module"
        src="https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.20.0/cdn/shoelace-autoloader.js"
></script>
```

Finally, you need to import the library so that custom elements are registered in the browser. Do this in the `head` of
the document or before the first Fhir Beacon element is rendered.

> [!IMPORTANT]
> Having to load everything is suboptimal. We will eventually make it possible to only load the parts of the library
> that
> you need.

```typescript
import 'fhir-beacon'
```

## <a id="components"></a> Using the Components

All examples use lit-html template for rendering. This library works just as easily with React (>|
Preact, Angular, Vue, or vanilla JS.

### Using Existing Components

The library comes with web components for FHIR resources and other FHIR datatypes. By default

```typescript
import {DisplayMode, MedicationData} from 'fhir-beacon'
import {html}                        from 'lit'

export function render(medication: MedicationData) {
  return html`
          <fhir-medication label="patient (verbose)" .data=${medication} .mode=${DisplayMode.structure} verbose open >
          </fhir-medication>
  `
}

```

### Properties

All FHIR elements have the same common attributes and exposed methods

| Name          | Description                                                                                                                                                                                                 | default        |
|---------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------|
| `data`        | the data to render as a string. **Note: using the `.data` method with JSON objects is more efficient**                                                                                                      |                |
| `key`         | identity of the element in the FHIR model. It ia recommended that it matches the property name in the FHIR model. It should be unique within one sibling-scope. Important for binding context to an element | element `type` |
| `mode`        | the display mode: `display \| structure \| narrative \| debug \| override` see: [DisplayMode enum](src/shell/displayMode.ts)                                                                                | `display`      |
| `label`       | user visible name or title for an element. Has no impact on any logic.                                                                                                                                      | `key`          |
| `summary`     | element should be displayed when only summary should be shown                                                                                                                                               | `false`        |
| `summaryonly` | display only the FHIR-defined summary properties                                                                                                                                                            |                |
| `required`    | data can not be blank.                                                                                                                                                                                      | `false`        |
| `verbose`     | display all properties of an element whether or not data is provided.                                                                                                                                       |                |
| `headless`    | only display data. Essentially hides the label.                                                                                                                                                             | `false`        |
| `open`        | open all collapsed detail sections. This only has effect when `mode="structure"`                                                                                                                            | `false`        |

### Methods

| Name     | Description                                                                                             | default |
|----------|---------------------------------------------------------------------------------------------------------|---------|
| `data`   | the data to render. This should be FHIR JSON as specified in the JSON specification.                    |         |
| `errors` | errors associated with the provided data: requires instance [`FqkMap`](src/internal/base/DeepKeyMap.ts) |         |

Note: errors and validation is not fully exposed to be used from user-land

### <a id="implemented" ></a>Implemented FHIR Elements

Only some of the defined resources are currently implemented. The goal of this project is to provide a default
implementation for all resources in the system.

What is implemented:

| Core/Base Classes                                             | Complex Datatype Elements   | Special Elements   | Resource Elements    |
|---------------------------------------------------------------|-----------------------------|--------------------|----------------------|
| [`BaseElement`](./src/internal/BaseElement.ts)                | `<fhir-address>`            | `fhir-meta>`       | `<fhir-account>`     |
| [`Resource`](./src/internal/resource/Resource.ts)             | `<fhir-annotation>`         | `<fhir-narrative>` | `<fhir-appointment>` |
| [`DomainResource`](./src/internal/resource/DomainResource.ts) | `<fhir-attachment>`         | `<fhir-reference>` | `<fhir-medication>`  |
| [`BackboneElement`](./src/internal/resource/Backbone.ts)      | `<fhir-codeable-concept>`   | `<fhir-bundle>`    | `<fhir-observation>` |
|                                                               | `<fhir-codeable-reference>` |                    | `<fhir-patient>`     |
|                                                               | `<fhir-coding>`             | `<fhir-primitive>` | `<fhir-slot>`        |
|                                                               | `<fhir-contact-point>`      |                    | `<fhir-substance>`   |
|                                                               | `<fhir-human-name>`         |                    |                      |
|                                                               | `<fhir-identifier>`         |                    |                      |
|                                                               | `<fhir-money>`              |                    |                      |
|                                                               | `<fhir-period>`             |                    |                      |
|                                                               | `<fhir-quantity>`           |                    |                      |
|                                                               | `<fhir-range>`              |                    |                      |
|                                                               | `<fhir-ratio>`              |                    |                      |
|                                                               | `<fhir-sampled-data>`       |                    |                      |
|                                                               | `<fhir-signature>`          |                    |                      |
|                                                               | `<fhir-timing>`             |                    |                      |

Go to component implemtation [source](./src/components)

## <a id="primitive" ></a> Using Primitives

At the other end of the model is the `<fhir-primitive>` element. It is a single component that can be used to present
all
FHIR Primitive datatypes.

You can use primitives on their own without resouce elements.

```typescript
import {html}          from 'lit'
import {PrimitiveType} from 'fhir-beacon'

function render(data: QuantityData) {
  return html`
            <fhir-primitive key="value" .value=${data.value} type="decimal" summary></fhir-primitive>
            <fhir-primitive key="comparator" .value=${data.comparator} type="code" summary></fhir-primitive>
            <fhir-primitive key="unit" .value=${data.unit} summary></fhir-primitive>
            <fhir-primitive key="system" .value=${data.system} type="uri" summary></fhir-primitive>
            <fhir-primitive key="code" .value=${data.code} type="code" summary></fhir-primitive>`
}

```

### Properties

| Attribute      | Description                                                                                                                                                                                                  | default |
|----------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------|
| `key`          | identity of the element in the FHIR model. It is recommended that it matches the property name in the FHIR model. It should be unique within one sibling-scope. Important for binding context to an element. |         |
| `label`        | human-readable property description                                                                                                                                                                          | `key`   |
| `type`         | the type of the primitive. When defined the value will be validated.                                                                                                                                         | `none`  |
| `delimiter`    | seperator between label and key                                                                                                                                                                              | `:`     |
| `value`        | the value of the primitive.                                                                                                                                                                                  |         |
| `errormessage` | the error message to display if the primitive is invalid                                                                                                                                                     |         |
| `link`         | url that should be applied as a link on the value                                                                                                                                                            |         |
| `context`      | contextual information to display next to the value (ex: code)                                                                                                                                               |         |
| `variant`      | value rendering styling variants to deal with large/long values: `error` \| `hide-overflow` \| `fixed-width`                                                                                                 |         |
| `summary`      | display only the FHIR-defined summary properties                                                                                                                                                             | `false` |
| `required`     | value can not be blank.                                                                                                                                                                                      | `false` |
| `translate`    | translate value (not implemented yet)                                                                                                                                                                        | `false` |
| `trialuse`     | indicate that property is set to trial use (not implemented yet)                                                                                                                                             | `false` |

### Methods

| Methods   | Description                                      | type                                       |
|-----------|--------------------------------------------------|--------------------------------------------|
| `choices` | choices to use when property rendered in a form. | [Choice](./src/valuesets/ValueSet.data.ts) |

When the `type` is set, primitive elements will be validated and converted to reader-friendly format

### Implemented Validators

|           |              |                  |              |
|-----------|--------------|------------------|--------------|
| base64    | decimal      | link             | unsigned_int |
| boolean   | fhir_string  | markdown         | uri          |
| canonical | forced_error | none             | uri_type     |
| code      | id           | positiveInt      | url          |
| date      | instant      | string_reference |              |
| datetime  | integer      | time             |              |

### Implemented Formatters

|              |          |
|--------------|----------|
| date         | uri      |
| datetime     | uri_type |
| forced_error | url      |
| instant      |          |
| link         |          |
| time         |          |

Primitive elements are made up of even smaller components that can also be used separately.

```html

<fhir-primitive-wrapper>
    <fhir-label text="quantity"></fhir-label>
    <fhir-value text="100_0"><span slot="after">ml</span></fhir-value>
    <fhir-error text="The quantity is not valid"></fhir-error>
</fhir-primitive-wrapper>

```

It is a goal of this project to eventually make these low-level visual elements easy to style, configure and even
override.

### <a id="extending" ></a> Creating Your Own

There are two ways to customised elements. You can implement your own with `BaseElement` or extend an existing element
and overriding the parts you need.

> [!IMPORTANT]
> Re-use exisitng primitives and complex types. Only implement what you need.

#### <a id="custom-element" ></a> Implement an Element

When implementing your own component you need to extend `BaseElement`, `Resource`, or `DomResource`. You can also
implement `Backbone` and a variety of utilities to manage the typical element metamodel aspects.

Take a look at how [Observation](src/components/resources/observation/observation.ts) is implemented.

Many utilities are used to make it easy to deal with 'choice of', collections, and other FHIR modelling aspects. These
can be found in a few places:

* [utilities](./src/utilities) - documentation is missing at the moment
* [valuesets and codesystems](./src/codes) - documentation is missing at the moment
* [presentation](./src/shell) - documentation is missing at the moment

#### <a id="custom-element" ></a> Extend an existing Element

* read more about the component [model](docs/model.md)
* read more about the component [state change lifecycle](docs/lifecycle.md)

Here is a simple example of creating `<my-address>` by extending the exisitng Address implementation.
```typescript
import {html}                   from 'lit'
import {Address, PrimitiveType} from 'fhir-beacon'

@customElement('my-address')
export class MyAddress extends Address {


  public renderDisplay(config: DisplayConfig,
                       data: Decorated<AddressData>,
                       vldtns: Validations): TemplateResult[] {

    const fkq = { path: [{ node: 'state' }] }

    if (vldtns.has(fkq)) {
      return [
        html`
       <fhir-primitive key="state" .value=${data.state} .type=${PrimitiveType.fhir_string} .errormessage=${vldtns.msgFor(
          fkq)} >
       </fhir-primitive>
      `
      ]
    }
    // render default implementation otherwise
    return this.renderDisplay(config, data, vldtns)
  }


  public validate(data: AddressData, validations: Validations): void {
    // do all existing validations
    this.validate(data, validations)

    // implement a custom validation
    if (!data.state) {
      validations.add({
                        fqk: { path: [{ node: 'state' }] },
                        message: 'state must be present'
                      })

    }

  }
}

```

### <a id="validations" ></a> Validations and bindings

The library provides facilities for validating and for binding value sets and coding systems.

* [valuesets and codesystems](./src/codes) - These are ready to use with elements. Documentation is missing at the
  moment
* [code-gen to extract codes](./src/valuesets) - This is some unstable code-generation code to walk valuesets and code
  systems to extract usable lists of choices for validation and for forms.

> [!WARNING]
> This feature is not yet stable enough... documentation comes soon.

### <a id="narrative" ></a> Overriding Narrative Styling

Add a stylesheet with `id="fhir-beacon-narrative"` in your html `<head>` to
align narrative html with your projects styles. The narrative's html is wrapped in shadow dom and can be targeted with
the `#formatted-narrative` id. Styling narrative html fragments is unpredictable as html and css present unknowns.

The example below uses [CSS nesting](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_nesting/Using_CSS_nesting) to
define all the styles to apply to the narrative.

```html

<style id="fhir-beacon-narrative">
    /**
     * Overrides styles to to change the appearance of 3rd-party narrative html.
     * Setting id="fhir-beacon-narrative" above and top level class of #formatted-narrative is necessary to localise styles.
     * The exact styling depends on the provided narrative
     */
    #formatted-narrative {
        font-size: 1rem;
        font-family: sans-serif;
        border: 0.1rem solid gray;
        border-radius: 10px;
        margin: 1rem;
        padding: 1rem;

        div, div[xmlns] {
            all: unset;
            display: inline-block;
            background: unset !important;
            width: fit-content;

            div, td, p, span {
                background: unset !important;
                border: unset !important;
                line-height: 1.5rem;
            }

            b, h4, h5, h6 {
                color: lightseagreen;
            }

            h1, h2, h3 {
                color: #2aeae0;
            }

            td {
                border-left: 0.1rem solid gray;
            }
        }
    }
</style>
```

## <a id="shell" ></a> The Shell

Resource and Domain Resources provide a context to all child properties. This context passes shared configuration to all
elements. You can use the `<shir-shell>` to provide an arbitrary context for the display fragments contianing complex
types and/or primitives.

```typescript
import {html} from 'lit'

function render(data) {
  return html`
        <fhir-shell mode="structure" headless open >
            <fhir-primitive key="id" .value=${data.id} type="integer"></fhir-ratio>
            <fhir-ratio key="ratio" .data=${data.ratio}></fhir-ratio>
            <fhir-range key="range" .data=${data.range}></fhir-ratio>
        </fhir-shell>
  `
}

```

## Properties

| Name          | Description                                                                                                                  | default   |
|---------------|------------------------------------------------------------------------------------------------------------------------------|-----------|
| `mode`        | the display mode: `display \| structure \| narrative \| debug \| override` see: [DisplayMode enum](src/shell/displayMode.ts) | `display` |
| `summaryonly` | display only the FHIR-defined summary properties                                                                             |           |
| `verbose`     | display all properties of an element whether or not data is provided.                                                        |           |
| `headless`    | only display data. Essentially hides the label.                                                                              | `false`   |
| `open`        | open all collapsed detail sections. This only has effect when `mode="structure"`                                             | `false`   |
| `input`       | show form                                                                                                                    | `false`   |
