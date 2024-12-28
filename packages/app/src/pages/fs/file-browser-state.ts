import {Signal}                         from '@lit-labs/signals'
import {FileWithDirectoryAndFileHandle} from 'browser-fs-access'



export type FhirFile = {
  file: string,
  type: string | null,
  isMetaData:boolean,
  blob: FileWithDirectoryAndFileHandle
}
export type FhirFiles = FhirFile[]

export interface FSState {
  dir: Signal.State<FileSystemDirectoryHandle | null>
  files: Signal.State<FhirFiles>
  types: Signal.State<string[]>
  selected: Signal.State<FhirFile | null>
}

export class FileBrowserState implements FSState {
  public dir = new Signal.State<FileSystemDirectoryHandle | null>(null)
  public files = new Signal.State<FhirFiles>([])
  public types = new Signal.State<string[]>([])
  public selected = new Signal.State<FhirFile | null>(null)
}
