import {Signal}                         from '@lit-labs/signals'
import {FileWithDirectoryAndFileHandle} from 'browser-fs-access'
import {IDBPDatabase}                   from 'idb'

import {SignalArray}               from 'signal-utils/array'
import {FhirElementData}           from '../../../../../library/src/internal'
import {getValueFromJsonKey}       from '../local/local-chooser'
import {clear, getDB, read, store} from './browser-store'



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
  public dir = new Signal.State<FileSystemDirectoryHandle | null>(null)
  public files = new Signal.State<FhirFiles>([])

  // remote server-access state
  public queryCollection = new Signal.State<string | null>(null)
  public queries = new Signal.State<FhirQuery[]>([])

  public loading = new Signal.State<boolean>(false)

  async store() {
    const handle: FileSystemDirectoryHandle | null = this.dir.get()
    if (handle) {
      await store('dirHandle', handle, await this.getDb(), 'handles')
    }

  }

  async storeRemote() {
    const handle: string | null = this.queryCollection.get()
    const queries: FhirQuery[] = this.queries.get()
    if (handle) {
      await store('remoteHandle', handle, await this.getDb(), 'handles')
      await store('remote-' + handle, queries, await this.getDb(), 'handles')
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

  async restoreRemote() {
    try {
      const handle = await read<string>('remoteHandle', await this.getDb(), 'handles')
      const queries = await read<FhirQuery[]>('remote-' + handle, await this.getDb(), 'handles')
      if (queries) {
        this.queryCollection.set(handle)
        this.queries.set(queries)
      }
    } catch (error) {
      console.error('Failed to restore remote handle:', error)
    }
  }


  async clear() {
    await clear(await this.getDb(), 'handles')
    console.log(`Cleared storage`)
  }

  async compute() {
    if (this.dir.get()) {
      const dir: FileSystemDirectoryHandle = this.dir.get()!

      const promises: Promise<FhirFile>[] = []

      // @ts-ignore
      for await (const entry of dir.values() as AsyncIterable<FileSystemFileHandle>) {

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
                                                           === 'Appointment'))

      return this.store()

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
