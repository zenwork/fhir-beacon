import {describe, test}              from 'vitest'
import {ValueSets, ValueSetsFactory} from './ValueSets'



describe('ValueSets', () => {

  const source: string = `${process.cwd()}/../data/r5/examples-json`
  const target: string = `${process.cwd()}/./generation`
  const targetObs: string = `${process.cwd()}/./generation/observation`
  // biome-ignore lint/correctness/noUnusedVariables: temporary
  const exclusions: RegExp[] = [
    /snomed\.info\/sct/,
    /ucum\.org\//,
    /https:\/\/unitsofmeasure\.org/,
    /dicom\.nema\.org\/resources\/ontology\/DCM\//,
    /cds-hooks\.hl7\.org\/CodeSystem\/indicator/
  ]

  test.runIf(process.env.EXPENSIVE)('should read from fs and write to fs',
                                    { timeout: 800_000 },
                                    async () => {
                                      return await ValueSetsFactory
                                        .fs(source,
                                            target,
                                            undefined,
                                            url => exclusions.some(skip => skip.test(url))
                                        )
                                        .processAll(false)

                                    })

  test.runIf(process.env.EXPENSIVE)('should get everything for observation',
                                    { timeout: 800_000 },
                                    async () => {
                                      return await ValueSetsFactory
                                        .fs(source,
                                            targetObs,
                                            /observation|data-absent-reason/,
                                            url => exclusions.some(skip => skip.test(url))
                                        )
                                        .processAll(false)

                                      // return await new Promise(res => setTimeout(res, 130_000))
                                    })

  test.runIf(process.env.EXPENSIVE)('should get everything related to a single file',
                                    { timeout: 800_000 },
                                    async () => {
                                      return ValueSetsFactory
                                        .singleSource(`${process.cwd()}/../data/r5/definitions.json/valuesets.json`,
                                                      `${process.cwd()}/./generation/valuesets`,
                                                      url => exclusions.some(skip => skip.test(url))
                                        )
                                        .processAll(false)

                                      //await new Promise(res => setTimeout(res, 200_000))
                                    })

  test.runIf(process.env.EXPENSIVE)('should get everything related to some regex',
                                    { timeout: 800_000 },
                                    async () => {
                                      return ValueSetsFactory
                                        .fs(`${process.cwd()}/../data/r5/other-definitions`,
                                            `${process.cwd()}/./generation/drug`,
                                            /Drug/
                                        )
                                        .processAll(false)

                                      //await new Promise(res => setTimeout(res, 200_000))
                                    })
})
