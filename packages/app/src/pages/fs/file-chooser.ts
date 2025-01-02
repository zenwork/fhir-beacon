import {SlMenuItem}                     from '@shoelace-style/shoelace'
import {css, html, LitElement, nothing} from 'lit'
import {customElement, property, state} from 'lit/decorators.js'
import '@shoelace-style/shoelace/dist/components/button/button.js'
import {FhirFiles, FileBrowserState}    from './state/file-browser-state'
import '@shoelace-style/shoelace/dist/components/spinner/spinner.js'



@customElement('file-chooser')
export class FileChooser extends LitElement {

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
  declare state: FileBrowserState

  @state()
  private selectedType: string = ''

  @state()
  private page:number = 0

  render() {
    const filteredFiles: FhirFiles = this.state.files.get()
                                         .filter((f: any) => this.selectedType ? f.type === this.selectedType : true)
                                         .slice(this.page*100,(this.page*100)+100)
    const fileTotal: number = this.selectedType ? filteredFiles.length : this.state.files.get().length
    const maxPages: number = Math.ceil(fileTotal / 100)
    const prefTypes: string[] = this.state.preferredTypes.get()
    const types: string[] = this.state.types.get()

    return html`
        <div style="display:flex; align-items:center">
            <sl-button-group>
                <sl-button @click=${this.openDir} variant="text" style="min-width:6rem;"> ${fileTotal?fileTotal:'Select Dir'}</sl-button>
                <sl-dropdown>
                    <sl-button slot="trigger" caret variant="text">
                        <div>${this.selectedType || 'Select Type'}</div>
                    </sl-button>
                    <sl-menu @sl-select=${this.selectType}>
                        <sl-menu-item value=${null}>ALL</sl-menu-item>
                        ${prefTypes.map(t => html`
                            <sl-menu-item value=${t}>${t}</sl-menu-item>`)}
                        ${prefTypes.length > 0 ? html`
                            <sl-divider></sl-divider>` : nothing}
                        ${types.map(t => html`
                            <sl-menu-item value=${t}>${t}</sl-menu-item>`)}
                    </sl-menu>
                </sl-dropdown>
                <sl-button @click=${this.previous} 
                           variant="text" 
                           ?disabled=${this.page === 0 || maxPages === 0}>Prev
                </sl-button>
                <sl-button @click=${this.next}
                           variant="text"
                           ?disabled=${this.page === (maxPages - 1) || maxPages === 0}>Next
                </sl-button>
                ${this.isLoading()
                  ? html`
                            <sl-button loading variant="text" style="width:3rem;"></sl-button>`
                  : html`
                            <sl-button variant="text" disabled style="width:3rem" >${this.page + 1}/${maxPages}</sl-button>`
                }
            </sl-button-group>

        </div>
        <sl-menu @sl-select=${this.selectFile}>
            ${filteredFiles ? filteredFiles.map(b => html`
                <sl-menu-item .value=${b}>${b.file}</sl-menu-item>`) : ''}
        </sl-menu>

    `
  }

  private selectType(e: CustomEvent) {
    this.state.selected.set(null)
    this.selectedType = (e.detail.item as SlMenuItem).value
    this.page = 0
  }

  private async selectFile(e: CustomEvent) {
    const blob: any = (e.detail.item as SlMenuItem).value
    this.state.selected.set(blob)
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

  public connectedCallback(): void {
    super.connectedCallback()
    this.state.loading.set(true)
    this.state.restore()
        .then(() => this.state.loading.set(false))
        .then(() => this.requestUpdate())
  }

  private openDir() {
    this.state.loading.set(true)
    // @ts-ignore
    showDirectoryPicker()
      .then((handle: FileSystemDirectoryHandle | null) => {
        this.state.dir.set(handle)
        this.state.compute()
            .then(() => this.state.loading.set(false))
            .then(() => this.requestUpdate())
      })
  }


}



/**
 * Extracts the value of a specific key from a JSON string without parsing.
 * @param key - The key whose value needs to be extracted.
 * @param jsonText - The JSON as plain text.
 * @returns The value as a string, or null if the key is not found.
 */
export function getValueFromJsonKey(key: string, jsonText: string): string | null {
  // Create a regex to match the key and its value
  const regExp = new RegExp(`"${key}"\\s*:\\s*"(.*?)"`)
  const match = jsonText.match(regExp)
  return match ? match[1] : null // Return the captured value or null if no match
}
