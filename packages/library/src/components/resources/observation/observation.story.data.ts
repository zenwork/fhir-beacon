export const data = {
  resourceType: 'Observation',
  id: 'f001',
  text: {
    status: 'generated',
    div: '<div xmlns="http://www.w3.org/1999/xhtml"><p><b>Generated Narrative: Observation</b><a name="f001"> </a></p><div style="display: inline-block; background-color: #d9e0e7; padding: 6px; margin: 4px; border: 1px solid #8da1b4; border-radius: 5px; line-height: 60%"><p style="margin-bottom: 0px">Resource Observation &quot;f001&quot; </p></div><p><b>identifier</b>: id:\u00a06323\u00a0(use:\u00a0OFFICIAL)</p><p><b>status</b>: final</p><p><b>code</b>: Glucose [Moles/volume] in Blood <span style="background: LightGoldenRodYellow; margin: 4px; border: 1px solid khaki"> (<a href="https://loinc.org/">LOINC</a>#15074-8)</span></p><p><b>subject</b>: <a href="patient-example-f001-pieter.html">Patient/f001: P. van de Heuvel</a> &quot;Pieter VAN DE HEUVEL&quot;</p><p><b>effective</b>: 2013-04-02T09:30:10+01:00</p><p><b>issued</b>: 4 Apr 2013, 1:30:10 am</p><p><b>performer</b>: <a href="practitioner-example-f005-al.html">Practitioner/f005: A. Langeveld</a> &quot;Langeveld ANNE&quot;</p><p><b>value</b>: 6.3 mmol/l<span style="background: LightGoldenRodYellow"> (Details: UCUM code mmol/L = \'mmol/L\')</span></p><p><b>interpretation</b>: High <span style="background: LightGoldenRodYellow; margin: 4px; border: 1px solid khaki"> (<a href="http://terminology.hl7.org/5.1.0/CodeSystem-v3-ObservationInterpretation.html">ObservationInterpretation</a>#H)</span></p><h3>ReferenceRanges</h3><table class="grid"><tr><td>-</td><td><b>Low</b></td><td><b>High</b></td></tr><tr><td>*</td><td>3.1 mmol/l<span style="background: LightGoldenRodYellow"> (Details: UCUM code mmol/L = \'mmol/L\')</span></td><td>6.2 mmol/l<span style="background: LightGoldenRodYellow"> (Details: UCUM code mmol/L = \'mmol/L\')</span></td></tr></table></div>'
  },
  identifier: [
    {
      use: 'official',
      system: 'http://www.bmc.nl/zorgportal/identifiers/observations',
      value: '6323'
    }
  ],
  status: 'final',
  category: [
    {
      coding: [
        {
          system: 'http://terminology.hl7.org/CodeSystem/observation-category',
          code: 'vital-signs',
          display: 'Vital Signs'
        }
      ]
    }
  ],
  code: {
    coding: [
      {
        system: 'http://loinc.org',
        code: '15074-8',
        display: 'Glucose [Moles/volume] in Blood'
      }
    ]
  },
  subject: {
    reference: 'Patient/f001',
    display: 'P. van de Heuvel'
  },
  effectiveDateTime: '2013-04-02T09:30:10+01:00',
  issued: '2013-04-03T15:30:10+01:00',
  performer: [
    {
      reference: 'Practitioner/f005',
      display: 'A. Langeveld'
    }
  ],
  valueQuantity: {
    value: 6.3,
    unit: 'mmol/l',
    system: 'http://unitsofmeasure.org',
    code: 'mmol/L'
  },
  interpretation: [
    {
      coding: [
        {
          system: 'http://terminology.hl7.org/CodeSystem/v3-ObservationInterpretation',
          code: 'H',
          display: 'High'
        }
      ]
    }
  ],
  referenceRange: [
    {
      low: {
        value: 3.1,
        unit: 'mmol/l',
        system: 'http://unitsofmeasure.org',
        code: 'mmol/L'
      },
      high: {
        value: 6.2,
        unit: 'mmol/l',
        system: 'http://unitsofmeasure.org',
        code: 'mmol/L'
      }
    }
  ]
}
