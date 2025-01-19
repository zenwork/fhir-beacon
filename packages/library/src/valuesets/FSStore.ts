import {mkdir, writeFile}               from 'node:fs/promises'
import {join}                           from 'node:path'
import {ValueSetChoices, ValueSetStore} from './ValueSet.data'



export class FSStore implements ValueSetStore {

  #target: string
  #folder: string
  #created: Promise<string | undefined>

  constructor(target: string) {
    this.#target = target

    this.#folder = join(target, 'valuesets')
    this.#created = mkdir(this.#folder, { recursive: true })

  }

  write(valueSet: ValueSetChoices): Promise<void> {
    return this.#created
               .then(() => {
                 try {

                   const controller = new AbortController()
                   const { signal } = controller

                   const encoder = new TextEncoder() // Built-in API for text encoding
                   const uint8Array = encoder.encode(JSON.stringify(valueSet, null, 2))

                   const promise = writeFile(`${this.#folder}/${valueSet.id}.json`, uint8Array, { signal })

                   setTimeout(controller.abort, 5000)

                   return promise


                 } catch (err) {
                   console.error(err)
                   return Promise.reject(err)
                 }
               })
  }


}
