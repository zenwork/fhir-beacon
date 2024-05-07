export type When<TARGET> = (target: TARGET) => boolean
export type Do<THEN> = () => THEN
export type Statement<TARGET, THEN> = [(When<TARGET>) | TARGET, (Do<THEN> | THEN)]

export function when<WHEN, THEN>(target: WHEN): (...statements: Array<Statement<WHEN, THEN>>) => THEN {
  return (...statements: Array<Statement<WHEN, THEN>>) => {
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

export const otherwise: <WHEN, THEN>(t: (() => THEN) | THEN) => Statement<WHEN, THEN> = (t) => [() => true, t]
