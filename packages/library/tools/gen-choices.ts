import {ValueSetsFactory} from '../src/valuesets/ValueSets'



const source: string = `${process.cwd()}/../data/r5/examples-json`
const target: string = `${process.cwd()}/./generation`

await ValueSetsFactory
  .fs(source, target, /triggeredby/)
  .processAll()
