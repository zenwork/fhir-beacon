import {FileSystemHandle}     from 'browser-fs-access'
import {openDB}               from 'idb'
import {html, LitElement}     from 'lit'
import {customElement, state} from 'lit/decorators.js'



@customElement('app-dir-storage')
export class DirectoryPersist extends LitElement {
  @state() declare directoryHandle: FileSystemDirectoryHandle | null;
  @state() declare filesInDirectory: string[];

  constructor() {
    super();
    this.directoryHandle = null;
    this.filesInDirectory = [];
  }


  public connectedCallback(): void {
    super.connectedCallback();
    this.restoreDirectoryHandle()
  }
  async selectDirectory() {
    try {
      // @ts-ignore
      this.directoryHandle = await showDirectoryPicker();

      // Save directory handle to IndexedDB
      if (this.directoryHandle) {
        // @ts-ignore
        await this.saveHandle('dirHandle', this.directoryHandle);
        console.log(`Directory handle saved: ${this.directoryHandle.name}`);
        await this.readDirectory();
      }
    } catch (error) {
      console.error('Error selecting directory:', error);
    }
  }

  async readDirectory() {
    if (!this.directoryHandle) return;
    const files: string[] = [];

    // @ts-ignore
    for await (const entry of this.directoryHandle.values()) {
      files.push(entry.name); // Add file/directory names to the list
    }

    this.filesInDirectory = files;
  }

  async restoreDirectoryHandle() {
    try {
      this.directoryHandle = await this.getHandle('dirHandle');

      if (this.directoryHandle) {
        console.log('Restored directory handle:', this.directoryHandle.name);
        // @ts-ignore
        const permission = await this.verifyPermission(this.directoryHandle);
        if (permission) {
          console.log('Permission granted. Reading directory contents...');
          await this.readDirectory();
        } else {
          console.warn('Permission not granted. User interaction required.');
        }
      }
    } catch (error) {
      console.error('Failed to restore directory handle:', error);
    }
  }

  async saveHandle(key: string, handle: FileSystemHandle) {
    const db = await this.openDB();
    const tx = db.transaction('handles', 'readwrite');
    const store = tx.objectStore('handles');
    await store.put(handle, key);
    await tx.done;
    console.log(`Saved handle for key: ${key}`);
  }

  async getHandle(key: string): Promise<FileSystemDirectoryHandle | null> {
    const db = await this.openDB();
    const tx = db.transaction('handles', 'readonly');
    const store = tx.objectStore('handles');
    const handle = await store.get(key);
    await tx.done;
    return handle;
  }

  async openDB() {
    // Open an IndexedDB database
    const db = await openDB('fileHandlesDB', 1, {
      upgrade(db) {
        db.createObjectStore('handles'); // Object store for file/directory handles
      },
    });
    return db;
  }

  async verifyPermission(handle: FileSystemHandle): Promise<boolean> {
    // Check for existing permissions
    // @ts-ignore
    const permission = await handle.queryPermission();
    if (permission === 'granted') {
      return true;
    }
    // Request permission if not already granted
    if (permission === 'prompt') {
      // @ts-ignore
      const newPermission = await handle.requestPermission();
      return newPermission === 'granted';
    }
    return false; // Permission denied
  }

  render() {

    return html`
        <wa-button @click=${this.selectDirectory}>Directory: ${this.directoryHandle?.name}</wa-button>
        <wa-button @click=${this.restoreDirectoryHandle}>Restore Directory</wa-button>
        <ul>
            ${this.filesInDirectory.map(file => html`<li>${file}</li>`)}
        </ul>
    `;
  }
}
