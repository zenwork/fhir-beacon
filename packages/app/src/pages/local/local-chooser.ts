import {SignalWatcher}                                                          from '@lit-labs/signals'
import {SlMenuItem}                                                             from '@shoelace-style/shoelace'
import {css, html, LitElement, nothing}                                         from 'lit'
import {customElement, property, state}                                         from 'lit/decorators.js'
import {showDirectoryPicker}                                                    from 'native-file-system-adapter'

import '@shoelace-style/shoelace/dist/components/button/button.js'
import '@shoelace-style/shoelace/dist/components/spinner/spinner.js'
import {BrowserState, FhirFile, FhirFiles, promptAndLoadDirectoryIntoIndexedDB} from '../../state/browser-state'
import {isFileSystemAPISupported}                                               from '../util'



@customElement('local-chooser')
export class LocalChooser extends SignalWatcher(LitElement) {

  static styles = [

    css`
      :host {
        width: 100%;
      }

      sl-button::part(base) {
        display: inline-block;
      }

      sl-menu {
        width: 96%
      }
      
      sl-menu-item::part(base) {
        
        font-size: var(--sl-font-size-x-small);
        overflow-wrap: anywhere;
      }
    `
  ]

  @property({ attribute: false })
  declare state: BrowserState

  @state()
  private selectedType: string = ''

  @state()
  private page: number = 0

  render() {
    const filteredFiles: FhirFiles = this.state.files.get()
                                         .filter((f: any) => this.selectedType ? f.type === this.selectedType : true)
                                         .slice(this.page * 100, (this.page * 100) + 100)
    const fileTotal: number = this.selectedType ? filteredFiles.length : this.state.files.get().length
    const maxPages: number = Math.ceil(fileTotal / 100)
    const prefTypes: string[] = this.state.preferredTypes.get()
    const types: string[] = this.state.types.get()

    return html`
        <div style="display:flex; align-items:center">
            <sl-button-group>
                <sl-button @click=${this.openDir} variant="text" style="min-width:6rem;">
                    ${fileTotal ? fileTotal : 'Select Dir'}
                </sl-button>
                <sl-dropdown>
                    <sl-button slot="trigger" caret variant="text">
                        <div>${this.selectedType || 'Select Type'}</div>
                    </sl-button>
                    <sl-menu @sl-select=${this.selectType}>
                        <sl-menu-item value=${null}>ALL</sl-menu-item>
                        <sl-divider></sl-divider>
                        <sl-menu-label >Beacon-Rendered</sl-menu-label>
                        ${prefTypes.map(t => html`
                            <sl-menu-item value=${t}>${t}</sl-menu-item>`)}
                        ${prefTypes.length > 0 ? html`
                            <sl-divider></sl-divider>` : nothing}
                        <sl-menu-label >JSON only</sl-menu-label>
                        ${types.map(t => html`
                            <sl-menu-item value=${t}>${t}</sl-menu-item>`)}
                    </sl-menu>
                </sl-dropdown>
                <sl-button @click=${this.previous}
                           variant="text"
                           ?disabled=${this.page === 0 || maxPages === 0}
                >Prev
                </sl-button>
                <sl-button @click=${this.next}
                           variant="text"
                           ?disabled=${this.page === (maxPages - 1) || maxPages === 0}
                >Next
                </sl-button>
                ${this.isLoading()
                  ? html`
                            <sl-button loading variant="text" style="width:3rem;"></sl-button>`
                  : html`
                            <sl-button variant="text" disabled style="width:3rem">${this.page + 1}/${maxPages}
                            </sl-button>`
                }
            </sl-button-group>

        </div>
        <sl-menu @sl-select=${this.selectFile}>
            ${filteredFiles ? filteredFiles.map(b => html`
                <sl-menu-item .value=${b} ?disabled=${this.state.selected.find(f => f.name === b.name)}>
                    ${b.name}
                </sl-menu-item>`) : ''}
        </sl-menu>

    `
  }

  public connectedCallback(): void {
    super.connectedCallback()
    this.state.loading.set(true)
    this.state.restoreLocal()
        .then(() => this.state.loading.set(false))
        .then(() => this.requestUpdate())
  }

  private selectType(e: CustomEvent) {
    this.selectedType = (e.detail.item as SlMenuItem).value
    this.page = 0
  }

  private async selectFile(e: CustomEvent) {
    const blob = e.detail.item.value as FhirFile
    this.state.selected.push({ ...blob, data: this.toJson(blob) })
    this.requestUpdate('state')
  }

  private async toJson(file: FhirFile): Promise<any> {
    return file.data.text().then(text => JSON.parse(text))
  }

  private isLoading(): boolean {
    return this.state.loading.get()
  }

  private previous() {
    if (this.page != 0) this.page--
  }

  private next() {
    if (this.state.files.get().length > (this.page + 1) * 100) this.page++
  }

  private async openDir() {
    this.state.loading.set(true)

    if (isFileSystemAPISupported()) {
      this.state.dir.set(await showDirectoryPicker())
    } else {
      this.state.dir.set(await promptAndLoadDirectoryIntoIndexedDB())
    }

    this.state.compute()
        .then(() => this.state.loading.set(false))
        .then(() => this.requestUpdate())


  }


}
