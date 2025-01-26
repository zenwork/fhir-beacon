import {readdir, readFile, realpath} from 'node:fs/promises'
import {
  isCodeSystem,
  isResource,
  isValueSet,
  LoadableStore,
  ResolvedSet,
  ValueSetData,
  ValueSetSource
}                                    from '../ValueSet.data'

import {FetchError}        from './FetchError'
import {resolveCodeSystem} from './ResolveCodeSystem'
import {resolveValueSet}   from './ResolveValueSet'



function empty(source: string,
               path: string,
               error: string,
               type: 'CodeSystem' | 'ValueSet' | 'unknown', err?: FetchError): ResolvedSet {
  // console.error({path: path, source: source, error: error, errmsg: err?.message, body: err?.body ?? '', status:
  // err?.status ?? null, statusText: err?.statusText ?? null, url: err?.url ?? null})
  return {
    id: source,
    version: 'n/a',
    type: type,
    name: source,
    status: 'error',
    origin: {
      path: path,
      source: source,
      error: error,
      errmsg: err?.message,
      body: err?.body ?? '',
      status: err?.status ?? null,
      statusText: err?.statusText ?? null,
      url: err?.url ?? null
    },
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

  constructor(path: string, criteria: Criteria | undefined, public skipUrl: (url: string) => boolean) {
    this.#criteria = criteria ?? matchAll
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

    if (this.exists(source)) {
      try {

        if (this.#cache.has(source)) {
          console.log('cache hit')
          return this.#cache.get(source)!
        }

        const fullpath: string = `${this.#path}/${source}`
        if (debug) console.log(`Reading ${fullpath}`)

        return realpath(fullpath)
          .then(path => readFile(path, { encoding: 'utf8' }))
          .then(data => JSON.parse(data) as ValueSetData)
          .then(json => {
            if (isValueSet(json)) return resolveValueSet(json, this.skipUrl, debug)
            if (isCodeSystem(json)) return resolveCodeSystem(json, debug)
            if (isResource(json)) { // @ts-ignore
              return empty(source, this.#path, `error: unsupported resource type`, json.resourceType)
            }
            throw new FetchError(`Read json is not usable`, fullpath, 0, 'OK', JSON.stringify(json).replace(/"/g, '\''))
          })
          .then(resolvedValueSet => this.#cache.set(source, resolvedValueSet))
          .then(() => {
            const rs: ResolvedSet = this.#cache.get(source)!
            //console.log(`returning cached valueset: ${rs.id} - ${rs.name}`)
            return rs!
          })
          .catch(error => {
            return empty(source,
                         this.#path,
                         `Failed to read and resolve ValueSet for source [${source}]. Details: ${error}`,
                         'unknown',
                         error)
          })

      } catch (e) {
        //console.error('url2:',e.constructor.name,(e as FetchError).message,(typeof e ),(e as FetchError).url)
        return empty(source, this.#path, `read and resolved failed: ${e}`, 'unknown', e as FetchError)
      }

    }
    return empty(source, this.#path, `source "${source}" does not exist`, 'unknown')


  }

  // TODO: does too much
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


export function matchAll(_: string): boolean {
  return true
}

export function valueSetCriteria(file: string): boolean {
  return file.startsWith('valueset')
}

export function codesystemCriteria(file: string): boolean {
  return file.startsWith('codesystem')
}
