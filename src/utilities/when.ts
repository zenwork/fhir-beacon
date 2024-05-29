export type When<TARGET> = (target: TARGET) => boolean
export type Do<THEN> = () => THEN
export type Evaluation<TARGET, THEN> = [(When<TARGET>) | TARGET, (Do<THEN> | THEN)]

// TODO: Change this to not have the embedded second call when(tagret)(evalutation)
/**
 * A function that passes a target value to an array of evaluating WHEN statements and returns the first corresponding THEN
 *
 * ```js
 * const year = 2022
 *
 * const color = when(year)(
 *     [2022, () => 'green'],
 *     [year => year > 2022, 'red'],
 *     otherwise('blue')
 * )
 *
 * console.log(color) // green
 *
 * ```
 *
 * @param {WHEN} target - The target to evaluate the statements against.
 * @returns {function} - A function that accepts an array of statements and returns the result of evaluation.
 * @throws {Error} - Throws an error if the rule set does not cover all cases.
 */
export function when<WHEN, THEN>(target: WHEN): (...statements: Array<Evaluation<WHEN, THEN>>) => THEN {
  return (...statements: Array<Evaluation<WHEN, THEN>>) => {
    let then: any = null

    function extracted<THEN>(getThen: (() => THEN) | THEN | (THEN & Function)) {
      then = (typeof getThen === 'function') ? (getThen as Do<THEN>)() : getThen as THEN
      return true
    }

    statements.some(statement => {
      let condition = statement[0]
      if (typeof condition === 'function') {
        if ((condition as When<WHEN>)(target)) return extracted(statement[1])
      } else {
        if (condition === target) return extracted(statement[1])
      }
      return false
    })
    if (then) return then
    throw Error('rule set does not cover all cases')
  }
}

export const otherwise: <WHEN, THEN>(t: (() => THEN) | THEN) => Evaluation<WHEN, THEN> = (t) => [() => true, t]
