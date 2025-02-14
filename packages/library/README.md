FHIR Beacon
===========

## The Library
Open Source library for working with [FHIR](http://hl7.org/fhir/) data in the browser that enables web-developers to 
easily adopt the FHIR metamodel as is, without having to implement a separate marshaling layer. 

* [Using Components](#components)
* [FHIR Elements](#implemented)
* [Styling narratives](#narrative)

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

### <a id="components"></a> Using the Components

All examples use lit-html template for rendering. This library works just as easily with React (>=v19 recommended),
Preact, Angular, Vue, or vanilla JS.

#### Using Existing Components

The library comes with web components for FHIR resources and other FHIR datatypes. By default

```typescript
import {MedicationData}       from 'fhir-beacon'
import {html, TemplateResult} from 'lit'



export function render(medication: MedicationData) {
  return html`
          <fhir-medication 
                  label="patient (default)" 
                  .data=${medication}></fhir-medication>
          <fhir-medication 
                  label="patient (summary)" 
                  .data=${medication} 
                  summaryonly></fhir-medication>
          <fhir-medication 
                  label="patient (verbose)" 
                  .data=${medication} 
                  verbose></fhir-medication>
  `
}

```

#### Properties

All FHIR elements have the same common attributes and exposed methods

| Name          | Description                                                                                                                                                                                                 | default           |
|---------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------|
| `data`        | The data to render as a string. **Note: using the `.data` method with JSON objects is more efficient**                                                                                                      |                   |
| `key`         | identity of the element in the FHIR model. It ia recommended that it matches the property name in the FHIR model. It should be unique within one sibling-scope. Important for binding context to an element | element-type name |
| `mode`        | The display mode: `display \| structure \| narrative \| debug \| override` see: [DisplayMode enum](src/shell/displayMode.ts)                                                                                | `display`         |
| `label`       | User visible name or title for an element. Has no impact on any logic.                                                                                                                                      | `key`             |
| `summaryonly` | Display only the FHIR-defined summary properties                                                                                                                                                            |                   |
| `verbose`     | Display all properties of an element whether or not data is provided.                                                                                                                                       |                   |
| `headless`    | Only display data. Essentially hides the label.                                                                                                                                                             | `false`           |
| `open`        | open all collapsed detail sections. This only has effect when `mode="structure"`                                                                                                                            | `false`           |

#### Methods

| Name   | Description                                                                          | default |
|--------|--------------------------------------------------------------------------------------|---------|
| `data` | The data to render. This should be FHIR JSON as specified in the JSON specification. |         |

#### <a id="implemented" ></a>Implemented FHIR Elements

Only some of the defined resources are currently implemented. The goal of this project is to provide a default
implementation for all resources in the system.

What is implemented:
| Core/Base Classes | Complex Datatype Elements | Special Elements | Resource Elements |
|-------------------|---------------------------|------------------|--------------------|
| `BaseElement`     | `fhir-address`            | `fhir-meta`      | `fhir-account`     |
| `Resource`        | `fhir-annotation`         | `fhir-narrative` | `fhir-appointment` |
| `DomeResource`    | `fhir-attachment`         | `fhir-reference` | `fhir-medication`  |
| `BackboneElement` | `fhir-codeable-concept`   | `fhir-bundle`    | `fhir-observation` |
| | `fhir-codeable-reference` | | `fhir-patient`     |
| | `fhir-coding`             | `fhir-primitive` | `fhir-slot`        |
| | `fhir-contact-point`      | | `fhir-substance`   |
| | `fhir-human-name`         | | |
| | `fhir-identifier`         | | |
| | `fhir-money`              | | |
| | `fhir-period`             | | |
| | `fhir-quantity`           | | |
| | `fhir-range`              | | |
| | `fhir-ratio`              | | |
| | `fhir-sampled-data`       | | |
| | `fhir-signature`          | | |
| | `fhir-timing`             | | |

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

## Features
* default implementation of FHIR primitives, complex, resource as HTML custom elements
* display view, editable form, metamodel view, narrative view, debug view modes for all elements
* Extend any element to support extensions and profiles
* Base classes, utilities to create custom FHIR elements that implements the metamodel (cardinality, bindings, 
  summary, constraints, etc.)  

## Status
* in full alpha mode.
* storybook catalog: https://fhir-beacon.deno.dev
* use-case showcase: https://fhir-beacon-app.deno.dev

## Design Philosophy?
1. `idiomatic` - UI markup that easily reflect the core FHIR documentation 
2. `local-first` - data validation without a backend; leverages web-APIs for state-management
3. `framework-agnostic` - the library can be used in any framework, plain JS, or in statically generated single
   HTML file.
4. `resources or fragments` - use the library to render complete resources or any fragments
5. `composable, decomposable, and extendable` - use the library differently in different contexts
6. `fast prototyping` - use 4 default view-modes through-out the development process (display, structural, narrative,
   json)
7. `customize` - extend existing FHIR element to change what you need or support your FHIR extensions 
8. `create` - build components from scratch with a FHIR-ready toolkit 

## Foreseen Benefits
* enable local-first client development
* Integrate FHIR data in UIs far away from a FHIR backend.
* Make front-end developers productive without being FHIR domain experts.
* Use FHIR domain knowledge to reason about the UI.
* Eliminate the overhead of maintaining a lot of middleware/BFF models just for the frontend.

## Usage

Below are some illustrative examples. All usage examples assume that the `fhir-beacon` library is loaded in the 
browser.

*Display an observation with default rendering using the lit html template rendering:*
```typescript
import {DisplayMode, ObservationData} from 'fhir-beacon'
import {html} from 'lit'

function render(data:ObservationData){
  return html`<fhir-observation .data=${data}></fhir-observation>`
}
```
 
*Or, use FHIR primitives & complex elements in combination with utility functions (ie: `wrap()`) to define your own 
rendering:* 
```typescript
import {DisplayMode, TimingData, wrap} from 'fhir-beacon'
import {html} from 'lit'

function render(data:TimingData, config:DisplayConfig){
  return html`
          ${wrap({
                 key: 'event',
                 collection: data.event ?? [],
                 generator: (d, l, k) => html`
                 <fhir-primitive key=${k} label=${l} .value=${d} .type=${PrimitiveType.datetime} summary ></fhir-primitive>`,
                 config
          })}
          <fhir-timing key="repeat" .data=${data.repeat}></fhir-timing>
          <fhir-codeable-concept key="code" .data=${data.code} summary></fhir-codeable-concept>
  `
}
```

  
*Display an observation with structural details in React:*
```jsx
import {DisplayMode, ObservationData} from 'fhir-beacon'

function render(data:ObservationData){
  return <fhir-observation data={data} mode={DisplayMode.structure} verbose></fhir-observation>
}
```

*Display an observation as a narrative in plain html:*
```html
<document>
    <template>
        <fhir-observation mode="narrative"></fhir-observation>        
    </template>
    <script>
            const temp = document.getElementsByTagName("template")[0];
            const obs = temp.content.cloneNode(true);
            
            obs.data = fetchData()
            
            document.body.appendChild(obs);
    </script>
</document>
```
