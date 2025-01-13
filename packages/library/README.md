FHIR Beacon
===========

## The Library
Open Source library for working with [FHIR](http://hl7.org/fhir/) data in the browser that enables web-developers to 
easily adopt the FHIR metamodel as is, without having to implement a separate marshaling layer. 

## Status
* in full alpha mode.
* storybook catalog: https://fhir-beacon.deno.dev
* use-case showcase: https://fhir-beacon-app.deno.dev

## Design Philosophy?
1. `idiomatic` - UI markup that easily reflect the core FHIR documentation 
2. `local-first` - data validation without a backend; leverages web-APIs for state-management
3. `framework-agnostic` - the library is can be used in any framework, plain JS, or in statically generated single 
   HTML file.
4. `resources or fragments` - use the library to render complete resources or any fragments
5. `composable, decomposable, and extendable` - use the library differently in different contexts
6. `fast prototyping` - use 4 default view-modes through-out the development process (display, structural, narrative,
   jason)
7. `customize` - extend existing FHIR element to change what you need or support your FHIR extensions 
8. `create` - build components from scratch with a FHIR-ready toolkit 

## Foreseen Benefits
* Eliminate the overhead of maintaining a frontend data-model.
* Make front-end developers productive without being FHIR domain experts.
* Integrate FHIR data in UIs far away from a FHIR backend.

## Usage

NOTE: All usage examples assume that the `fhir-beacon` library is loaded in the browser.      


Display an observation with default rendering using the lit html template rendering:
```typescript
import {DisplayMode, ObservationData} from 'fhir-beacon'
import {html} from 'lit'

function render(data:ObservationData){
  return html`<fhir-observation .data=${data}></fhir-observation>`
}
```

  
Display an observation with structural details in React:
```jsx
import {DisplayMode, ObservationData} from 'fhir-beacon'

function render(data:ObservationData){
  return <fhir-observation data={data} mode={DisplayMode.structure} verbose></fhir-observation>
}
```

Display an observation as a narrative in plain html:
```html
<document>
    <template>
        <fhir-observation mode="narrative"></fhir-observation>        
    </template>
    <script>
            const temp = document.getElementsByTagName("template")[0];
            const obs = temp.content.cloneNode(true);
            
            obs.data = data
            
            document.body.appendChild(obs);
    </script>
</document>
```
