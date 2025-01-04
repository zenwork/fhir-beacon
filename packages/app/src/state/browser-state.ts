import {Signal}                         from '@lit-labs/signals'
import {FileWithDirectoryAndFileHandle} from 'browser-fs-access'
import {FhirElementData}                from 'fhir-beacon/src/internal'
import {IDBPDatabase}                   from 'idb'

import {
  FileSystemDirectoryHandle,
  FileSystemDirectoryHandle as PonyfillDirectoryHandle,
  FileSystemFileHandle,
  getOriginPrivateDirectory,
  showDirectoryPicker
} from 'native-file-system-adapter'

import {SignalArray}              from 'signal-utils/array'
import {drop, getDB, read, store} from '../indexeddb'
import {getValueFromJsonKey}      from '../pages/util'



export {FileSystemDirectoryHandle as PonyfillDirectoryHandle} from 'native-file-system-adapter'
export {FileSystemFileHandle as PonyfillFileHandle}           from 'native-file-system-adapter'


export type FhirData = {
  name: string,
  type: string | null,
  isMetaData: boolean,
  data: Promise<FhirElementData>
}

export type FhirQuery = {
  name: string,
  query: string,
  data: FhirData|null
}

export type FhirFile = {
  name: string,
  type: string | null,
  isMetaData:boolean,
  data: FileWithDirectoryAndFileHandle
}

export type FhirFiles = FhirFile[]

export class BrowserState {

  public types = new Signal.State<string[]>([])
  public preferredTypes = new Signal.State<string[]>([])
  public selected: SignalArray<FhirData> = new SignalArray<FhirData>([])
  // local file-access state
  public dir = new Signal.State<FileSystemDirectoryHandle | PonyfillDirectoryHandle | null>(null)
  public files = new Signal.State<FhirFiles>([])

  // remote server-access state
  public collections = new Signal.State<string[]>([])
  public currentCollectionName = new Signal.State<string | null>(null)
  public currentCollection = new Signal.State<FhirQuery[]>([])

  public loading = new Signal.State<boolean>(false)

  async store() {
    const handle: FileSystemDirectoryHandle | PonyfillDirectoryHandle | null = this.dir.get()
    if (handle) {
      await store('dirHandle', handle, await this.getDb(), 'handles')
    }

  }

  async restoreLocal() {
    try {
      const handle = await read<FileSystemDirectoryHandle>('dirHandle', await this.getDb(), 'handles')
      if (handle) {
        this.dir.set(handle)
        if (await this.verifyPermission(handle)) {
          await this.compute()
        }
      }
    } catch (error) {
      console.error('Failed to restore directory handle:', error)
    }

  }


  async storeRemote() {
    if (!this.collections.get().find(c => c === this.currentCollectionName.get())) {
      this.collections.set([...this.collections.get(), this.currentCollectionName.get()!])
    }

    const collections: string[] = this.collections.get()
    await store('remoteCollections', collections, await this.getDb(), 'handles')

    const handle: string | null = this.currentCollectionName.get()
    const queries: FhirQuery[] = this.currentCollection.get()
    if (handle) {
      await store('remoteHandle', handle, await this.getDb(), 'handles')
      await store('remote-' + handle, queries, await this.getDb(), 'handles')
    }
  }

  async restoreRemote() {
    try {
      const collections = await read<string[]>('remoteCollections', await this.getDb(), 'handles')
      const handle = await read<string>('remoteHandle', await this.getDb(), 'handles')
      const queries = await read<FhirQuery[]>('remote-' + handle, await this.getDb(), 'handles')
      if (collections) {
        this.collections.set(collections)
      }
      if (queries) {
        this.currentCollectionName.set(handle)
        this.currentCollection.set(queries)
      }
    } catch (error) {
      console.error('Failed to restore remote handle:', error)
    }
  }


  async clear() {
    await drop(await this.getDb(), 'handles')
    console.log(`Cleared storage`)
  }

  async compute() {
    const handle: any = this.dir.get()
    const promises: Promise<FhirFile>[] = []

    if (handle) {
      if (!isPonyfill(handle)) {
        // On desktop chrome
        for await (const entry of handle.values() as AsyncIterable<FileSystemFileHandle>) {
          promises
            .push(entry
                    .getFile()
                    .then(async (f) => ({
                      name: f.name,
                      //TODO: very expensive. find some other way
                      type: getValueFromJsonKey('resourceType', await f.text()),
                      isMetaData: f.name.indexOf('example') === -1,
                      data: f
                    })))

        }
      } else {
        // other browsers
        for await (const entry of handle.entries()) {
          const h: PonyfillDirectoryHandle | FileSystemHandle = entry[1]
          if (isFileHandle(h)) {

            h.getFile()
             .then(async (f) => ({
               name: f.name,
               //TODO: very expensive. find some other way
               type: getValueFromJsonKey('resourceType', await f.text()),
               isMetaData: f.name.indexOf('example') === -1,
               data: f
             }))
          }
        }
      }


      this.files.set(
        (await Promise.all(promises))
          .sort((a, b) => {
                  if (!a.type && !b.type) return 0
                  if (!a.type) return 1
                  if (!b.type) return -1
                  return a.type.localeCompare(b.type)
                }
          )
      )

      const uniqueTypes: Set<string> = new Set(
        this.files.get()
            .map(b => b.type)
            .filter(t => t !== null)
            .sort()
      )

      this.types.set(Array.from(uniqueTypes))
      this.preferredTypes.set(this.types.get().filter(t => t
                                                           === 'Medication'
                                                           || t
                                                           === 'Patient'
                                                           || t
                                                           === 'Appointment'
                                                           || t
                                                           === 'Slot'))

      return this.store()

    }


  }

  async computeRemote() {
    if (this.currentCollectionName.get()) {
      const collection: string = this.currentCollectionName.get()!
      const collections = await read<string[]>('remoteCollections', await this.getDb(), 'handles')
      if (collections) {
        this.collections.set(Array.from(new Set([...collections,collection])))
      }

      const queries = await read<FhirQuery[]>('remote-' + collection, await this.getDb(), 'handles')
      if (queries) {
        this.currentCollection.set(queries)
      }

      console.log(`Restored remote state:`,this.currentCollectionName.get(),this.currentCollection.get())

    }


  }


  async verifyPermission(handle: FileSystemHandle): Promise<boolean> {
    // Check for existing permissions
    // @ts-ignore
    const permission = await handle.queryPermission()
    if (permission === 'granted') {
      return true
    }
    // Request permission if not already granted
    if (permission === 'prompt') {
      // @ts-ignore
      const newPermission = await handle.requestPermission()
      return newPermission === 'granted'
    }
    return false // Permission denied
  }

  private async getDb(): Promise<IDBPDatabase> {
    return await getDB('fileHandlesDB', 'handles')
  }


}


function isPonyfill(handle: FileSystemDirectoryHandle | PonyfillDirectoryHandle): handle is PonyfillDirectoryHandle {
  return handle instanceof PonyfillDirectoryHandle
}

function isFileHandle(handle: FileSystemFileHandle | any): handle is FileSystemFileHandle {
  return (handle as FileSystemFileHandle).kind === 'file'
}
/**
 * Prompts the user to pick a directory and loads its files into an IndexedDB-backed directory.
 */
export async function promptAndLoadDirectoryIntoIndexedDB(): Promise<FileSystemDirectoryHandle> {
  try {
    // Prompt the user to pick a directory
    const dirHandle = await showDirectoryPicker()

    if (!dirHandle) {
      console.log('No directory selected.')
      throw new Error('No directory selected.')
    }

    // Get the IndexedDB-backed root directory
    const indexedDBRoot = await getOriginPrivateDirectory()

    // Load the selected directory contents into the IndexedDB directory
    for await (const [name, handle] of dirHandle.entries()) {
      if (handle instanceof FileSystemFileHandle) {
        // If it's a file, read it and save it in IndexedDB
        const file = await handle.getFile()
        const indexedDBFileHandle = await indexedDBRoot.getFileHandle(file.name, { create: true })
        const writable = await indexedDBFileHandle.createWritable()
        await writable.write(file)
        await writable.close()
      } else if (handle instanceof FileSystemDirectoryHandle) {
        // If it's a subdirectory, recursively handle it
        const subDirHandle = await indexedDBRoot.getDirectoryHandle(name, { create: true })
        await loadFilesIntoIndexedDBRecursive(handle, subDirHandle)
      }
    }

    console.log('Directory successfully loaded into IndexedDB.')
    return indexedDBRoot
  } catch (error) {
    console.error('Error during directory selection or loading:', error)
    throw new Error('Error during directory selection or loading.', { cause: error })
  }
}
/**
 * Helper function to recursively traverse a directory and add subdirectories/files into IndexedDB.
 * @param sourceDir - The source directory handle from the filesystem.
 * @param targetDir - The target IndexedDB-based directory handle.
 */
export async function loadFilesIntoIndexedDBRecursive(
  sourceDir: FileSystemDirectoryHandle,
  targetDir: FileSystemDirectoryHandle
): Promise<void> {
  for await (const [name, handle] of sourceDir.entries()) {
    if (handle instanceof FileSystemFileHandle) {
      // If it's a file, read it and save it in IndexedDB
      const file = await handle.getFile()
      const targetFileHandle = await targetDir.getFileHandle(file.name, { create: true })
      const writable = await targetFileHandle.createWritable()
      await writable.write(file)
      await writable.close()
      console.log(`File "${file.name}" written to IndexedDB.`)
    } else if (handle instanceof FileSystemDirectoryHandle) {
      // If it's a subdirectory, create it and recurse
      const subTargetDir = await targetDir.getDirectoryHandle(name, { create: true })
      await loadFilesIntoIndexedDBRecursive(handle, subTargetDir)
    }
  }
}
