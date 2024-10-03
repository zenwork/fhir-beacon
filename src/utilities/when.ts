export type WhenEvaluation<TARGET> = (target: TARGET) => boolean

export type Do<THEN> = () => THEN

export type Evaluation<TARGET, THEN> = [
    (WhenEvaluation<TARGET>) | TARGET,
  (Do<THEN> | THEN)
]

/**
 * A function that passes a target value to an array of evaluating WHEN evaluations and returns the first corresponding
 * THEN
 *
 * ```js
 * const year = 2022
 *
 * const color = when(year,
 *     [2022, () => 'green'],
 *     [year => year > 2022, 'red'],
 *     otherwise('blue')
 * )
 *
 * console.log(color) // green
 *
 * ```
 *
 * @param {WHEN} target - The target to evaluate the evaluations against.
 * @param evaluations
 * @throws {Error} - Throws an error if the rule set does not cover all cases.
 */
export function when<WHEN, THEN>(target: WHEN, ...evaluations: Array<Evaluation<WHEN, THEN>>): THEN {

  let then: any = null

  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  function extracted<THEN>(getThen: (() => THEN) | THEN | (THEN & Function)) {
    then = (typeof getThen === 'function') ? (getThen as Do<THEN>)() : getThen as THEN
    return true
  }

  evaluations.some(statement => {
    const condition = statement[0]
    if (typeof condition === 'function') {
      if ((condition as WhenEvaluation<WHEN>)(target)) return extracted(statement[1])
    } else {
      if (condition === target) return extracted(statement[1])
    }
    return false
  })

  if (then) return then

  throw Error('rule set does not cover all cases')

}

export const otherwise: <WHEN, THEN>(t: (() => THEN) | THEN) => Evaluation<WHEN, THEN> = (t) => [() => true, t]
