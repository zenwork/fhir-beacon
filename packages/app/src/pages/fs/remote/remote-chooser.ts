import {SignalWatcher}                              from '@lit-labs/signals'
import {SlDialog, SlInput}                          from '@shoelace-style/shoelace'
import {css, html, LitElement}                      from 'lit'
import {customElement, property, queryAsync, state} from 'lit/decorators.js'
import {FhirElementData}                            from '../../../../../library/src/internal'
import {BrowserState, FhirQuery}                    from '../state/browser-state'

import '@shoelace-style/shoelace/dist/components/button/button.js'
import '@shoelace-style/shoelace/dist/components/dialog/dialog.js'



@customElement('remote-chooser')
export class RemoteChooser extends SignalWatcher(LitElement) {

  static styles = [

    css`
      :host {
        width: 25rem;
      }

      sl-button::part(base) {
        display: inline-block;
      }

      sl-menu-item::part(base) {
        font-size: var(--sl-font-size-x-small);
        overflow-wrap: anywhere;
      }
    `
  ]

  @property({ attribute: false })
  declare state: BrowserState
  @queryAsync('sl-dialog')
  declare dialog: Promise<SlDialog>
  @state()
  private selectedType: string = ''
  @state()
  private page: number = 0

  @state()
  private newQuery: FhirQuery = { name: '', query: '', data: null }

  render() {
    const filteredQueries: FhirQuery[] = this.state.queries.get()
                                             .filter((f: any) => this.selectedType
                                                                 ? f.type === this.selectedType
                                                                 : true)
                                             .slice(this.page * 100, (this.page * 100) + 100)


    return html`
        <div style="display:flex; align-items:center">
            <sl-button-group>
                <sl-input value=${this.state.queryCollection.get()} @input=${(e: InputEvent) => {
                    // @ts-ignore
                    this.state.queryCollection.set(e.target?.value)
                    this.state.storeRemote().then(() => this.requestUpdate())
                }} @label="collection"
                >
                </sl-input>
                <sl-button ?disabled=${!this.state.queryCollection.get()}
                           @click=${() => this.dialog.then((d: SlDialog) => d.show())}
                >create
                </sl-button>
                <sl-button ?disabled=${!this.state.queryCollection.get()}
                           @click=${() => {
                               this.state.queries.set([])
                               this.state.storeRemote().then(() => this.requestUpdate())

                           }}
                >clear
                </sl-button>
            </sl-button-group>

        </div>
        <sl-menu @sl-select=${this.selectQuery}>
            ${filteredQueries ? filteredQueries.map(q => html`
                <sl-menu-item .value=${q} ?disabled=${this.state.selected.find(f => f.name === q.name)}>
                    ${q.name}
                </sl-menu-item>`) : ''}
        </sl-menu>

        <sl-dialog label="Query">
            <sl-input autofocus
                      placeholder="name"
                      required
                      value=${this.newQuery.name}
                      @input=${(e:InputEvent) => {
                          console.log(e)
                        return this.newQuery.name = (e.target as SlInput).value }}
            ></sl-input>
            <sl-input placeholder="query"
                      required
                      value=${this.newQuery.query}
                      @input=${(e:InputEvent) => this.newQuery.query = (e.target as SlInput).value}
            ></sl-input>
            <sl-button slot="footer"
                       variant="primary"
                       @click=${() => {
                           const values: FhirQuery[] = [
                               ...this.state.queries.get(),
                               this.newQuery
                           ]
                           this.state.queries.set(values)
                           this.state.storeRemote()
                               .then(() => this.newQuery = { name: '', query: '', data: null })
                               .then(() => this.dialog.then((d: SlDialog) => d.hide()))
                               
                       }}
            >Close
            </sl-button>
        </sl-dialog>

    `
  }

  public connectedCallback(): void {
    super.connectedCallback()
    this.state.loading.set(true)
    this.state.restoreRemote()
        .then(() => this.state.loading.set(false))
        .then(() => this.requestUpdate())
  }


  private async selectQuery(e: CustomEvent) {
    const query = e.detail.item.value as FhirQuery
    this.state.selected.push({ name:query.name,type:'unknown',isMetaData:false, data: this.execute(query) })
    this.requestUpdate('state')
  }

  private execute(query: FhirQuery): Promise<FhirElementData> {
    console.log('querying:',query.query)
    return Promise.resolve({id:`ID::NULLOBJECT+${query.name}`})
  }




}


/**
 * Extracts the value of a specific key from a JSON string without parsing.
 * @param key - The key whose value needs to be extracted.
 * @param jsonText - The JSON as plain text.
 * @returns The value as a string, or null if the key is not found.
 */
// export function getValueFromJsonKey(key: string, jsonText: string): string | null {
//   // Create a regex to match the key and its value
//   const regExp = new RegExp(`"${key}"\\s*:\\s*"(.*?)"`)
//   const match = jsonText.match(regExp)
//   return match ? match[1] : null // Return the captured value or null if no match
// }
