export function aValuePresent(data: Record<string, unknown>) {

  return (data.valueReference
          || data.valueAttachment
          || data.valueBoolean !== undefined
          || data.valueCodeableConcept
          || data.valueDateTime
          || data.valueInteger
          || data.valuePeriod
          || data.valueQuantity
          || data.valueRange
          || data.valueRatio
          || data.valueSampledData
          || data.valueString
          || data.valueTime)
}
