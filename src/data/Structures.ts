import {Code} from './Primitives'

export type BaseElementData = {
  id?: string | undefined,
  extension?: any[] | undefined
}

export type CodingData = BaseElementData & {
  system?: URL | undefined,
  version?: string | undefined,
  code?: Code | undefined,
  display?: string,
  userSelected?: boolean | undefined
}
