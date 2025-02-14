FHIR Beacon
===========

## The Library

Open Source library for working with [FHIR](http://hl7.org/fhir/) data in the browser that enables web-developers to
easily adopt the FHIR metamodel as is, without having to implement a separate marshaling layer.

Add `fhir-beacon` to your project:

```shell
npm install fhir-beacon 
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
import {html}                         from 'lit'



function render(data: ObservationData) {
  return html`<fhir-observation .data=${data}></fhir-observation>`
}
```

*Or, use FHIR primitives & complex elements in combination with utility functions (ie: `wrap()`) to define your own
rendering:*

```typescript
import {DisplayMode, TimingData, wrap} from 'fhir-beacon'
import {html}                          from 'lit'



function render(data: TimingData, config: DisplayConfig) {
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

function render(data : ObservationData) {
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
