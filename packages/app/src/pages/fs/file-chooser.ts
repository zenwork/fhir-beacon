import {SlMenuItem}                                    from '@shoelace-style/shoelace'
import {directoryOpen, FileWithDirectoryAndFileHandle} from 'browser-fs-access'
import {css, html, LitElement, nothing}                from 'lit'
import {customElement, property, state}                from 'lit/decorators.js'
import '@shoelace-style/shoelace/dist/components/button/button.js'
import '@shoelace-style/shoelace/dist/components/spinner/spinner.js'
import {FhirFiles, FileBrowserState}                   from './file-browser-state'



@customElement('file-chooser')
export class FileChooser extends LitElement {

  static styles = [
    css`
      sl-button::part(base) {
        display: inline-block;
      }

      sl-menu-item::part(base) {
        font-size: var(--sl-font-size-x-small);
      }
    `
  ]

  @property({ attribute: false, type: FileBrowserState })
  declare state: FileBrowserState

  @state()
  declare data: any
  declare name: string


  @state()
  private type: string = ''

  @state()
  private types: string[] = []

  @state()
  private preferredTypes: string[] = []
  @state()
  private openning: boolean = false

  render() {
    const examples: FhirFiles = this.state.files.get()
                                    .filter((b: any) => this.type ? b.type === this.type : true)
              .sort((a, b) => {
                if (!a.type && !b.type) return 0
                if (!a.type) return 1
                if (!b.type) return -1
                return a.type.localeCompare(b.type)
              })


    return html`

        ${this.openning ? html`
            <sl-spinner></sl-spinner>` : nothing}
        <sl-button @click=${this.openDir} variant="text">Dir (${this.state.files.get().length})</sl-button>
        <sl-dropdown>
            <sl-button slot="trigger" caret size="small">
                <div>Type: ${this.type}</div>
            </sl-button>
            <sl-menu @sl-select=${(e: CustomEvent) => {
                this.state.selected.set(null)
                this.type = (e.detail.item as SlMenuItem).value
            }}
            >
                <sl-menu-item value=${null} checked>ALL</sl-menu-item>
                ${this.preferredTypes.map(t => html`
                    <sl-menu-item value=${t}>${t}</sl-menu-item>`)}
                ${this.preferredTypes.length > 0 ? html`
                    <sl-divider></sl-divider>` : nothing}
                ${this.types.map(t => html`
                    <sl-menu-item value=${t}>${t}</sl-menu-item>`)}
            </sl-menu>
        </sl-dropdown>
        <sl-menu @sl-select=${async (e: CustomEvent) => {
            const blob: any = (e.detail.item as SlMenuItem).value
            if (!isDirectory(blob)) this.state.selected.set(blob)
        }}
        >
            ${examples ? examples.map(b => html`
                <sl-menu-item .value=${b}>${b.file}</sl-menu-item>`) : ''}
        </sl-menu>



    `
  }


  async openDir() {

    directoryOpen({ recursive: true })
      .then(blobs => {
        console.log('directory opened')
        this.openning = true
        this.requestUpdate()
        Promise.all(
          blobs
            .map((b: FileWithDirectoryAndFileHandle | FileSystemDirectoryHandle) => {
              if (!isDirectory(b)) {
                return b.text().then(t => ({
                  file: b.name,
                  type: getValueFromJsonKey('resourceType', t),
                  isMetaData: b.name.indexOf('example') === -1,
                  blob: b as FileWithDirectoryAndFileHandle
                }))
              }
              return null
            })
            .filter(b => b !== null)
        ).then(files => {

          this.state.files.set(files)

          const uniqueTypes: Set<string> = new Set(
            this.state.files.get()
                .map(b => b.type)
                .filter(t => t !== null)
                .sort()
          )

          this.types = Array.from(uniqueTypes)

          this.preferredTypes = this.types.filter(t => t === 'Medication' || t === 'Patient' || t === 'Appointment')

          this.openning = false
          this.requestUpdate()

        })
      })


  }


}


function isDirectory(handle: FileWithDirectoryAndFileHandle | FileSystemDirectoryHandle): handle is FileSystemDirectoryHandle {
  return (handle as FileSystemDirectoryHandle).kind === 'directory'
}

/**
 * Extracts the value of a specific key from a JSON string without parsing.
 * @param key - The key whose value needs to be extracted.
 * @param jsonText - The JSON as plain text.
 * @returns The value as a string, or null if the key is not found.
 */
function getValueFromJsonKey(key: string, jsonText: string): string | null {
  // Create a regex to match the key and its value
  const regExp = new RegExp(`"${key}"\\s*:\\s*"(.*?)"`)
  const match = jsonText.match(regExp)
  return match ? match[1] : null // Return the captured value or null if no match
}
