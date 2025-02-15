Background
===========

## The Library

FHIR-Beacon is an open source library for working with [FHIR](http://hl7.org/fhir/) data in the browser that enables
web-developers to
easily adopt the FHIR metamodel as is, without having to implement a separate marshaling layer.

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

## The Story

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

## Development Notes:

This project is unstable and not entirely consistent at the moment. I am driven by exploration and experimentation
at the moment. It is getting mature enough that it could be used in some specific contexts, but it's still today a
one-person show!

There's a backlog of issues where I am tracking work and ideas:  https://github.com/users/zenwork/projects/4

There is nowhere near enough tests!

Many ideas have evolved over time and I have not taken the time to refactor everything.

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

## Framework Agnostic

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
