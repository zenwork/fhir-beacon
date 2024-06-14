import {FhirDataContext} from '../../../src/internal/contexts/FhirContextData'

type Context<KeyType, ValueType> = KeyType & { __context__: ValueType };

function createContext<ValueType, K = unknown>(key: K) {
  return key as Context<K, ValueType>
}

class ContextRequestEvent<T> extends Event {
  context: Context<any, T>
  callback: (v: T) => void
  subscribe: boolean

  constructor(context: Context<any, T>, callback: (v: T) => void, subscribe: boolean) {
    super('context-request', { bubbles: true, composed: true })
    this.context = context
    this.callback = callback
    this.subscribe = subscribe
  }
}

const myContext = createContext<FhirDataContext>('data-context')

// define consumer
class MyCustomElement extends HTMLElement {
  declare value: string

  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    this.render()
    setTimeout(() => {
      console.log('dispatching')
      this.dispatchEvent(
        // TODO: this is not working and I am not sure why
        new ContextRequestEvent<FhirDataContext>(
          myContext,
          (ctx) => {
            console.log(ctx)
            this.value = ctx.getAt('$.id')

            this.render()
          },
          true
        )
      )
    }, 2000)
  }

  render() {
    this.shadowRoot!.innerHTML = `<p>value: ${this.value ?? 'unable to resolve path'}</p>`
  }
}

customElements.define('custom-element', MyCustomElement)
