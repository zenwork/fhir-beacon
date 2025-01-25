import {describe, test}              from 'vitest'
import {ValueSets, ValueSetsFactory} from './ValueSets'



describe('ValueSets', () => {

  const source: string = `${process.cwd()}/../data/r5/examples-json`
  const target: string = `${process.cwd()}/./generation`
  // biome-ignore lint/correctness/noUnusedVariables: temporary
  const exclusions: RegExp[] = [
    /snomed\.info\/sct/,
    /ucum\.org\//,
    /https:\/\/unitsofmeasure\.org/,
    /dicom\.nema\.org\/resources\/ontology\/DCM\//,
    /cds-hooks\.hl7\.org\/CodeSystem\/indicator/,
    /terminology\.hl7\.org/
  ]
  test.runIf(process.env.EXPENSIVE)('should read from fs and write to fs',
                                    { timeout: 800_000 },
                                    async () => {
                                      await ValueSetsFactory
                                        .fs(source,
                                            target,
                                            /valueset/,
                                            url => exclusions.some(skip => skip.test(url))
                                        )
                                        .processAll(false)

                                    })
})
