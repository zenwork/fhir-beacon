import {Stats}                              from 'node:fs'
import {lstat, readdir, readFile, realpath} from 'node:fs/promises'

import path from 'path'
import {
  isBundle,
  isCodeSystem,
  isResource,
  isValueSet,
  LoadableStore,
  ResolvedSet,
  ValueSetData,
  ValueSetSource
}           from '../ValueSet.data'

import {FetchError}        from './FetchError'
import {resolveBundle}     from './ResolveBundle'
import {resolveCodeSystem} from './ResolveCodeSystem'
import {resolveValueSet}   from './ResolveValueSet'



export function empty(source: string,
                      path: string,
                      error: string,
                      type: 'CodeSystem' | 'ValueSet' | 'unknown',
                      err?: FetchError,
                      isError: boolean = true): ResolvedSet {
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
      error: (isError ? error : undefined),
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
  #basePath: string = ''

  constructor(path: string, criteria: Criteria | undefined, public skipUrl: (url: string) => boolean) {
    this.#criteria = criteria ?? matchAll
    this.#path = path
  }

  public allIds(): Promise<string[]> {
    return this.isLoaded().then(() => this.#files)
  }

  loadDir(): Promise<boolean> {

    if (this.#loaded) return this.isLoaded()

    this.#basePath = this.#path

    try {
      readdir(this.#basePath)
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

  loadfile(): Promise<boolean> {

    if (this.#loaded) return this.isLoaded()

    try {
      lstat(this.#path)
        .then((stats: Stats) => {
          if (stats.isFile()) {
            console.log(`loading valuesets: ${this.#loaded} - ${this.#files.length} - ${this.#path}`)
            this.#loaded = true

            this.#files.push(path.basename(this.#path))

            this.#basePath = path.dirname(this.#path)

          } else {
            this.#loaded = false
            throw new Error(`path is not a file: ${this.#path}`)
          }
        })


    } catch (err) {
      console.error(err)
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

  async resolve(source: string, debug: boolean = false): Promise<ResolvedSet[]> {

    if (this.exists(source)) {
      try {

        //todo: this caching will no longer work
        if (this.#cache.has(source)) {
          console.log('cache hit')
          return [this.#cache.get(source)!]
        }

        const fullpath: string = `${this.#basePath}/${source}`
        if (debug) console.log(`Reading ${fullpath}`)

        return realpath(fullpath)
          .then(path => readFile(path, { encoding: 'utf8' }))
          .then(data => JSON.parse(data) as ValueSetData)
          .then(json => {
            if (isBundle(json)) return resolveBundle(json, this.skipUrl, debug)
            if (isValueSet(json)) return resolveValueSet(json, this.skipUrl, debug)
            if (isCodeSystem(json)) return resolveCodeSystem(json, debug)
            if (isResource(json)) { // @ts-ignore
              return [empty(source, this.#basePath, `error: unsupported resource type`, json.resourceType)]
            }
            throw new FetchError(`Read json is not usable`, fullpath, 0, 'OK', JSON.stringify(json).replace(/"/g, '\''))
          })
          .then((resolvedValueSet: ResolvedSet[]) => {
            resolvedValueSet.map(rvs => this.#cache.set(rvs.id, rvs))
            return resolvedValueSet
          })
          .then((rvs) => {
            const rs: ResolvedSet[] = rvs.map(s => this.#cache.get(s.id)!)
            //console.log(`returning cached valueset: ${rs.id} - ${rs.name}`)
            return rs!
          })
          .catch(error => {
            return [
              empty(source,
                    this.#basePath,
                         `Failed to read and resolve ValueSet for source [${source}]. Details: ${error}`,
                         'unknown',
                    error)
            ]
          })

      } catch (e) {
        //console.error('url2:',e.constructor.name,(e as FetchError).message,(typeof e ),(e as FetchError).url)
        return [empty(source, this.#basePath, `read and resolved failed: ${e}`, 'unknown', e as FetchError)]
      }

    }
    return [empty(source, this.#basePath, `source "${source}" does not exist`, 'unknown')]


  }

  // TODO: does too much
  public cacheAll(debug: boolean = false): Promise<boolean> {
    return Promise
      .all<boolean>(
        this.#files.map(f => {
          return this.resolve(f, debug)
                     .then((sets: ResolvedSet[]) => {
                       sets.map((set: ResolvedSet) => this.#cache.set(set.id, set))
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
