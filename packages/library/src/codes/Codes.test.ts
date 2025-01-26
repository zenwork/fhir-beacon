import {describe, expect, test} from 'vitest'
import {Choices}                from '../valuesets/ValueSet.data'
import {Codes}                  from './Codes'



describe('Codes', () => {
  test('should return a set of choices', () => {
    const choices: Choices | undefined = new Codes().get('vs-observation-interpretation')
    expect(choices).toBeDefined()
  })
})
