import {mkdir, rm, writeFile}   from 'node:fs/promises'
import {join}                   from 'node:path'
import {Choices, ValueSetStore} from '../ValueSet.data'



let errCount = 0

export class FSStore implements ValueSetStore {

  #created: Promise<string | undefined>
  #choices: string

  constructor(target: string) {

    this.#choices = join(target, 'choice')

    this.#created = rm(this.#choices, { recursive: true, force: true }).then(() => mkdir(this.#choices,
                                                                                         { recursive: true }))

  }

  write(choices: Choices): Promise<void> {
    return this.#created
               .then(() => {
                 try {

                   const controller = new AbortController()
                   const { signal } = controller

                   const encoder = new TextEncoder() // Built-in API for text encoding
                   const uint8Array = encoder.encode(JSON.stringify(choices, null, 2))
                   console.log('writing', choices.id, choices.type)
                   let promise: Promise<void>
                   switch (choices.type) {
                     case 'CodeSystem':
                       promise = writeFile(`${this.#choices}/cs-${choices.id}.json`, uint8Array, { signal })
                       break
                     case 'ValueSet':
                       promise = writeFile(`${this.#choices}/vs-${choices.id}.json`, uint8Array, { signal })
                       break
                     default:
                       promise = writeFile(`${this.#choices}/er-${choices.id.replace('.json', '')}-${String(errCount++)
                         .padStart(4, '0')}.json`, uint8Array, { signal })
                       break
                   }

                   setTimeout(controller.abort, 5000)

                   return promise


                 } catch (err) {
                   console.error(err)
                   return Promise.reject(err)
                 }
               })
  }


}
