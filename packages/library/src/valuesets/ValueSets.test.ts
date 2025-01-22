import {describe, test}              from 'vitest'
import {ValueSets, ValueSetsFactory} from './ValueSets'



describe('ValueSets', () => {

  const source: string = `${process.cwd()}/../data/r5/examples-json`
  const target: string = `${process.cwd()}/./generation`

  test.runIf(process.env.EXPENSIVE)('should read from fs and write to fs',
                                    { timeout: 800_000 },
                                    async () => {
                                      await ValueSetsFactory
                                        .fs(source, target, /valueset/)
                                        .processAll()

                                    })
})
