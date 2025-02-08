import {Choices}                         from '../valuesets/ValueSet.data'
import {Codes}                           from './Codes'



export function useSystem(url: string=''): Choices {
  return new Codes().getBySystem(url) ?? { id: url, system: url, name: 'ERROR: NOT FOUND', type: 'unknown', valid: false, choices: [] }
}


export function systemChoices(): Choices {
  return new Codes().getAllSystemsAsChoices()

}
