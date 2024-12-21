import {SlMenuItem}       from '@shoelace-style/shoelace'
import {
  directoryOpen,
  fileOpen,
  fileSave,
  FileWithDirectoryAndFileHandle,
  FileWithHandle,
  supported
}                         from 'browser-fs-access'
import {html, LitElement} from 'lit'
import {
  customElement,
  state
}                         from 'lit/decorators.js'
import '@shoelace-style/shoelace/dist/components/card/card.js'
import '@shoelace-style/shoelace/dist/components/button/button.js'
import {
  unsafeHTML
}                         from '../../../../../../../Library/Caches/deno/npm/registry.npmjs.org/lit-html/3.2.1/development/directives/unsafe-html'



@customElement('app-fs')
export class AppBook extends LitElement {
  @state()
  declare data: any
  declare name: string

  @state()
  private blobsInDirectory: {
    file: string,
    type: string | null,
    blob: FileWithDirectoryAndFileHandle | FileSystemDirectoryHandle
  }[] = []

  @state()
  private type: string = ''

  @state()
  private types: string[] = []

  render() {
    const examples: {
      file: string;
      type: string | null;
      blob: FileWithDirectoryAndFileHandle | FileSystemDirectoryHandle
    }[] = this.blobsInDirectory
              .filter((b: any) => b.type === this.type)
              .sort((a, b) => {
                if (!a.type && !b.type) return 0
                if (!a.type) return 1
                if (!b.type) return -1
                return a.type.localeCompare(b.type)
              })
    let resource = html``
    switch(this.type) {
      case 'Medication':
        resource= html`
            <fhir-medication .data=${this.data} showerror></fhir-medication>`
        break
      case 'Patient':
        resource= html`
            <fhir-patient .data=${this.data} showerror></fhir-patient>`
        break
      default:
        resource = html`
            <div>${unsafeHTML(this.data?.text?.div)}</div>
            <pre><code>${JSON.stringify(this.data, null, 2)}</code></pre>
            <!-- <fhir-medication .data=${this.data} input showerror></fhir-medication> -->
        `
    }

    return html`
        <main>
            File System
        </main>

        <sl-button @click=${this.openDir}>Open Dir (${this.blobsInDirectory.length})</sl-button>
        <sl-dropdown>
            <sl-button slot="trigger" caret>Type: ${this.type}</sl-button>
            <sl-menu @sl-select=${(e: CustomEvent) => {this.type = (e.detail.item as SlMenuItem).value}}>
                ${this.types.map(t => html`
                    <sl-menu-item value=${t}>${t}</sl-menu-item>`)}
            </sl-menu>
        </sl-dropdown>


        <sl-dropdown>
            <sl-button slot="trigger" caret>Examples (${examples.length})</sl-button>
            <sl-menu @sl-select=${async (e: CustomEvent) => {
                const blob: any = (e.detail.item as SlMenuItem).value
                if (!isDirectory(blob)) this.data = await blob.text().then((t: any) => JSON.parse(t))
            }}
            >
                ${examples ? examples.map(b => html`
                    <sl-menu-item .value=${b.blob}>${b.file}</sl-menu-item>`) : ''}
            </sl-menu>
        </sl-dropdown>

        ${resource}
    `
  }

  async open() {
    if (supported) {
      console.log('Using the File System Access API.')
    } else {
      console.log('Using the fallback implementation.')
    }
    this.data = await fileOpen({
                                 mimeTypes: ['application/json']
                               })
      .then((f: FileWithHandle) => {
        this.name = f.name
        return f.text()
      })
      .then(t => JSON.parse(t))
  }

  async openDir() {
    const blobs = await directoryOpen({
                                        recursive: true

                                      })

    this.blobsInDirectory
      = await Promise.all(blobs.map((b: FileWithDirectoryAndFileHandle | FileSystemDirectoryHandle) => {
      if (!isDirectory(b)) {
        return b.text().then(t => ({ file: b.name, type: getValueFromJsonKey('resourceType', t), blob: b }))

      }
      return { file: b.name, type: null, blob: b }
    }))

    this.types = Array.from(new Set(this.blobsInDirectory.filter(b => b.type !== null).map(b => b.type)))
                      .filter(t => t !== null)
                      .sort()

  }

  async save() {
    await fileSave(
      new Blob(
        [JSON.stringify(this.data, null, 2)],
        { type: 'application/json' }),
      {
        fileName: 'edited_' + this.name,
        extensions: ['.json'],
        excludeAcceptAllOption: true
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
