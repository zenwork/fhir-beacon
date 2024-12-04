import {isBlank}            from '../../../utilities'
import {DomainResourceData} from '../../resource'
import {Validations} from '../Decorate'

/**
 * Validates that only one of the given keys in the data object is populated.
 *
 * @param {DR} data - The data object being validated, which conforms to DomainResourceData.
 * @param {Validations} validations - The validations object used to record any validation errors.
 * @param {string} name - The name associated with the choice being validated.
 * @param {string[]} keys - An array of keys representing the choices to check.
 * @return {void}
 */
export function choiceValidate<DR extends DomainResourceData>(data: DR,
                                                              validations: Validations,
                                                              name: string,
                                                              keys: string[]): void {

  let count = 0
  keys.forEach(key => {
    if (!isBlank(data[key as keyof typeof data])) count++
  })

  if (count > 1) {
    validations.addErr({ key: name, err: `Only one of the choices should be present for ${name}` })
  }

}
