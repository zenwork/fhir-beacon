# FHIR Element Lifecycle

## FHIR Base Element

All complex types, resources, and domain resources implement [BaseElement](src/internal/BaseElement.ts) .
BaseElement is a public extension point that contains two sub-lifecycles: data lifecycle and presentation lifecycle.

The implementation provides 'hooks' where it is considered valid to extend or override the implementation.

```mermaid
---
title: Element Lifecycle
    
---

stateDiagram-v2
    state litReactiveElements {
        r: requestUpdate()
        w: willUpdate()
        render
        [*] --> r
        r --> w
        w --> p: data changed
        w --> f: dataPath changed
        le: *
        mustRender() --> render: no
        pdisp --> render
        pstop --> render
        pre --> render
        prepare --> render
        render --> mode: <center>!hide\n&& data
        render --> renderError: <center>hide\n&& data
        render --> renderNothing: <center>hide\n&& !data
        renderX --> le
        renderError --> le
        renderNothing --> le
        f --> r: <center>data updated\n-->\n update cycle

        state fhirDataElement {
            p: <center><b>prepare()</b></center>
            v: <center><b>validate()</b>\n<em>[hook]</em></center>
            d: <center><b>decorate()</b>\n<em>[hook]</em></center>
            ip: <center><b>isPrepared()</b>\n<em>[hook]</em></center>
            f: fetch
            p --> v
            v --> d: data
            v --> ip: !data
            d --> ip
            ip --> mustRender()
        }

        state fhirPresentablePrepare {
            mustRender(): <center><b>mustRender()?</b>\n<em>[hook]</em></center>
            willRender: <center><b>willRender()</b>\n<em>[hook]</em></center>
            pdisp: <center>prepare\nrenderDisplay()\ntemplate</center>
            prepare: <center>prepare\nrender[mode]()\ntemplate</center>
            pre: <center>prepare\nrenderEditableDisplay()\n template</center>
            pstop: <center>prepare\nerror\ntemplate</center>
            pmode: <center><b>mode==display|structure\n|narrative|debug\n|override,\nverbose,\n header</b>\n<em>[config] </em></center>
            mustRender() --> willRender: yes
            willRender --> pmode
            pmode --> prepare
            pmode --> pdisp: <center>mode==display\n&&!input
            pmode --> pre: <center>mode==display\n&&input
            pmode --> pstop: <center>mode==structure,\nverbose,\n infinte\nrecurrsion\ndetected
        }

        state fhirPresentableRender {
            mode: <center><b>mode==display|structure\n|narrative|debug\n|override</b>\n<em>[config]</em></center>
            renderX: <center><b>render[mode]()</b>\n<em>[hook]</em></center>
            renderError: <center>render Error</center>
            renderNothing: <center>render Nothing</center>
            mode --> renderX: <center>mode==display\n&& !input
            mode --> renderX: <center>mode==display\n&& input
            mode --> renderX
        }
    }

```

## FHIR Primitive

The FHIR [Primitive](src/components/primitive/primitive.ts) is the base key-value and key-input component in the
library. It is responsible to render label, value, error, and context on the screen.

```mermaid
---
title: Primitive Lifecycle

---

stateDiagram-v2
    state DOM {
        parentNode
        lre: Lit Reactive Element
        lre --> parentNode: dispatch(PrimitiveInvalidEvent)
        lre --> parentNode: dispatch(PrimitiveInputEvent)

        state lre {
            requestUp: requestUpdate()
            willUp: willUpdate()
            render: render()
            le: *
            [*] --> requestUp
            requestUp --> willUp
            willUp --> prim1
            path --> requestUp
            valid --> render
            render --> mustRender
            watched --> render: <center>no change
            mustRender --> le: no
            renderInput() --> le
            renderError() --> le
            renderValid() --> le
            handleChanged --> requestUp
            dispatch --> render
            prim1: prepare primitive

            state prim1 {
                path: hasValuePath()
                watched: hasAnyChanged(value, type, required)
                validate: validate()
                mustRender
                handleChanged: <center>handle\ninput change\nevent
                dispatch: dispatch event
                [*] --> handleChanged
                [*] --> watched
                [*] --> path
                watched --> validate: <center>value\n&& type
                watched --> error: <center>!value\n&& required
                watched --> error: <center>errormessage
                validate --> error
                validate --> valid
                handleChanged --> dispatch
                error --> dispatch
            }

            fhirPrimitive2: render primitive
            state fhirPrimitive2 {
                mustRender
                mustRender --> renderInput(): input
                mustRender --> renderError(): error
                mustRender --> renderValid(): valid
            }
        }
    }
```
