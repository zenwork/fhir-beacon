import {describe, test}               from 'vitest'
import {Criteria, FSSource, matchAll} from '../source/FSSource'
import {Choices, LoadableStore}       from '../ValueSet.data'
import {ValueSetProcessor}            from './ValueSetProcessor'



describe('ValueSetProcessor', () => {

  const exampleData: string = `${process.cwd()}/../data/r5/examples-json`
  const maxLoad = 2000
  let countLoad = 0

  test.runIf(process.env.EXPENSIVE)('should load all valuesets', { timeout: 180_000 }, async () => {
    const processor: ValueSetProcessor = new ValueSetProcessor(new FSSource(exampleData, (id: string) => {
      if (matchAll(id)) {
        countLoad++
        return countLoad <= maxLoad
      }
      return false
    }, () => false))

    const valueSetChoices: Choices[] = await processor.processAll(false)

    const count: number = valueSetChoices
      .reduce(
        (prev, valueSet) => {
          if (valueSet.valid) {
            return prev
          } else {
            //console.log(`Invalid valueset:`,valueSet)
            return prev + 1
          }
        },
        0
      )

    console.log(
      `Loaded ${valueSetChoices.length} valuesets, ${count} invalid`)


  })

  test.runIf(process.env.EXPENSIVE)('should process one', { timeout: 180_000 }, async () => {

    const criteria: Criteria = (id: string) => {
      return id === 'valueset-week-of-month.json'
    }

    const source: LoadableStore = new FSSource(exampleData, criteria, () => false)


    const processor: ValueSetProcessor = new ValueSetProcessor(source)


    // const resolved: ResolvedValueSet = await source.resolve('valueset-week-of-month.json')

    await processor.process('valueset-week-of-month.json')

    // console.log(resolved)
    // console.log(choices)


  })
})
