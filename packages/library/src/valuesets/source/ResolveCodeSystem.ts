import {isBlank}                                                           from '../../utilities'
import {CodeSystemConceptData, CodeSystemData, ResolvedSet, ResolvedValue} from '../ValueSet.data'



export async function resolveCodeSystem(vs: CodeSystemData, debug: boolean = false): Promise<ResolvedSet> {

  if (isBlank(vs.name)) {
    throw new Error('CodeSystem name is required for code generation'
                    + ' (cnl-0 -> http://hl7.org/fhir/valueset-definitions.html#ValueSet')
  }

  if (vs.url?.match(/[|#]/) !== null) {
    throw new Error('CodeSystem url must not contain "|" or "#" characters'
                    + ' (cnl-1 -> http://hl7.org/fhir/valueset-definitions.html#ValueSet.url')
  }

  if (vs.status?.match(/draft | active | retired | unknown/) !== null) {
    throw new Error('CodeSystem status must be one of "draft | active | retired | unknown" for code generation'
                    + ' (http://hl7.org/fhir/valueset-definitions.html#ValueSet.status)')
  }

  return Promise.all([Promise.resolve(resolveIncludesOrExclude(vs.id ?? 'n/a', vs.concept ?? [], debug))])
                .then((r: ResolvedValue[][]) => {
                  return ({
                    origin: vs,
                    id: vs.id ?? 'unknown',
                    type: vs.resourceType ?? 'unknown',
                    name: vs.name ?? 'unknown',
                    status: vs.status,
                    version: vs.version ?? 'unknown',
                    compose: {
                      include: { concept: r[0] },
                      exclude: { concept: [] }
                    }
                  } as ResolvedSet)
                })


}

function resolveIncludesOrExclude(id: string, segment: CodeSystemConceptData[], debug: boolean): ResolvedValue[] {

  if (debug) console.log('resolved [' + segment.length + `] from ${id}`)
  return segment.map(inc => ({ code: inc.code, display: inc.display ?? 'n/a', definition: 'n/a' }))

}
