import {SignalWatcher}                              from '@lit-labs/signals'
import {SlDialog, SlInput, SlMenuItem}              from '@shoelace-style/shoelace'
import {css, html, LitElement, TemplateResult}      from 'lit'
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

  @queryAsync('#add')
  declare addDialog: Promise<SlDialog>

  @queryAsync('#save')
  declare saveDialog: Promise<SlDialog>

  @state()
  private selectedType: string = ''

  @state()
  private page: number = 0

  @state()
  private newQuery: FhirQuery = { name: '', query: '', data: null }

  @state()
  private newCollectionName = ''

  public connectedCallback(): void {
    super.connectedCallback()
    this.state.loading.set(true)
    this.state.restoreRemote()
        .then(() => this.state.loading.set(false))
        .then(() => this.requestUpdate())
  }

  public render() {
    const filteredQueries: FhirQuery[] = this.state.currentCollection.get()
                                             .filter((f: any) => this.selectedType
                                                                 ? f.type === this.selectedType
                                                                 : true)
                                             .slice(this.page * 100, (this.page * 100) + 100)

    return html`
        <div style="display:flex; align-items:center">
            <sl-button-group>
                <sl-dropdown>
                    <sl-button slot="trigger" caret variant="text">collections</sl-button>
                    <sl-menu @sl-select=${(e: CustomEvent) => {
                        const collectionName: string | null = (e.detail.item as SlMenuItem).value

                        if (!collectionName) {
                            this.state.currentCollectionName.set(null)
                            this.state.currentCollection.set([])
                        } else {
                            this.state.currentCollectionName.set(collectionName)
                            this.state.computeRemote()
                                .then(() => this.requestUpdate())
                        }
                    }}
                    >
                        <sl-menu-item value=${null}>
                            <sl-icon slot="prefix" name="collection-fill"></sl-icon>
                            new
                        </sl-menu-item>
                        ${this.state.collections.get()
                              .map(c => html`
                                  <sl-menu-item value=${c}>${c}</sl-menu-item>`)}
                    </sl-menu>
                </sl-dropdown>
                <sl-input
                        value=${this.state.currentCollectionName.get()}
                        @input=${(e: InputEvent) => {
                            this.newCollectionName = (e.target as SlInput)!.value

                        }}
                        ?readonly=${!!this.state.currentCollectionName.get()}
                        style="width:8rem;"
                >
                </sl-input>
                <sl-icon-button
                        name="send-arrow-up-fill"
                        ?disabled=${!this.state.currentCollectionName.get()}
                        @click=${() => this.addDialog.then((d: SlDialog) => d.show())}
                >
                </sl-icon-button>
                <sl-icon-button
                        name="floppy-fill"
                        ?disabled=${!this.state.currentCollectionName.get() && !this.newCollectionName}
                        @click=${() => this.saveDialog.then((d) => {
                            this.state.currentCollectionName.set(this.newCollectionName)
                            return d.show()
                        })}
                ></sl-icon-button>
                <sl-tooltip content="remove all queries from collection">

                    <sl-icon-button
                            name="x-octagon-fill"
                            ?disabled=${!this.state.currentCollectionName.get()}
                            @click=${() => {
                                this.state.currentCollection.set([])
                                this.state.storeRemote().then(() => this.requestUpdate())

                            }}
                    >
                    </sl-icon-button>
                </sl-tooltip>
            </sl-button-group>

        </div>
        <sl-menu @sl-select=${this.selectQuery}>
            ${filteredQueries ? filteredQueries.map(q => html`
                <sl-menu-item .value=${q} ?disabled=${this.state.selected.find(f => f.name === q.name)}>
                    ${q.name}
                </sl-menu-item>`) : ''}
        </sl-menu>

        ${(this.addQueryDialog())}
        ${(this.saveCollectionDialog())}

    `
  }

  private saveCollectionDialog(): TemplateResult<1> {
    return html`
        <sl-dialog id="save" label="Save">
            Do you want to save the '${this.state.currentCollectionName.get()}' collection?
            <sl-button slot="footer" variant="primary" @click=${() => {
                this.saveDialog.then((d) => d.hide())
            }}
            >Don't Save
            </sl-button>
            <sl-button slot="footer" variant="primary" @click=${() => {

                this.state.storeRemote()
                    .then(() => this.saveDialog)
                    .then((d) => d.hide())
                    .then(() => this.requestUpdate())
            }}
            >Save
            </sl-button>
        </sl-dialog>
    `
  }

  private addQueryDialog(): TemplateResult {
    const setName = (e: InputEvent) => this.newQuery.name = (e.target as SlInput).value
    const setQuery = (e: InputEvent) => this.newQuery.query = (e.target as SlInput).value
    const addQuery = () => {
      const values: FhirQuery[] = [
        ...this.state.currentCollection.get(),
        this.newQuery
      ]
      this.state.currentCollection.set(values)
      this.state.storeRemote()
          .then(() => this.newQuery = { name: '', query: '', data: null })
          .then(() => this.addDialog.then((d: SlDialog) => d.hide()))
    }

    return html`
        <sl-dialog id="add" label="Query">
            <sl-input autofocus
                      placeholder="name"
                      required
                      value=${this.newQuery.name}
                      @input=${setName}
            ></sl-input>
            <sl-input placeholder="query"
                      required
                      value=${this.newQuery.query}
                      @input=${setQuery}
            ></sl-input>
            <sl-button slot="footer" variant="primary" @click=${addQuery}>Close</sl-button>
        </sl-dialog>
    `
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
