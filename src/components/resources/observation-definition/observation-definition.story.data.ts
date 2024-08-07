export const data = {
  resourceType: 'ObservationDefinition',
  id: 'example',
  text: {
    status: 'generated',
    div: '<div xmlns="http://www.w3.org/1999/xhtml"><p><b>Generated Narrative: ObservationDefinition</b><a name="example"> </a></p><div style="display: inline-block; background-color: #d9e0e7; padding: 6px; margin: 4px; border: 1px solid #8da1b4; border-radius: 5px; line-height: 60%"><p style="margin-bottom: 0px">Resource ObservationDefinition &quot;example&quot; </p></div><p><b>status</b>: active</p><p><b>category</b>: Laboratory <span style="background: LightGoldenRodYellow; margin: 4px; border: 1px solid khaki"> (<a href="http://terminology.hl7.org/5.1.0/CodeSystem-observation-category.html">Observation Category Codes</a>#laboratory)</span></p><p><b>code</b>: Albumin/Protein.total in Serum or Plasma by Electrophoresis <span style="background: LightGoldenRodYellow; margin: 4px; border: 1px solid khaki"> (<a href="https://loinc.org/">LOINC</a>#13980-8)</span></p><p><b>permittedDataType</b>: Quantity</p><p><b>multipleResultsAllowed</b>: false</p><p><b>method</b>: Total measurement <span style="background: LightGoldenRodYellow; margin: 4px; border: 1px solid khaki"> (<a href="https://browser.ihtsdotools.org/">SNOMED CT</a>#115341008)</span></p><p><b>preferredReportName</b>: Serum albumin/​Protein total</p><p><b>permittedUnit</b>: % (Details: UCUM code % = \'%\', stated as \'%\')</p><blockquote><p><b>qualifiedValue</b></p><p><b>context</b>: Normal Range <span style="background: LightGoldenRodYellow; margin: 4px; border: 1px solid khaki"> (<a href="http://terminology.hl7.org/5.1.0/CodeSystem-referencerange-meaning.html">Observation Reference Range Meaning Codes</a>#normal)</span></p><p><b>rangeCategory</b>: reference</p><p><b>range</b>: 50-?</p></blockquote><blockquote><p><b>qualifiedValue</b></p><p><b>context</b>: Normal Range <span style="background: LightGoldenRodYellow; margin: 4px; border: 1px solid khaki"> (<a href="http://terminology.hl7.org/5.1.0/CodeSystem-referencerange-meaning.html">Observation Reference Range Meaning Codes</a>#normal)</span></p><p><b>rangeCategory</b>: critical</p><p><b>range</b>: ?-40</p></blockquote></div>'
  },
  status: 'active',
  category: [
    {
      coding: [
        {
          system: 'http://terminology.hl7.org/CodeSystem/observation-category',
          code: 'laboratory'
        }
      ]
    }
  ],
  code: {
    coding: [
      {
        system: 'http://loinc.org',
        code: '13980-8',
        display: 'Albumin/Protein.total in Serum or Plasma by Electrophoresis'
      }
    ]
  },
  permittedDataType: ['Quantity'],
  multipleResultsAllowed: false,
  method: {
    coding: [
      {
        system: 'http://snomed.info/sct',
        code: '115341008',
        display: 'Total measurement'
      }
    ]
  },
  preferredReportName: 'Serum albumin/​Protein total',
  permittedUnit: [
    {
      system: 'http://unitsofmeasure.org',
      code: '%',
      display: '%'
    }
  ],
  qualifiedValue: [
    {
      context: {
        coding: [
          {
            system: 'http://terminology.hl7.org/CodeSystem/referencerange-meaning',
            code: 'normal',
            display: 'Normal Range'
          }
        ]
      },
      rangeCategory: 'reference',
      range: {
        low: {
          value: 50
        }
      }
    },
    {
      context: {
        coding: [
          {
            system: 'http://terminology.hl7.org/CodeSystem/referencerange-meaning',
            code: 'normal',
            display: 'Normal Range'
          }
        ]
      },
      rangeCategory: 'critical',
      range: {
        high: {
          value: 40
        }
      }
    }
  ]
}
