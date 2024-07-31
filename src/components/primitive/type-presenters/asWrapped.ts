export const asWrapped = (inputStr: string, n: number): string => {

  const tempArr = []
  for (let i = 0; i < inputStr.length; i += n) {
    tempArr.push(inputStr.substring(i, i + n) + (i + n < inputStr.length ? '<wbr>' : ''))
  }

  return tempArr.join('')
}
