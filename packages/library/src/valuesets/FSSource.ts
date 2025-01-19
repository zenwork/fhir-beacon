import {readdir, readFile, realpath}    from 'node:fs/promises'
import {resolveValueSet}                from './ResolveValueSet'
import {ResolvedValueSet, ValueSetData} from './ValueSet.data'
import {ValueSetSource}                 from './ValueSets'



export class FSSource implements ValueSetSource {

  readonly #path: string
  #files: string[] = []
  #cache: Map<string, ResolvedValueSet> = new Map()

  constructor(path: string) {
    this.#path = path
  }

  async load(): Promise<boolean> {
    try {
      const files = await readdir(this.#path)
      for await  (const file of files) {
        if (file.indexOf('valueset') > -1 || file.indexOf('codesystem') > -1) {
          this.#files.push(file)
        }
      }
      return this.size() > 0
    } catch (err) {
      console.error(err)
      return false
    }
  }

  size(): number {
    return this.#files.length
  }

  exists(name: string): boolean {
    return this.#files.some(f => f.indexOf(name) > -1)
  }

  async read(source: string): Promise<ResolvedValueSet> {

    if (this.exists(source)) {
      if (!this.#cache.has(source)) {
        const fullpath: string = `${this.#path}/${source}`
        console.log(`Reading ${fullpath}`)
        return realpath(fullpath)
          .then(path => readFile(path, { encoding: 'utf8' }))
          .then(data => JSON.parse(data) as ValueSetData)
          .then(json => resolveValueSet(json))
          .then(resolvedValueSet => this.#cache.set(source, resolvedValueSet))
          .then(() => this.#cache.get(source)!)
          .catch(error => {
            // Handle and re-throw the error with meaningful context
            throw new Error(`Failed to read and resolve ValueSet for source "${source}". Details: ${error}`)
          })

      }

    }

    return Promise.reject(new Error(`ValueSet ${source} not found`))

  }

}
