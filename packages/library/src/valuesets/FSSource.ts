import {readdir, readFile, realpath}                                              from 'node:fs/promises'
import {resolveCodeSystem}                                                        from './ResolveCodeSystem'
import {resolveValueSet}                                                          from './ResolveValueSet'
import {CodeSystemData, LoadableStore, ResolvedSet, ValueSetData, ValueSetSource} from './ValueSet.data'



function empty(source: string,
               path: string,
               error: string,
               type: 'CodeSystem' | 'ValueSet' | 'unknown'): ResolvedSet {
  return {
    id: source,
    version: 'n/a',
    type: type,
    name: source,
    status: 'error',
    origin: { path: path, source: source, error: error },
    compose: {
      include: {
        concept: []
      },
      exclude: {
        concept: []
      }
    }

  } as ResolvedSet
}

export type Criteria = (file: string) => boolean

export class FSSource implements ValueSetSource, LoadableStore {
  readonly #criteria: Criteria

  readonly #path: string
  #loaded: boolean | null = null
  #files: string[] = []
  #cache: Map<string, ResolvedSet> = new Map()
  constructor(path: string, criteria?: Criteria) {
    this.#criteria = criteria ?? vsOrCsCriteria
    this.#path = path
  }

  public allIds(): Promise<string[]> {
    return this.isLoaded().then(() => this.#files)
  }

  load(): Promise<boolean> {

    if (this.#loaded) return this.isLoaded()

    try {
      readdir(this.#path)
        .then(files => {
          for (const file of files) {
            if (this.#criteria(file)) {
              this.#files.push(file)
            }
          }
          //console.log('finished loading valuesets: ' + this.#files.length)
          this.#loaded = this.size() > 0
        })
    } catch (err) {
      console.error(err)
      this.#loaded = false
    }

    return this.isLoaded()

  }

  public isLoaded(): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      const check = (): void => {
        if (this.#loaded !== null) {
          resolve(this.#loaded)
        }
      }
      check()

      setTimeout(check, 200)
    })
  }


  size(): number {
    return this.#files.length
  }

  exists(name: string): boolean {
    return this.#files.some(f => f.indexOf(name) > -1)
  }

  async resolve(source: string, debug: boolean = false): Promise<ResolvedSet> {

    // await this.isLoaded()

    if (this.exists(source)) {
      try {

        if (this.#cache.has(source)) {
          return this.#cache.get(source)!
        }

        const fullpath: string = `${this.#path}/${source}`
        if (debug) console.log(`Reading ${fullpath}`)
        return realpath(fullpath)
          .then(path => readFile(path, { encoding: 'utf8' }))
          .then(data => JSON.parse(data) as ValueSetData)
          .then(json => {
            if (isValueSet(json)) return resolveValueSet(json, debug)
            if (isCodeSystem(json)) return resolveCodeSystem(json, debug)
            // @ts-ignore
            throw new Error(`Unknown resource type: ${json.resourceType} for: ${fullpath}`)
          })
          .then(resolvedValueSet => this.#cache.set(source, resolvedValueSet))
          .then(() => this.#cache.get(source)!)
          .catch(error => {
            return empty(source,
                         this.#path,
                         `Failed to read and resolve ValueSet for source "${source}". Details: ${error}`,
                         'unknown')
          })

      } catch (e) {
        return empty(source, this.#path, `read and resolved failed: ${e}`, 'unknown')
      }

    }
    return empty(source, this.#path, `source "${source}" does not exist`, 'unknown')


  }

  public cacheAll(debug: boolean = false): Promise<boolean> {
    return Promise
      .all<boolean>(
        this.#files.map(f => {
          return this.resolve(f, debug)
                     .then(r => {
                       this.#cache.set(f, r)
                       return true
                     })
        }))
      .catch(err => {
        console.log('caching failed:' + err)
        return [false]
      })
      .then((checks: boolean[]) => {
        return checks.every(c => c)
      })

  }


}

export function vsOrCsCriteria(file: string): boolean {
  return valueSetCriteria(file) || codesystemCriteria(file)
}

export function valueSetCriteria(file: string): boolean {
  return file.startsWith('valueset')
}

export function codesystemCriteria(file: string): boolean {
  return file.startsWith('codesystem')
}

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
function isValueSet(data: any): data is ValueSetData {
  return data.resourceType === 'ValueSet'
}

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
function isCodeSystem(data: any): data is CodeSystemData {
  return data.resourceType === 'CodeSystem'
}
