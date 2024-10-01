import {describe, expect, it} from 'vitest'
import {Base64Binary}         from '../primitive.data'
import {toBase64}             from './toBase64'


// Assuming an appropriate export for the toBase64 function

const inputExample = 'iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAIAAAD/gAIDAAAABmJLR0QA/wD/AP+gvaeTAAAHtUlEQVR4nO2bTUwT3RqATzuUFmtLUdpCqVRQWxRqCJKWxAhKiFsLBjfsXImuXLgwGF0YYoxxY9AQF/6sDCZCd4omrSyUFsEoP6G2GqAtHVqIw4+1P9N27mLuN7cfevk42DPTe3Oe3TnMnPflgTnzzpk5IoZhAGZ7iIVO4H8JLAsCLAsCLAsCLAsCLAsCLAsCLAsCLAsCLAsCLAsCLAsCLAsCLAsCLAsCLAsCLAuCAqET+BsMw6yurnJNlUolEokEzGcTAsiKRqMTExNut9vr9S4tLYXD4UwmIxKJGIYRi8XFxcXckWtra9k/0mq1ZWVlRqPRarUeO3ZMLpfznLmIzzV4mqbPnz/v8/msVqvFYjl8+HB5eblGoyEI4h/PTafTkUiEJMnZ2dmxsTGXy2U0Gh8/flxQwOPfm+ERj8dTXFx848aN4eFhiqJ2NghFUcPDw9evX1cqlR6PJ7cZbg2vlyHDMM3NzfX19U6n8/bt2+vr62KxWK1Wa7VatVoNACgpKQEAKBQKAMDGxgYAgKIoAEDkLzKZjEKhsFgsVqu1tbWV4ffVFN9zllwut9lsNpvt1q1bV69eZRhmZGRk79694XA4nU7//PkzlUrFYjEAgFqtJghCLpcTBKHRaL5//97S0iISidgTAQBDQ0M8Jy9Y6TA4OAgAEIlEPT09JpOpra3t5cuXVVVVnZ2dCoVCoVB0dnZWV1e/evWqra2tpqamp6eHvTOyJwpCHpUONE0nk0kAwPLyMtuTTCbZnjwBF6UQYFkQYFkQ8CpLqVTOzs6+e/cumUx2dXWxnXK5XCz+dxqbHm64plgs5ur1rq4umqZHR0dnZmayy30e4LWCBwC43e5Lly5FIhG9Xm80GnU6nVqtrqio2LNnTygUOnTokEwmW1lZAQCUlpbGYrGvX7/qdDqKooLB4PLycigU8vl8wWBQo9Hcv3/fYrHwmTzfsgAAly9f7ujoaGhomJ+fJ0mSJMlwOMwKYktQthxlS1O2TC0tLdVqtTqdrqysbP/+/R8/frTb7Xfv3uU5c8FKB7lcXltbW1tbK1QCOwBP8BAIICsWixUVFf3JCDKZjH0k4hn+LsNgMDg5Oenz+T59+nT06NE/GcpsNk9MTNy7d+/gwYP19fU6nS5XSW4NHxP86OjotWvXJBKJxWIxGAxnz55VqVR/OCZFUYODgwsLC263O5PJ9Pb28nFnRL0G9PDhw1OnTnm9XnQhPB5PS0vLo0eP0IVgQSvr9evXp0+fTiQSSKMwDBOPx9va2hwOB9IoCGWl0+nGxkaSJNGFyGZxcdFisWQyGXQhEN4NXS5XQ0NDWVkZuhDZ6HS6urq6Dx8+oAuBUJbb7W5ubkY3/q+0tLS43W504yOUtbKyotFo0I3/K1qtNhKJoBsfoaxMJsMtJ/CDWCzOZDIIx0c39P8faGWNjIykUimkIThomh4ZGUEaAq2smzdv6vX67u7up0+fTk5O0jSd2/Fpmv78+fOTJ08uXLig1+t7e3tzO/4mkD8bhsPh/v7+/v5+AIBUKjWbzVVVVeXl5ez6lEaj0Wq1u3btkkqlhYWF7Kopu/7JfugQjUaTyWQikYhGo+x71sXFxXA4TJLk3Nzc9PR0IpFA/Stw8LqelUgkxsfHx8fH+QyaQ/AEDwGWBQGWBUF+yXI6ndkPrg6HQ+iM/kZ+yaqrq8tums1moTL5LfklK8/BsiDAsiAQ8vssqVSaPUnp9Xr2/TNHSUnJmTNngsEg18Nzyb4JIWU9e/asvb19iwMIgrDb7dk9Q0NDHR0diPP6rwh5Ge5gaZDn1cRN4DkLAiwLAiFlMfAvw3dwSg4RcoLv6+sjSZJrGgyGX1/Bj42NLSwscM0XL17wlNzvEFLWwMDAwMDAf1IpKKAoavfu3VzPjx8/jh8/ztvC9D+SR3NWKpWKx+PZPfF4PH9MgbySlf9gWRDkl6xNF11eXYMA9QRvNBq9Xu/2j+/u7m5qauKaLpcLKpzJZII6Hha0svr6+qLR6IMHD5xO53b+Tex2+6aHwe0gkUhaW1svXrxYVFT09u3bnSS6PZCXDuzuwrW1NYfD4XK5JiYmvnz5QpJkOp3e8ZgEQeh0OpPJ1NjYyO7SVCqVAIA3b97kLvHfwFOdVVxc3N7ezq0x0DQdCoX8fv/8/PzS0tLq6mo6naYoKpVKbWxssIswUqlUqVQSBFFSUkIQhEqlYncMVFZWVlRU8Lo1+i+EKUolEonBYDAYDCdOnBAkgZ2RX3fDPAfLggChLLFYnPPPZraGpmm0n8+h+7b3/fv3Vqt1amoKXYhspqammpqaXC4XuhBod1jMzMxcuXKFpulz5861trYeOHAg5yG+ffvmcDieP39eWFh4586dI0eO5DwEBx/bUQKBgN1udzqdc3Nz5eXlZrO5pqamsrJSr9dXVlZuf9NTLBbz+/2BQMDv93s8nunpaZIkq6urT548abPZ9u3bh/S3APxvziRJcmZmxuPxBAKBYDDo9/u5ZRmGYWQyWba7WCwWj8e5zb8ymYxTbDKZ6urqePvInkWAnaxbkE6n19fXuSZblAqYzybyS1aeg+ssCLAsCLAsCLAsCLAsCLAsCLAsCLAsCLAsCLAsCLAsCLAsCLAsCLAsCLAsCLAsCLAsCP4Fqfl1XwaEE3EAAAAASUVORK5CYII='

describe('toBase64 Function', () => {

  it('should convert a valid base64 string', () => {
    expect(() => toBase64(inputExample)).not.toThrow()
    expect(toBase64(inputExample)).toEqual(inputExample as Base64Binary)
  })

  it('should throw an error if input is not a string', () => {
    const input = 12345
    expect(() => toBase64(input as unknown as string)).toThrow('Input must be a base64 encoded string')
  })

  it('should throw an error for an invalid base64 string', () => {
    const input = 'Invalid base64 string!'
    expect(() => toBase64(input)).toThrow('Invalid base64 encoded string')
  })

  it('should throw an error for a base64 string that is too long', () => {
    // @ts-expect-error setting max for testing
    expect(() => toBase64(inputExample, 1000)).toThrow('Binary size should not exceed 1000')
  })

  it('should allow base64 string at the boundary of allowed length', () => {
    // @ts-expect-error setting max for testing
    expect(() => toBase64(inputExample, 2762)).not.toThrow()
    // @ts-expect-error setting max for testing
    expect(toBase64(inputExample, 2762)).toEqual(inputExample as Base64Binary)
  })

})
