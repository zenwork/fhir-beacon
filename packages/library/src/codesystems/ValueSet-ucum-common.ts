export const ValueSetUcumCommon = {
  resourceType: 'ValueSet',
  id: 'ucum-common',
  extension: [
    {
      url: 'http://hl7.org/fhir/StructureDefinition/valueset-extensible',
      valueBoolean: true
    }
  ],
  url: 'http://hl7.org/fhir/ValueSet/ucum-common',
  identifier: [
    {
      system: 'urn:ietf:rfc:3986',
      value: 'urn:oid:2.16.840.1.113883.4.642.3.3144'
    }
  ],
  version: '5.0.0',
  name: 'CommonUCUMUnits',
  title: 'Common UCUM units',
  status: 'draft',
  experimental: true,
  publisher: 'FHIR Project',
  description: 'Commonly encountered UCUM units (for purposes of helping populate look ups).',
  copyright: 'UCUM is Copyright © 1999-2013 Regenstrief Institute, Inc. and The UCUM Organization, Indianapolis, IN. All rights reserved. See http://unitsofmeasure.org/trac//wiki/TermsOfUse for details.',
  compose: {
    include: [
      {
        system: 'http://unitsofmeasure.org',
        concept: [
          {
            code: '%',
            display: 'percent'
          },
          {
            code: '%/100',
            display: 'percent / 100'
          },
          {
            code: '%[slope]',
            display: 'percent of slope'
          },
          {
            code: '/(12.h)',
            display: 'per 12 * hour'
          },
          {
            code: '/(2.h)',
            display: 'per 2 hour'
          },
          {
            code: '/10*10',
            display: 'PerTenGiga'
          },
          {
            code: '/10*12',
            display: 'PerTrillion'
          },
          {
            code: '/10*3',
            display: 'per thousand'
          },
          {
            code: '/10*4',
            display: 'per 10 thousand'
          },
          {
            code: '/10*6',
            display: 'PerMillion'
          },
          {
            code: '/10*9',
            display: 'PerBillion'
          },
          {
            code: '/100',
            display: 'per 100'
          },
          {
            code: '/100.g',
            display: 'per 100 gram'
          },
          {
            code: '/L',
            display: 'per liter'
          },
          {
            code: '/U',
            display: 'per enzyme unit'
          },
          {
            code: '/[HPF]',
            display: 'per high power field'
          },
          {
            code: '/[HPF]',
            display: 'per hpf'
          },
          {
            code: '/[IU]',
            display: 'per international unit'
          },
          {
            code: '/[LPF]',
            display: 'per low power field'
          },
          {
            code: '/[LPF]',
            display: 'per LPF'
          },
          {
            code: '/[arb\u0027U]',
            display: 'per arbitrary unit'
          },
          {
            code: '/[iU]',
            display: 'per international unit'
          },
          {
            code: '/a',
            display: '/ year'
          },
          {
            code: '/cm[H2O]',
            display: 'per centimeter of water'
          },
          {
            code: '/d',
            display: 'per day'
          },
          {
            code: '/dL',
            display: 'per deciliter'
          },
          {
            code: '/g',
            display: 'per gram'
          },
          {
            code: '/h',
            display: 'per hour'
          },
          {
            code: '/kg',
            display: 'per kilogram'
          },
          {
            code: '/m2',
            display: 'per square meter'
          },
          {
            code: '/m3',
            display: 'per cubic meter'
          },
          {
            code: '/mL',
            display: 'per milliliter'
          },
          {
            code: '/mg',
            display: 'per milligram'
          },
          {
            code: '/min',
            display: 'per minute'
          },
          {
            code: '/min/10*3',
            display: 'per minute per thousand'
          },
          {
            code: '/mm',
            display: 'per millimeter'
          },
          {
            code: '/mm3',
            display: 'per cubic millimeter'
          },
          {
            code: '/mmol',
            display: 'per millimole'
          },
          {
            code: '/mo',
            display: 'per month'
          },
          {
            code: '/s',
            display: 'per second'
          },
          {
            code: '/uL',
            display: 'per microliter'
          },
          {
            code: '/ug',
            display: 'per microgram'
          },
          {
            code: '/wk',
            display: 'per week'
          },
          {
            code: '1',
            display: '1*'
          },
          {
            code: '1/d',
            display: 'one per day'
          },
          {
            code: '1/min',
            display: 'one per minute'
          },
          {
            code: '10*',
            display: 'the number ten for arbitrary powers'
          },
          {
            code: '10*-3',
            display: '(the number ten for arbitrary powers ^ -3)'
          },
          {
            code: '10*-6',
            display: 'the number ten for arbitrary powers ^ -6'
          },
          {
            code: '10*12/L',
            display: 'trillion per liter'
          },
          {
            code: '10*3',
            display: 'Thousand'
          },
          {
            code: '10*3.U',
            display: 'Thousand Per * Unit'
          },
          {
            code: '10*3/L',
            display: 'Thousand Per Liter'
          },
          {
            code: '10*3/mL',
            display: 'Thousand Per MilliLiter'
          },
          {
            code: '10*3/uL',
            display: 'Thousands Per MicroLiter'
          },
          {
            code: '10*4/uL',
            display: '10 thousand per microliter'
          },
          {
            code: '10*5',
            display: 'OneHundredThousand'
          },
          {
            code: '10*6',
            display: 'Million'
          },
          {
            code: '10*6.U',
            display: '(the number ten for arbitrary powers ^ 6) * Unit'
          },
          {
            code: '10*6.[CFU]/L',
            display: 'million colony forming unit per liter'
          },
          {
            code: '10*6.[IU]',
            display: 'million international unit'
          },
          {
            code: '10*6.[iU]',
            display: 'MillionInternationalUnit'
          },
          {
            code: '10*6.eq/mL',
            display: 'MillionEquivalentsPerMilliLiter'
          },
          {
            code: '10*6/(24.h)',
            display: 'million per 24 hour'
          },
          {
            code: '10*6/L',
            display: 'million per liter'
          },
          {
            code: '10*6/kg',
            display: 'million per kilogram'
          },
          {
            code: '10*6/mL',
            display: 'million per milliliter'
          },
          {
            code: '10*6/mm3',
            display: '(the number ten for arbitrary powers ^ 6) / (millimeter ^ 3)'
          },
          {
            code: '10*6/uL',
            display: 'million per microliter'
          },
          {
            code: '10*8',
            display: 'TenToEighth'
          },
          {
            code: '10*9/L',
            display: 'billion per liter'
          },
          {
            code: '10*9/mL',
            display: 'billion per milliliter'
          },
          {
            code: '10*9/uL',
            display: 'billion per microliter'
          },
          {
            code: '10.L/(min.m2)',
            display: '10 liter per minute per square meter'
          },
          {
            code: '10.L/min',
            display: '10 liter per minute'
          },
          {
            code: '10.uN.s/(cm.m2)',
            display: '10 * microNewton * second / centimeter * (meter ^ 2)'
          },
          {
            code: '10.uN.s/(cm5.m2)',
            display: '10 micronewton second per centimeter to the fifth power per square meter'
          },
          {
            code: '10.uN.s/cm',
            display: '10 * microNewton * second / centimeter'
          },
          {
            code: '10.uN.s/cm2',
            display: '10 * microNewton * second / (centimeter ^ 2)'
          },
          {
            code: '10^',
            display: 'the number ten for arbitrary powers'
          },
          {
            code: '24.h',
            display: '24 hour'
          },
          {
            code: 'A',
            display: 'Ampère'
          },
          {
            code: 'A/m',
            display: 'Ampère / meter'
          },
          {
            code: 'AU',
            display: 'astronomic unit'
          },
          {
            code: 'Ao',
            display: 'Ångström'
          },
          {
            code: 'B',
            display: 'bel'
          },
          {
            code: 'B[SPL]',
            display: 'bel sound pressure'
          },
          {
            code: 'B[V]',
            display: 'bel volt'
          },
          {
            code: 'B[W]',
            display: 'bel watt'
          },
          {
            code: 'B[kW]',
            display: 'bel kilowatt'
          },
          {
            code: 'B[mV]',
            display: 'bel millivolt'
          },
          {
            code: 'B[uV]',
            display: 'bel microvolt'
          },
          {
            code: 'Bd',
            display: 'baud'
          },
          {
            code: 'Bi',
            display: 'Biot'
          },
          {
            code: 'Bq',
            display: 'Becquerel'
          },
          {
            code: 'By',
            display: 'byte'
          },
          {
            code: 'C',
            display: 'Coulomb'
          },
          {
            code: 'Cel',
            display: 'degree Celsius'
          },
          {
            code: 'Ci',
            display: 'CURIE'
          },
          {
            code: 'F',
            display: 'Farad'
          },
          {
            code: 'G',
            display: 'Gauss'
          },
          {
            code: 'GBq',
            display: 'gigaBecquerel'
          },
          {
            code: 'Gal',
            display: 'Gal'
          },
          {
            code: 'Gb',
            display: 'Gilbert'
          },
          {
            code: 'Gy',
            display: 'Gray'
          },
          {
            code: 'H',
            display: 'Henry'
          },
          {
            code: 'Hz',
            display: 'Hertz'
          },
          {
            code: 'J',
            display: 'joule'
          },
          {
            code: 'J/L',
            display: 'joule per liter'
          },
          {
            code: 'K',
            display: 'Kelvin'
          },
          {
            code: 'K/W',
            display: 'Kelvin / Watt'
          },
          {
            code: 'Ky',
            display: 'Kayser'
          },
          {
            code: 'L',
            display: 'liter'
          },
          {
            code: 'L.s2/s',
            display: 'liter * (second ^ 2) / second'
          },
          {
            code: 'L/(24.h)',
            display: 'liter per 24 hour'
          },
          {
            code: 'L/(8.h)',
            display: 'liter per 8 hour'
          },
          {
            code: 'L/(min.m2)',
            display: 'liter per minute per square meter'
          },
          {
            code: 'L/L',
            display: 'liter per liter'
          },
          {
            code: 'L/d',
            display: 'liter per day'
          },
          {
            code: 'L/h',
            display: 'liter per hour'
          },
          {
            code: 'L/kg',
            display: 'liter per kilogram'
          },
          {
            code: 'L/min',
            display: 'liter per minute'
          },
          {
            code: 'L/s',
            display: 'liter / second'
          },
          {
            code: 'L/s/s2',
            display: 'liter per second per square second'
          },
          {
            code: 'Lmb',
            display: 'Lambert'
          },
          {
            code: 'MBq',
            display: 'megaBecquerel'
          },
          {
            code: 'Ms',
            display: 'megasecond'
          },
          {
            code: 'Mx',
            display: 'Maxwell'
          },
          {
            code: 'N',
            display: 'Newton'
          },
          {
            code: 'N.cm',
            display: 'Newton centimeter'
          },
          {
            code: 'N.s',
            display: 'Newton second'
          },
          {
            code: 'Np',
            display: 'neper'
          },
          {
            code: 'Oe',
            display: 'Oersted'
          },
          {
            code: 'Ohm',
            display: 'Ohm'
          },
          {
            code: 'Ohm.m',
            display: 'Ohm meter'
          },
          {
            code: 'P',
            display: 'Poise'
          },
          {
            code: 'Pa',
            display: 'Pascal'
          },
          {
            code: 'R',
            display: 'Roentgen'
          },
          {
            code: 'RAD',
            display: 'radiation absorbed dose'
          },
          {
            code: 'REM',
            display: 'radiation equivalent man'
          },
          {
            code: 'S',
            display: 'Siemens'
          },
          {
            code: 'St',
            display: 'Stokes'
          },
          {
            code: 'Sv',
            display: 'Sievert'
          },
          {
            code: 'T',
            display: 'Tesla'
          },
          {
            code: 'U',
            display: 'enzyme Unit'
          },
          {
            code: 'U/(1.h)',
            display: 'enzyme Unit per 1 hour'
          },
          {
            code: 'U/(10.g)',
            display: 'enzyme unit per 10 gram'
          },
          {
            code: 'U/(12.h)',
            display: 'enzyme unit per 12 hour'
          },
          {
            code: 'U/(18.h)',
            display: 'enzyme Unit per 18 hour'
          },
          {
            code: 'U/(2.h)',
            display: 'enzyme unit per 2 hour'
          },
          {
            code: 'U/(24.h)',
            display: 'enzyme unit per 24 hour'
          },
          {
            code: 'U/10',
            display: 'enzyme unit per 10'
          },
          {
            code: 'U/10*10',
            display: 'enzyme unit per 10 billion'
          },
          {
            code: 'U/10*12',
            display: 'enzyme unit per trillion'
          },
          {
            code: 'U/10*12',
            display: 'enzyme unit per trillion'
          },
          {
            code: 'U/10*6',
            display: 'enzyme unit per million'
          },
          {
            code: 'U/10*9',
            display: 'enzyme unit per billion'
          },
          {
            code: 'U/L',
            display: 'enzyme unit per liter'
          },
          {
            code: 'U/d',
            display: 'enzyme unit per day'
          },
          {
            code: 'U/dL',
            display: 'enzyme unit per deciliter'
          },
          {
            code: 'U/g',
            display: 'enzyme unit per gram'
          },
          {
            code: 'U/h',
            display: 'enzyme unit per hour'
          },
          {
            code: 'U/kg',
            display: 'enzyme unit per kilogram'
          },
          {
            code: 'U/kg/h',
            display: 'Unit / kilogram / hour'
          },
          {
            code: 'U/mL',
            display: 'enzyme unit per milliliter'
          },
          {
            code: 'U/min',
            display: 'enzyme unit per minute'
          },
          {
            code: 'U/mmol',
            display: 'enzyme unit per millimole'
          },
          {
            code: 'U/mol',
            display: 'enzyme Unit per mole'
          },
          {
            code: 'U/s',
            display: 'enzyme unit per second'
          },
          {
            code: 'U/umol',
            display: 'enzyme Unit per micromole'
          },
          {
            code: 'V',
            display: 'volt'
          },
          {
            code: 'W',
            display: 'Watt'
          },
          {
            code: 'Wb',
            display: 'Weber'
          },
          {
            code: '[APL\u0027U]',
            display: 'IgA anticardiolipin unit'
          },
          {
            code: '[APL\u0027U]/mL',
            display: 'IgA anticardiolipin unit per milliliter'
          },
          {
            code: '[AU]',
            display: 'allergy unit'
          },
          {
            code: '[Amb\u0027a\u00271\u0027U]',
            display: 'Amb a 1 units'
          },
          {
            code: '[BAU]',
            display: 'bioequivalent allergen unit'
          },
          {
            code: '[Btu]',
            display: 'British thermal unit'
          },
          {
            code: '[Btu_39]',
            display: 'British thermal unit at 39 °F'
          },
          {
            code: '[Btu_59]',
            display: 'British thermal unit at 59 °F'
          },
          {
            code: '[Btu_60]',
            display: 'British thermal unit at 60 °F'
          },
          {
            code: '[Btu_IT]',
            display: 'international table British thermal unit'
          },
          {
            code: '[Btu_m]',
            display: 'mean British thermal unit'
          },
          {
            code: '[Btu_th]',
            display: 'thermochemical British thermal unit'
          },
          {
            code: '[CCID_50]',
            display: 'CELL CULTURE INFECTIOUS DOSE 50%'
          },
          {
            code: '[CFU]',
            display: 'colony forming unit'
          },
          {
            code: '[CFU]/L',
            display: 'colony forming unit per liter'
          },
          {
            code: '[CFU]/mL',
            display: 'colony forming unit per milliliter'
          },
          {
            code: '[Cal]',
            display: 'nutrition label Calories'
          },
          {
            code: '[Ch]',
            display: 'French (catheter gauge)'
          },
          {
            code: '[D\u0027ag\u0027U]',
            display: 'D-ANTIGEN UNITS'
          },
          {
            code: '[FFU]',
            display: 'FOCUS-FORMING UNITS'
          },
          {
            code: '[GPL\u0027U]',
            display: 'IgG anticardiolipin unit'
          },
          {
            code: '[GPL\u0027U]/mL',
            display: 'IgG anticardiolipin unit per milliliter**'
          },
          {
            code: '[G]',
            display: 'Newtonian constant of gravitation'
          },
          {
            code: '[HPF]',
            display: 'high power field'
          },
          {
            code: '[HP]',
            display: 'horsepower'
          },
          {
            code: '[IU]',
            display: 'international unit'
          },
          {
            code: '[IU]/(2.h)',
            display: 'international unit per 2 hour'
          },
          {
            code: '[IU]/(24.h)',
            display: 'international unit per 24 hour'
          },
          {
            code: '[IU]/10*9',
            display: 'international unit per billion'
          },
          {
            code: '[IU]/L',
            display: 'international unit per liter'
          },
          {
            code: '[IU]/d',
            display: 'international unit per day'
          },
          {
            code: '[IU]/dL',
            display: 'international unit per deciliter'
          },
          {
            code: '[IU]/g',
            display: 'international unit per gram'
          },
          {
            code: '[IU]/h',
            display: 'international unit per hour'
          },
          {
            code: '[IU]/kg',
            display: 'international unit per kilogram'
          },
          {
            code: '[IU]/kg/d',
            display: 'international unit per kilogram per day'
          },
          {
            code: '[IU]/mL',
            display: 'international unit per milliliter'
          },
          {
            code: '[IU]/min',
            display: 'international unit per minute'
          },
          {
            code: '[LPF]',
            display: 'low power field'
          },
          {
            code: '[Lf]',
            display: 'LIMIT OF FLOCCULATION'
          },
          {
            code: '[MET]',
            display: 'metabolic equivalent'
          },
          {
            code: '[MPL\u0027U]',
            display: 'IgM anticardiolipin unit'
          },
          {
            code: '[MPL\u0027U]/mL',
            display: 'IgM anticardiolipin unit per milliliter**'
          },
          {
            code: '[PFU]',
            display: 'PLAQUE-FORMING UNITS'
          },
          {
            code: '[PNU]',
            display: 'PROTEIN NITROGEN UNITS'
          },
          {
            code: '[PRU]',
            display: 'peripheral vascular resistance unit'
          },
          {
            code: '[S]',
            display: 'Svedberg unit'
          },
          {
            code: '[TCID_50]',
            display: 'TISSUE CULTURE INFECTIOUS DOSE 50%'
          },
          {
            code: '[USP\u0027U]',
            display: 'UNITED STATES PHARMACOPEIA UNIT'
          },
          {
            code: '[acr_br]',
            display: 'acre'
          },
          {
            code: '[acr_us]',
            display: 'acre'
          },
          {
            code: '[arb\u0027U]',
            display: 'arbitrary unit'
          },
          {
            code: '[arb\u0027U]/L',
            display: 'arbitary unit / liter'
          },
          {
            code: '[arb\u0027U]/mL',
            display: 'arbitrary unit per milliliter'
          },
          {
            code: '[bbl_us]',
            display: 'barrel'
          },
          {
            code: '[bdsk\u0027U]',
            display: 'Bodansky unit'
          },
          {
            code: '[beth\u0027U]',
            display: 'Bethesda unit'
          },
          {
            code: '[beth\u0027U]',
            display: 'Bethesda unit'
          },
          {
            code: '[bf_i]',
            display: 'board foot'
          },
          {
            code: '[bu_br]',
            display: 'bushel'
          },
          {
            code: '[bu_us]',
            display: 'bushel'
          },
          {
            code: '[c]',
            display: 'velocity of light'
          },
          {
            code: '[car_Au]',
            display: 'carat of gold alloys'
          },
          {
            code: '[car_m]',
            display: 'metric carat'
          },
          {
            code: '[cft_i]',
            display: 'cubic foot'
          },
          {
            code: '[ch_br]',
            display: 'Gunter\u0027s chain'
          },
          {
            code: '[ch_us]',
            display: 'Gunter\u0027s chain Surveyor\u0027s chain'
          },
          {
            code: '[cicero]',
            display: 'cicero Didot\u0027s pica'
          },
          {
            code: '[cin_i]',
            display: 'cubic inch'
          },
          {
            code: '[cml_i]',
            display: 'circular mil'
          },
          {
            code: '[cr_i]',
            display: 'cord'
          },
          {
            code: '[crd_us]',
            display: 'cord'
          },
          {
            code: '[cup_us]',
            display: 'cup'
          },
          {
            code: '[cyd_i]',
            display: 'cubic yard'
          },
          {
            code: '[degF]',
            display: 'degree Fahrenheit'
          },
          {
            code: '[didot]',
            display: 'didot Didot\u0027s point'
          },
          {
            code: '[diop]',
            display: 'diopter'
          },
          {
            code: '[dpt_us]',
            display: 'dry pint'
          },
          {
            code: '[dqt_us]',
            display: 'dry quart'
          },
          {
            code: '[dr_ap]',
            display: 'dram drachm'
          },
          {
            code: '[dr_av]',
            display: 'Dram (US and British)'
          },
          {
            code: '[drp]',
            display: 'drop'
          },
          {
            code: '[drp]/[HPF]',
            display: 'drop / HPF'
          },
          {
            code: '[drp]/h',
            display: 'drop / hour'
          },
          {
            code: '[drp]/mL',
            display: 'drop / milliliter'
          },
          {
            code: '[drp]/min',
            display: 'drop / minute'
          },
          {
            code: '[drp]/s',
            display: 'drop / second'
          },
          {
            code: '[dye\u0027U]',
            display: 'Dye unit'
          },
          {
            code: '[e]',
            display: 'elementary charge'
          },
          {
            code: '[eps_0]',
            display: 'permittivity of vacuum'
          },
          {
            code: '[fdr_br]',
            display: 'fluid dram'
          },
          {
            code: '[fdr_us]',
            display: 'fluid dram'
          },
          {
            code: '[foz_br]',
            display: 'fluid ounce'
          },
          {
            code: '[foz_us]',
            display: 'fluid ounce'
          },
          {
            code: '[ft_br]',
            display: 'foot'
          },
          {
            code: '[ft_i]',
            display: 'Feet'
          },
          {
            code: '[ft_us]',
            display: 'foot'
          },
          {
            code: '[fth_br]',
            display: 'fathom'
          },
          {
            code: '[fth_i]',
            display: 'fathom'
          },
          {
            code: '[fth_us]',
            display: 'fathom'
          },
          {
            code: '[fur_us]',
            display: 'furlong'
          },
          {
            code: '[gal_br]',
            display: 'gallon'
          },
          {
            code: '[gal_us]',
            display: 'Queen Anne\u0027s wine gallon'
          },
          {
            code: '[gal_wi]',
            display: 'historical winchester gallon'
          },
          {
            code: '[gil_br]',
            display: 'gill'
          },
          {
            code: '[gil_us]',
            display: 'gill'
          },
          {
            code: '[gr]',
            display: 'grain'
          },
          {
            code: '[h]',
            display: 'Planck constant'
          },
          {
            code: '[hd_i]',
            display: 'hand'
          },
          {
            code: '[hnsf\u0027U]',
            display: 'Hounsfield unit'
          },
          {
            code: '[hp_C]',
            display: 'HOMEOPATHIC POTENCY OF CENTESIMAL SERIES'
          },
          {
            code: '[hp_M]',
            display: 'HOMEOPATHIC POTENCY OF MILLESIMAL SERIES'
          },
          {
            code: '[hp_Q]',
            display: 'HOMEOPATHIC POTENCY OF QUINTAMILLESIMAL SERIES'
          },
          {
            code: '[hp_X]',
            display: 'HOMEOPATHIC POTENCY OF DECIMAL SERIES'
          },
          {
            code: '[iU]',
            display: 'international unit'
          },
          {
            code: '[iU]',
            display: 'international unit'
          },
          {
            code: '[iU]/L',
            display: 'InternationalUnitsPerLiter'
          },
          {
            code: '[iU]/dL',
            display: 'InternationalUnitsPerDeciLiter'
          },
          {
            code: '[iU]/g',
            display: 'InternationalUnitsPerGram'
          },
          {
            code: '[iU]/kg',
            display: 'InternationalUnitsPerKilogram'
          },
          {
            code: '[iU]/mL',
            display: 'InternationalUnitsPerMilliLiter'
          },
          {
            code: '[in_br]',
            display: 'inch'
          },
          {
            code: '[in_i\u0027H2O]',
            display: 'inch (international) of water'
          },
          {
            code: '[in_i\u0027Hg]',
            display: 'inch of mercury column'
          },
          {
            code: '[in_i]',
            display: 'inch (international)'
          },
          {
            code: '[in_us]',
            display: 'inch'
          },
          {
            code: '[k]',
            display: 'Boltzmann constant'
          },
          {
            code: '[ka\u0027U]',
            display: 'King Armstrong unit'
          },
          {
            code: '[kn_br]',
            display: 'knot'
          },
          {
            code: '[kn_i]',
            display: 'knot'
          },
          {
            code: '[knk\u0027U]',
            display: 'Kunkel unit'
          },
          {
            code: '[kp_C]',
            display: 'HOMEOPATHIC POTENCY OF CENTESIMAL KORSAKOVIAN SERIES'
          },
          {
            code: '[lb_ap]',
            display: 'pound'
          },
          {
            code: '[lb_av]',
            display: 'pound (US and British)'
          },
          {
            code: '[lb_tr]',
            display: 'pound'
          },
          {
            code: '[lbf_av]',
            display: 'pound force'
          },
          {
            code: '[lcwt_av]',
            display: 'long hunderdweight British hundredweight'
          },
          {
            code: '[ligne]',
            display: 'ligne French line'
          },
          {
            code: '[lk_br]',
            display: 'link for Gunter\u0027s chain'
          },
          {
            code: '[lk_us]',
            display: 'link for Gunter\u0027s chain'
          },
          {
            code: '[lne]',
            display: 'line'
          },
          {
            code: '[lton_av]',
            display: 'long ton British ton'
          },
          {
            code: '[ly]',
            display: 'light-year'
          },
          {
            code: '[m_e]',
            display: 'electron mass'
          },
          {
            code: '[m_p]',
            display: 'proton mass'
          },
          {
            code: '[mclg\u0027U]',
            display: 'Mac Lagan unit'
          },
          {
            code: '[mesh_i]',
            display: 'mesh'
          },
          {
            code: '[mi_br]',
            display: 'mile'
          },
          {
            code: '[mi_i]',
            display: 'statute mile'
          },
          {
            code: '[mi_us]',
            display: 'mile'
          },
          {
            code: '[mil_i]',
            display: 'mil'
          },
          {
            code: '[mil_us]',
            display: 'mil'
          },
          {
            code: '[min_br]',
            display: 'minim'
          },
          {
            code: '[min_us]',
            display: 'minim'
          },
          {
            code: '[mu_0]',
            display: 'permeability of vacuum'
          },
          {
            code: '[nmi_br]',
            display: 'nautical mile'
          },
          {
            code: '[nmi_i]',
            display: 'nautical mile'
          },
          {
            code: '[oz_ap]',
            display: 'ounce (US and British)'
          },
          {
            code: '[oz_av]',
            display: 'ounce (US and British)'
          },
          {
            code: '[oz_tr]',
            display: 'ounce'
          },
          {
            code: '[p\u0027diop]',
            display: 'prism diopter'
          },
          {
            code: '[pH]',
            display: 'pH'
          },
          {
            code: '[pc_br]',
            display: 'pace'
          },
          {
            code: '[pca]',
            display: 'pica'
          },
          {
            code: '[pca_pr]',
            display: 'Printer\u0027s pica'
          },
          {
            code: '[pi]',
            display: 'the number pi'
          },
          {
            code: '[pi].rad/min',
            display: 'the number pi * radian / minute'
          },
          {
            code: '[pied]',
            display: 'pied French foot'
          },
          {
            code: '[pk_br]',
            display: 'peck'
          },
          {
            code: '[pk_us]',
            display: 'peck'
          },
          {
            code: '[pnt]',
            display: 'point'
          },
          {
            code: '[pnt_pr]',
            display: 'Printer\u0027s point'
          },
          {
            code: '[pouce]',
            display: 'pouce French inch'
          },
          {
            code: '[ppb]',
            display: 'part per billion'
          },
          {
            code: '[ppm]',
            display: 'part per million'
          },
          {
            code: '[ppth]',
            display: 'parts per thousand'
          },
          {
            code: '[pptr]',
            display: 'part per trillion'
          },
          {
            code: '[pptr]',
            display: 'parts per trillion'
          },
          {
            code: '[psi]',
            display: 'pound per square inch'
          },
          {
            code: '[pt_br]',
            display: 'pint'
          },
          {
            code: '[pt_us]',
            display: 'pint'
          },
          {
            code: '[pwt_tr]',
            display: 'pennyweight'
          },
          {
            code: '[qt_br]',
            display: 'quart'
          },
          {
            code: '[qt_us]',
            display: 'quart'
          },
          {
            code: '[rch_us]',
            display: 'Ramden\u0027s chain Engineer\u0027s chain'
          },
          {
            code: '[rd_br]',
            display: 'rod'
          },
          {
            code: '[rd_us]',
            display: 'rod'
          },
          {
            code: '[rlk_us]',
            display: 'link for Ramden\u0027s chain'
          },
          {
            code: '[sc_ap]',
            display: 'scruple'
          },
          {
            code: '[sct]',
            display: 'section'
          },
          {
            code: '[scwt_av]',
            display: 'short hundredweight U.S. hundredweight'
          },
          {
            code: '[sft_i]',
            display: 'square foot (international)'
          },
          {
            code: '[sin_i]',
            display: 'square inch (international)'
          },
          {
            code: '[smgy\u0027U]',
            display: 'Somogyi unit'
          },
          {
            code: '[smi_us]',
            display: 'square mile'
          },
          {
            code: '[smoot]',
            display: 'Smoot'
          },
          {
            code: '[srd_us]',
            display: 'square rod'
          },
          {
            code: '[ston_av]',
            display: 'short ton U.S. ton'
          },
          {
            code: '[stone_av]',
            display: 'stone British stone'
          },
          {
            code: '[syd_i]',
            display: 'square yard'
          },
          {
            code: '[tb\u0027U]',
            display: 'tuberculin unit'
          },
          {
            code: '[tbs_us]',
            display: 'tablespoon (US)'
          },
          {
            code: '[todd\u0027U]',
            display: 'Todd unit'
          },
          {
            code: '[todd\u0027U]',
            display: 'Todd unit'
          },
          {
            code: '[tsp_us]',
            display: 'teaspoon'
          },
          {
            code: '[twp]',
            display: 'township'
          },
          {
            code: '[yd_br]',
            display: 'yard'
          },
          {
            code: '[yd_i]',
            display: 'yard'
          },
          {
            code: '[yd_us]',
            display: 'yard'
          },
          {
            code: 'a',
            display: 'year'
          },
          {
            code: 'a_g',
            display: 'mean Gregorian year'
          },
          {
            code: 'a_j',
            display: 'mean Julian year'
          },
          {
            code: 'a_t',
            display: 'tropical year'
          },
          {
            code: 'ag',
            display: 'attogram'
          },
          {
            code: 'ar',
            display: 'are'
          },
          {
            code: 'atm',
            display: 'standard atmosphere'
          },
          {
            code: 'att',
            display: 'technical atmosphere'
          },
          {
            code: 'b',
            display: 'barn'
          },
          {
            code: 'bar',
            display: 'bar'
          },
          {
            code: 'bit',
            display: 'bit'
          },
          {
            code: 'bit_s',
            display: 'bit'
          },
          {
            code: 'cL',
            display: 'centiliter'
          },
          {
            code: 'cP',
            display: 'centiPoise'
          },
          {
            code: 'cSt',
            display: 'centiStokes'
          },
          {
            code: 'cal',
            display: 'calorie'
          },
          {
            code: 'cal_IT',
            display: 'international table calorie'
          },
          {
            code: 'cal_[15]',
            display: 'calorie at 15 °C'
          },
          {
            code: 'cal_[20]',
            display: 'calorie at 20 °C'
          },
          {
            code: 'cal_m',
            display: 'mean calorie'
          },
          {
            code: 'cal_th',
            display: 'thermochemical calorie'
          },
          {
            code: 'cd',
            display: 'candela'
          },
          {
            code: 'cg',
            display: 'centigram'
          },
          {
            code: 'circ',
            display: 'circle'
          },
          {
            code: 'cm',
            display: 'centimeter'
          },
          {
            code: 'cm2',
            display: 'square centimeter'
          },
          {
            code: 'cm2/s',
            display: 'square centimeter per second'
          },
          {
            code: 'cm3',
            display: 'cubic centimeter'
          },
          {
            code: 'cm[H2O]',
            display: 'centimeter of water'
          },
          {
            code: 'cm[H2O]/(s.m)',
            display: 'centimeter of water column / second * meter'
          },
          {
            code: 'cm[H2O]/L/s',
            display: 'centimeter of water per liter per second'
          },
          {
            code: 'cm[H2O]/s/m',
            display: 'centimeter of water per second per meter'
          },
          {
            code: 'cm[Hg]',
            display: 'centimeter of mercury'
          },
          {
            code: 'd',
            display: 'day'
          },
          {
            code: 'dB',
            display: 'decibel'
          },
          {
            code: 'dL',
            display: 'deciliter'
          },
          {
            code: 'daL/min',
            display: 'dekaliter per minute'
          },
          {
            code: 'daL/min/m2',
            display: 'dekaliter per minute per square meter'
          },
          {
            code: 'deg',
            display: 'degree'
          },
          {
            code: 'deg/s',
            display: 'degree per second'
          },
          {
            code: 'dg',
            display: 'decigram'
          },
          {
            code: 'dm',
            display: 'decimeter'
          },
          {
            code: 'dm2/s2',
            display: 'square decimeter per square second'
          },
          {
            code: 'dyn',
            display: 'dyne'
          },
          {
            code: 'dyn.s/(cm.m2)',
            display: 'dyne second per centimeter per square meter'
          },
          {
            code: 'dyn.s/cm',
            display: 'dyne second per centimeter'
          },
          {
            code: 'eV',
            display: 'electronvolt'
          },
          {
            code: 'eq',
            display: 'equivalents'
          },
          {
            code: 'eq/L',
            display: 'equivalents / liter'
          },
          {
            code: 'eq/mL',
            display: 'equivalents / milliliter'
          },
          {
            code: 'eq/mmol',
            display: 'equivalents / millimole'
          },
          {
            code: 'eq/umol',
            display: 'equivalents / micromole'
          },
          {
            code: 'erg',
            display: 'erg'
          },
          {
            code: 'fL',
            display: 'femtoliter'
          },
          {
            code: 'fL/nL',
            display: 'femtoliter / nanoliter'
          },
          {
            code: 'fg',
            display: 'femtogram'
          },
          {
            code: 'fm',
            display: 'femtometer'
          },
          {
            code: 'fmol',
            display: 'femtomole'
          },
          {
            code: 'fmol/L',
            display: 'femtomole per liter'
          },
          {
            code: 'fmol/g',
            display: 'femtomole per gram'
          },
          {
            code: 'fmol/mL',
            display: 'femtomole / milliliter'
          },
          {
            code: 'fmol/mg',
            display: 'femtomole / milligram'
          },
          {
            code: 'fmol/mg',
            display: 'femtomole per milligram'
          },
          {
            code: 'g',
            display: 'gram'
          },
          {
            code: 'g%',
            display: 'gram percent'
          },
          {
            code: 'g.m',
            display: 'gram * meter'
          },
          {
            code: 'g/(100.g)',
            display: 'gram per 100 gram'
          },
          {
            code: 'g/(12.h)',
            display: 'gram per 12 hour'
          },
          {
            code: 'g/(24.h)',
            display: 'gram per 24 hour'
          },
          {
            code: 'g/(3.d)',
            display: 'gram per 3 days'
          },
          {
            code: 'g/(4.h)',
            display: 'gram per 4 hour'
          },
          {
            code: 'g/(48.h)',
            display: 'gram per 48 hour'
          },
          {
            code: 'g/(5.h)',
            display: 'gram per 5 hour'
          },
          {
            code: 'g/(6.h)',
            display: 'gram per 6 hour'
          },
          {
            code: 'g/(72.h)',
            display: 'gram per 72 hour'
          },
          {
            code: 'g/(8.h)',
            display: 'gram / 8 * hour'
          },
          {
            code: 'g/(8.kg.h)',
            display: 'gram / 8 * kilogram * hour'
          },
          {
            code: 'g/(kg.h)',
            display: 'gram / kilogram * hour'
          },
          {
            code: 'g/(kg.min)',
            display: 'gram / kilogram * minute'
          },
          {
            code: 'g/L',
            display: 'gram per liter'
          },
          {
            code: 'g/cm3',
            display: 'gram per cubic centimeter'
          },
          {
            code: 'g/d',
            display: 'gram per day'
          },
          {
            code: 'g/dL',
            display: 'gram per deciliter'
          },
          {
            code: 'g/g',
            display: 'gram per gram'
          },
          {
            code: 'g/h',
            display: 'gram per hour'
          },
          {
            code: 'g/h/m2',
            display: 'gram per hour per square meter'
          },
          {
            code: 'g/kg',
            display: 'gram per kilogram'
          },
          {
            code: 'g/kg/(8.h)',
            display: 'gram per  kilogram per 8 hour'
          },
          {
            code: 'g/kg/d',
            display: 'gram per kilogram per day'
          },
          {
            code: 'g/kg/h',
            display: 'gram per kilogram per hour'
          },
          {
            code: 'g/kg/min',
            display: 'gram per kilogram per minute'
          },
          {
            code: 'g/m2',
            display: 'grams Per Square Meter'
          },
          {
            code: 'g/mL',
            display: 'gram per milliliter'
          },
          {
            code: 'g/mg',
            display: 'gram per milligram'
          },
          {
            code: 'g/min',
            display: 'gram per minute'
          },
          {
            code: 'g/mmol',
            display: 'gram per millimole'
          },
          {
            code: 'g/mol',
            display: 'gram per mole'
          },
          {
            code: 'gf',
            display: 'gram-force'
          },
          {
            code: 'gon',
            display: 'gon grade'
          },
          {
            code: 'h',
            display: 'hour'
          },
          {
            code: 'hL',
            display: 'hectoliter'
          },
          {
            code: 'kBq',
            display: 'kiloBecquerel'
          },
          {
            code: 'kL',
            display: 'kiloliter'
          },
          {
            code: 'kPa',
            display: 'kiloPascal'
          },
          {
            code: 'kU',
            display: 'kilo enzyme unit'
          },
          {
            code: 'kU/L',
            display: 'kiloenzyme Unit per liter'
          },
          {
            code: 'kU/g',
            display: 'kiloenzyme Unit per gram'
          },
          {
            code: 'kU/h',
            display: 'kiloUnit / hour'
          },
          {
            code: 'kU/mL',
            display: 'kilo enzyme unit per milliliter'
          },
          {
            code: 'k[IU]/L',
            display: 'kilo international unit per liter'
          },
          {
            code: 'k[IU]/mL',
            display: 'kilo international unit per milliliter'
          },
          {
            code: 'k[iU]/mL',
            display: 'KiloInternationalUnitsPerMilliLiter'
          },
          {
            code: 'kat',
            display: 'katal'
          },
          {
            code: 'kat/L',
            display: 'katal / liter'
          },
          {
            code: 'kat/kg',
            display: 'katal / kilogram'
          },
          {
            code: 'kcal',
            display: 'kilocalorie'
          },
          {
            code: 'kcal/(8.h)',
            display: 'kilocalorie / 8 * hour'
          },
          {
            code: 'kcal/[oz_av]',
            display: 'kilocalorie per ounce (US \u0026 British)'
          },
          {
            code: 'kcal/d',
            display: 'kilocalorie per day'
          },
          {
            code: 'kcal/h',
            display: 'kilocalorie per hour'
          },
          {
            code: 'kcal/kg/(24.h)',
            display: 'kilocalorie per kilogram per 24 hour'
          },
          {
            code: 'kg',
            display: 'kilogram'
          },
          {
            code: 'kg.m/s',
            display: 'kilogram meter per second'
          },
          {
            code: 'kg/(s.m2)',
            display: 'kilogram per second per square meter'
          },
          {
            code: 'kg/L',
            display: 'kilogram per liter'
          },
          {
            code: 'kg/h',
            display: 'kilogram per hour'
          },
          {
            code: 'kg/m2',
            display: 'kilogram / (meter ^ 2)'
          },
          {
            code: 'kg/m3',
            display: 'kilogram / (meter ^ 3)'
          },
          {
            code: 'kg/min',
            display: 'kilogram / minute'
          },
          {
            code: 'kg/mol',
            display: 'kilogram per mole'
          },
          {
            code: 'kg/s',
            display: 'kilogram / second'
          },
          {
            code: 'km',
            display: 'kilometer'
          },
          {
            code: 'ks',
            display: 'kilosecond'
          },
          {
            code: 'lm',
            display: 'lumen'
          },
          {
            code: 'lm.m2',
            display: 'lumen square meter'
          },
          {
            code: 'lm/m2',
            display: 'lumen / (meter ^ 2)'
          },
          {
            code: 'lx',
            display: 'lux'
          },
          {
            code: 'm',
            display: 'meter'
          },
          {
            code: 'm/s',
            display: 'meter per second'
          },
          {
            code: 'm/s2',
            display: 'meter per square second'
          },
          {
            code: 'm2',
            display: 'square meter'
          },
          {
            code: 'm2/s',
            display: 'square meter per second'
          },
          {
            code: 'm3/s',
            display: 'cubic meter per second'
          },
          {
            code: 'mA',
            display: 'milliAmpère'
          },
          {
            code: 'mCi',
            display: 'milliCurie'
          },
          {
            code: 'mL',
            display: 'milliliter'
          },
          {
            code: 'mL/(10.h)',
            display: 'milliliter per 10 hour'
          },
          {
            code: 'mL/(12.h)',
            display: 'milliliter per 12 hour'
          },
          {
            code: 'mL/(2.h)',
            display: 'milliliter per 2 hour'
          },
          {
            code: 'mL/(24.h)',
            display: 'milliliter per 24 hour'
          },
          {
            code: 'mL/(4.h)',
            display: 'milliliter per 4 hour'
          },
          {
            code: 'mL/(5.h)',
            display: 'milliliter per 5 hour'
          },
          {
            code: 'mL/(6.h)',
            display: 'milliliter per 6 hour'
          },
          {
            code: 'mL/(72.h)',
            display: 'milliliter per 72 hour'
          },
          {
            code: 'mL/(8.h)',
            display: 'milliliter per 8 hour'
          },
          {
            code: 'mL/(kg.min)',
            display: 'milliliter / kilogram * minute'
          },
          {
            code: 'mL/L',
            display: 'milliliter per liter'
          },
          {
            code: 'mL/[sin_i]',
            display: 'milliliter per square inch (international)'
          },
          {
            code: 'mL/cm[H2O]',
            display: 'milliliter / centimeter of water column'
          },
          {
            code: 'mL/d',
            display: 'milliliter per day'
          },
          {
            code: 'mL/dL',
            display: 'milliliter per deciliter'
          },
          {
            code: 'mL/h',
            display: 'milliliter per hour'
          },
          {
            code: 'mL/kg',
            display: 'milliliter per kilogram'
          },
          {
            code: 'mL/kg/(8.h)',
            display: 'milliliter per kilogram per 8 hour'
          },
          {
            code: 'mL/kg/d',
            display: 'milliliter per kilogram per day'
          },
          {
            code: 'mL/kg/h',
            display: 'milliliter per kilogram per hour'
          },
          {
            code: 'mL/kg/min',
            display: 'milliliter per kilogram per minute'
          },
          {
            code: 'mL/m2',
            display: 'milliliter per square meter'
          },
          {
            code: 'mL/mbar',
            display: 'milliliter per millibar'
          },
          {
            code: 'mL/min',
            display: 'milliliter per minute'
          },
          {
            code: 'mL/min/(173.10*-2.m2)',
            display: 'milliliter / minute / 173 * (the number ten for arbitrary powers ^ -2) * (meter ^ 2)'


          },
          {
            code: 'mL/min/1.73.m2',
            display: 'milliliter per minute per 1.73 square meter'
          },
          {
            code: 'mL/min/m2',
            display: 'milliliter per minute per square meter'
          },
          {
            code: 'mL/mm',
            display: 'milliliter per millimeter'
          },
          {
            code: 'mL/s',
            display: 'milliliter per second'
          },
          {
            code: 'mPa',
            display: 'millipascal'
          },
          {
            code: 'mPa.s',
            display: 'millipascal second'
          },
          {
            code: 'mU',
            display: 'millienzyme Unit'
          },
          {
            code: 'mU/L',
            display: 'millienzyme Unit per liter'
          },
          {
            code: 'mU/g',
            display: 'millienzyme Unit per gram'
          },
          {
            code: 'mU/mL',
            display: 'millienzyme Unit per milliliter'
          },
          {
            code: 'mU/mL/min',
            display: 'millienzyme Unit per milliliter per minute'
          },
          {
            code: 'mU/mg',
            display: 'milliUnit / milligram'
          },
          {
            code: 'mU/min',
            display: 'milliUnit / minute'
          },
          {
            code: 'mU/mmol',
            display: 'millienzyme Unit per millimole'
          },
          {
            code: 'mV',
            display: 'milliVolt'
          },
          {
            code: 'm[H2O]',
            display: 'meter of water column'
          },
          {
            code: 'm[Hg]',
            display: 'meter of mercury column'
          },
          {
            code: 'm[IU]/L',
            display: 'milli international unit per liter'
          },
          {
            code: 'm[IU]/mL',
            display: 'milli international unit per milliliter'
          },
          {
            code: 'm[iU]',
            display: 'milliinternational unit'
          },
          {
            code: 'mbar',
            display: 'millibar'
          },
          {
            code: 'mbar.s/L',
            display: 'millibar second per liter'
          },
          {
            code: 'mbar/L/s',
            display: 'millibar per liter per second'
          },
          {
            code: 'meq',
            display: 'milliequivalent'
          },
          {
            code: 'meq/(12.h)',
            display: 'milliequivalent per 12 hour'
          },
          {
            code: 'meq/(2.h)',
            display: 'milliequivalent per 2 hour'
          },
          {
            code: 'meq/(24.h)',
            display: 'milliequivalent per 24 hour'
          },
          {
            code: 'meq/(8.h)',
            display: 'milliequivalent per 8 hour'
          },
          {
            code: 'meq/(8.h.kg)',
            display: 'milliequivalents / 8 * hour * kilogram'
          },
          {
            code: 'meq/(kg.d)',
            display: 'milliequivalents / kilogram * day'
          },
          {
            code: 'meq/L',
            display: 'milliequivalent per liter'
          },
          {
            code: 'meq/d',
            display: 'milliequivalent per day'
          },
          {
            code: 'meq/dL',
            display: 'milliequivalent per deciliter'
          },
          {
            code: 'meq/g',
            display: 'milliequivalent per gram'
          },
          {
            code: 'meq/h',
            display: 'milliequivalent per hour'
          },
          {
            code: 'meq/kg',
            display: 'milliequivalent per kilogram'
          },
          {
            code: 'meq/kg/h',
            display: 'milliequivalent per kilogram per hour'
          },
          {
            code: 'meq/kg/min',
            display: 'milliequivalents / kilogram / minute'
          },
          {
            code: 'meq/m2',
            display: 'milliequivalent per square meter'
          },
          {
            code: 'meq/mL',
            display: 'milliequivalent per milliliter'
          },
          {
            code: 'meq/min',
            display: 'milliequivalent per minute'
          },
          {
            code: 'mg',
            display: 'milligram'
          },
          {
            code: 'mg/(10.h)',
            display: 'milligram per 10 hour'
          },
          {
            code: 'mg/(12.h)',
            display: 'milligram per 12 hour'
          },
          {
            code: 'mg/(18.h)',
            display: 'milligram per 18 hour'
          },
          {
            code: 'mg/(2.h)',
            display: 'milligram per 2 hour'
          },
          {
            code: 'mg/(24.h)',
            display: 'milligram per 24 hour'
          },
          {
            code: 'mg/(6.h)',
            display: 'milligram per 6 hour'
          },
          {
            code: 'mg/(72.h)',
            display: 'milligram per 72 hour'
          },
          {
            code: 'mg/(8.h)',
            display: 'milligram per 8 hour'
          },
          {
            code: 'mg/(8.h.kg)',
            display: 'milligram / 8 * hour * kilogram'
          },
          {
            code: 'mg/(kg.h)',
            display: 'milligram / kilogram * hour'
          },
          {
            code: 'mg/L',
            display: 'milligram per liter'
          },
          {
            code: 'mg/d',
            display: 'milligram per day'
          },
          {
            code: 'mg/d/(173.10*-2.m2)',
            display: 'milligram / day / 173 * (the number ten for arbitrary powers ^ -2) * (meter ^ 2)'
          },
          {
            code: 'mg/d/1.73.m2',
            display: 'milligram per day per 1.73 square meter'
          },
          {
            code: 'mg/dL',
            display: 'milligram per deciliter'
          },
          {
            code: 'mg/g',
            display: 'milligram per gram'
          },
          {
            code: 'mg/h',
            display: 'milligram per hour'
          },
          {
            code: 'mg/kg',
            display: 'milligram per kilogram'
          },
          {
            code: 'mg/kg/(24.h)',
            display: 'milligram / kilogram / 24 * hour'
          },
          {
            code: 'mg/kg/(8.h)',
            display: 'milligram per kilogram per 8 hour'
          },
          {
            code: 'mg/kg/d',
            display: 'milligram per kilogram per day'
          },
          {
            code: 'mg/kg/h',
            display: 'milligram per kilogram per hour'
          },
          {
            code: 'mg/kg/min',
            display: 'milligram per kilogram per minute'
          },
          {
            code: 'mg/m2',
            display: 'milligram per square meter'
          },
          {
            code: 'mg/m3',
            display: 'milligram per cubic meter'
          },
          {
            code: 'mg/mL',
            display: 'milligram per milliliter'
          },
          {
            code: 'mg/mg',
            display: 'milligram per milligram'
          },
          {
            code: 'mg/min',
            display: 'milligram per minute'
          },
          {
            code: 'mg/mmol',
            display: 'milligram per millimole'
          },
          {
            code: 'mg/wk',
            display: 'milligram per week'
          },
          {
            code: 'mho',
            display: 'mho'
          },
          {
            code: 'min',
            display: 'minute'
          },
          {
            code: 'mm',
            display: 'millimeter'
          },
          {
            code: 'mm/h',
            display: 'millimeter per hour'
          },
          {
            code: 'mm/min',
            display: 'millimeter per minute'
          },
          {
            code: 'mm2',
            display: 'square millimeter'
          },
          {
            code: 'mm3',
            display: 'cubic millimeter'
          },
          {
            code: 'mm[H2O]',
            display: 'millimeter of water'
          },
          {
            code: 'mm[Hg]',
            display: 'millimeter of mercury'
          },
          {
            code: 'mmol',
            display: 'millimole'
          },
          {
            code: 'mmol/(12.h)',
            display: 'millimole per 12 hour'
          },
          {
            code: 'mmol/(18.h)',
            display: 'millimole per 18 hour'
          },
          {
            code: 'mmol/(2.h)',
            display: 'millimole per 2 hour'
          },
          {
            code: 'mmol/(24.h)',
            display: 'millimole per 24 hour'
          },
          {
            code: 'mmol/(5.h)',
            display: 'millimole per 5 hour'
          },
          {
            code: 'mmol/(6.h)',
            display: 'millimole per 6 hour'
          },
          {
            code: 'mmol/(8.h)',
            display: 'millimole per 8 hour'
          },
          {
            code: 'mmol/(8.h.kg)',
            display: 'millimole / 8 * hour * kilogram'
          },
          {
            code: 'mmol/L',
            display: 'millimole per liter'
          },
          {
            code: 'mmol/L/s',
            display: 'millimole per liter per second'
          },
          {
            code: 'mmol/d',
            display: 'millimole per day'
          },
          {
            code: 'mmol/dL',
            display: 'millimole per deciliter'
          },
          {
            code: 'mmol/g',
            display: 'millimole per gram'
          },
          {
            code: 'mmol/h',
            display: 'millimole per hour'
          },
          {
            code: 'mmol/h/mg',
            display: 'millimole per hour per milligram'
          },
          {
            code: 'mmol/kg',
            display: 'millimole per kilogram'
          },
          {
            code: 'mmol/kg/(8.h)',
            display: 'millimole per kilogram per 8 hour'
          },
          {
            code: 'mmol/kg/d',
            display: 'millimole per kilogram per day'
          },
          {
            code: 'mmol/kg/h',
            display: 'millimole per kilogram per hour'
          },
          {
            code: 'mmol/kg/min',
            display: 'millimole per kilogram per minute'
          },
          {
            code: 'mmol/m',
            display: 'millimole / meter'
          },
          {
            code: 'mmol/m2',
            display: 'millimole per square meter'
          },
          {
            code: 'mmol/min',
            display: 'millimole per minute'
          },
          {
            code: 'mmol/mmol',
            display: 'millimole per millimole'
          },
          {
            code: 'mmol/mol',
            display: 'millimole per mole'
          },
          {
            code: 'mmol/s/L',
            display: 'millimole per second per liter'
          },
          {
            code: 'mo',
            display: 'month'
          },
          {
            code: 'mo_g',
            display: 'mean Gregorian month'
          },
          {
            code: 'mo_j',
            display: 'mean Julian month'
          },
          {
            code: 'mo_s',
            display: 'synodal month'
          },
          {
            code: 'mol',
            display: 'mole'
          },
          {
            code: 'mol/L',
            display: 'mole per liter'
          },
          {
            code: 'mol/d',
            display: 'mole per day'
          },
          {
            code: 'mol/kg',
            display: 'mole per kilogram'
          },
          {
            code: 'mol/kg/s',
            display: 'mole per kilogram per second'
          },
          {
            code: 'mol/m3',
            display: 'mole per cubic meter'
          },
          {
            code: 'mol/mL',
            display: 'mole per milliliter'
          },
          {
            code: 'mol/mol',
            display: 'mole per mole'
          },
          {
            code: 'mol/s',
            display: 'mole per second'
          },
          {
            code: 'mosm',
            display: 'milliosmole'
          },
          {
            code: 'mosm/L',
            display: 'milliosmole per liter'
          },
          {
            code: 'mosm/kg',
            display: 'milliosmole per kilogram'
          },
          {
            code: 'ms',
            display: 'millisecond'
          },
          {
            code: 'nCi',
            display: 'nanoCurie'
          },
          {
            code: 'nL',
            display: 'nanoliter'
          },
          {
            code: 'nU/mL',
            display: 'nanoenzyme unit per milliliter'
          },
          {
            code: 'nU',
            display: 'nanoenzyme unit'
          },
          {
            code: 'ng',
            display: 'nanogram'
          },
          {
            code: 'ng/(24.h)',
            display: 'nanogram per 24 hour'
          },
          {
            code: 'ng/(8.h)',
            display: 'nanogram per 8 hour'
          },
          {
            code: 'ng/(8.h.kg)',
            display: 'nanogram / 8 * hour * kilogram'
          },
          {
            code: 'ng/(kg.d)',
            display: 'nanogram / kilogram * day'
          },
          {
            code: 'ng/(kg.h)',
            display: 'nanogram / kilogram * hour'
          },
          {
            code: 'ng/(kg.min)',
            display: 'nanogram / kilogram * minute'
          },
          {
            code: 'ng/10*6',
            display: 'nanogram per million'
          },
          {
            code: 'ng/L',
            display: 'nanogram per liter'
          },
          {
            code: 'ng/U',
            display: 'nanogram per enzyme unit'
          },
          {
            code: 'ng/d',
            display: 'nanogram per day'
          },
          {
            code: 'ng/dL',
            display: 'nanogram per deciliter'
          },
          {
            code: 'ng/dL/h',
            display: 'nanogram / deciliter / hour'
          },
          {
            code: 'ng/g',
            display: 'nanogram per gram'
          },
          {
            code: 'ng/h',
            display: 'nanogram per hour'
          },
          {
            code: 'ng/kg',
            display: 'nanogram per kilogram'
          },
          {
            code: 'ng/kg/(8.h)',
            display: 'nanogram per kilogram per 8 hour'
          },
          {
            code: 'ng/kg/h',
            display: 'nanogram per kilogram per hour'
          },
          {
            code: 'ng/kg/min',
            display: 'nanogram per kilogram per minute'
          },
          {
            code: 'ng/m2',
            display: 'nanogram per square meter'
          },
          {
            code: 'ng/mL',
            display: 'nanogram per milliliter'
          },
          {
            code: 'ng/mL/h',
            display: 'nanogram per milliliter per hour'
          },
          {
            code: 'ng/mg',
            display: 'nanogram per milligram'
          },
          {
            code: 'ng/mg/h',
            display: 'nanogram per milligram per hour'
          },
          {
            code: 'ng/min',
            display: 'nanogram per minute'
          },
          {
            code: 'ng/s',
            display: 'nanogram per second'
          },
          {
            code: 'nkat',
            display: 'nanokatal'
          },
          {
            code: 'nm',
            display: 'nanometer'
          },
          {
            code: 'nm/s/L',
            display: 'nanometer per second per liter'
          },
          {
            code: 'nmol',
            display: 'nanomole'
          },
          {
            code: 'nmol/(24.h)',
            display: 'nanomole per 24 hour'
          },
          {
            code: 'nmol/L',
            display: 'nanomole per liter'
          },
          {
            code: 'nmol/L/mmol',
            display: 'nanomole per liter per millimole'
          },
          {
            code: 'nmol/L/s',
            display: 'nanomole per liter per second'
          },
          {
            code: 'nmol/d',
            display: 'nanomole per day'
          },
          {
            code: 'nmol/dL',
            display: 'nanomole per deciliter'
          },
          {
            code: 'nmol/g',
            display: 'nanomole per gram'
          },
          {
            code: 'nmol/h/L',
            display: 'nanomole per hour per liter'
          },
          {
            code: 'nmol/h/mL',
            display: 'nanomole per hour per milliliter'
          },
          {
            code: 'nmol/h/mg',
            display: 'nanomole per hour per milligram'
          },
          {
            code: 'nmol/m/mg',
            display: 'nanomole per meter per milligram'
          },
          {
            code: 'nmol/mL',
            display: 'nanomole per milliliter'
          },
          {
            code: 'nmol/mL/h',
            display: 'nanomole per milliliter per hour'
          },
          {
            code: 'nmol/mL/min',
            display: 'nanomole per milliliter per minute'
          },
          {
            code: 'nmol/mg',
            display: 'nanomole per milligram'
          },
          {
            code: 'nmol/mg/h',
            display: 'nanomole per milligram per hour'
          },
          {
            code: 'nmol/min',
            display: 'nanomole per minute'
          },
          {
            code: 'nmol/min/10*6',
            display: 'nanomole per minute per million'
          },
          {
            code: 'nmol/min/mL',
            display: 'nanomole per minute per milliliter'
          },
          {
            code: 'nmol/min/mg',
            display: 'nanomole per minute per milligram'
          },
          {
            code: 'nmol/mmol',
            display: 'nanomole per millimole'
          },
          {
            code: 'nmol/mol',
            display: 'nanomole per mole'
          },
          {
            code: 'nmol/nmol',
            display: 'nanomole per nanomole'
          },
          {
            code: 'nmol/s',
            display: 'nanomole per second'
          },
          {
            code: 'nmol/s/L',
            display: 'nanomole per second per liter'
          },
          {
            code: 'ns',
            display: 'nanosecond'
          },
          {
            code: 'osm',
            display: 'osmole'
          },
          {
            code: 'osm/L',
            display: 'osmole per liter'
          },
          {
            code: 'osm/kg',
            display: 'osmole per kilogram'
          },
          {
            code: 'pA',
            display: 'picoampere'
          },
          {
            code: 'pL',
            display: 'picoliter'
          },
          {
            code: 'pT',
            display: 'picotesla'
          },
          {
            code: 'pc',
            display: 'parsec'
          },
          {
            code: 'pg',
            display: 'picogram'
          },
          {
            code: 'pg/L',
            display: 'picogram per liter'
          },
          {
            code: 'pg/dL',
            display: 'picogram per deciliter'
          },
          {
            code: 'pg/mL',
            display: 'picogram per milliliter'
          },
          {
            code: 'pg/mg',
            display: 'picogram per milligram'
          },
          {
            code: 'pg/mm',
            display: 'picogram per millimeter'
          },
          {
            code: 'ph',
            display: 'phot'
          },
          {
            code: 'pkat',
            display: 'picokatal'
          },
          {
            code: 'pm',
            display: 'picometer'
          },
          {
            code: 'pmol',
            display: 'picomole'
          },
          {
            code: 'pmol/(24.h)',
            display: 'picomole per 24 hour'
          },
          {
            code: 'pmol/L',
            display: 'picomole per liter'
          },
          {
            code: 'pmol/d',
            display: 'picomole per day'
          },
          {
            code: 'pmol/dL',
            display: 'picomole per deciliter'
          },
          {
            code: 'pmol/g',
            display: 'picomole per gram'
          },
          {
            code: 'pmol/h/mL',
            display: 'picomole per hour per milliliter'
          },
          {
            code: 'pmol/h/mg',
            display: 'picomole per hour per milligram'
          },
          {
            code: 'pmol/mL',
            display: 'picomole per milliliter'
          },
          {
            code: 'pmol/mg',
            display: 'picomole per milligram'
          },
          {
            code: 'pmol/min',
            display: 'picomole per minute'
          },
          {
            code: 'pmol/min/mg',
            display: 'picomole per minute per milligram'
          },
          {
            code: 'pmol/mmol',
            display: 'picomole per millimole'
          },
          {
            code: 'pmol/mol',
            display: 'picomole per mole'
          },
          {
            code: 'pmol/umol',
            display: 'picomole per micromole'
          },
          {
            code: 'ps',
            display: 'picosecond'
          },
          {
            code: 'rad',
            display: 'radian'
          },
          {
            code: 's',
            display: 'second'
          },
          {
            code: 'sb',
            display: 'stilb'
          },
          {
            code: 'sph',
            display: 'spere'
          },
          {
            code: 'sr',
            display: 'steradian'
          },
          {
            code: 'st',
            display: 'stere'
          },
          {
            code: 't',
            display: 'tonne'
          },
          {
            code: 'u',
            display: 'unified atomic mass unit'
          },
          {
            code: 'uCi',
            display: 'MICROCURIE'
          },
          {
            code: 'uL',
            display: 'microliter'
          },
          {
            code: 'uL/(2.h)',
            display: 'microliter per 2 hour'
          },
          {
            code: 'uL/h',
            display: 'microliter per hour'
          },
          {
            code: 'uOhm',
            display: 'microOhm'
          },
          {
            code: 'uU',
            display: 'microUnit'
          },
          {
            code: 'uU/L',
            display: 'micro enzyme unit per liter'
          },
          {
            code: 'uU/g',
            display: 'micro enzyme unit per gram'
          },
          {
            code: 'uU/mL',
            display: 'micro enzyme unit per milliliter'
          },
          {
            code: 'uV',
            display: 'microvolt'
          },
          {
            code: 'u[IU]',
            display: 'micro international unit'
          },
          {
            code: 'u[IU]/L',
            display: 'microinternational unit per liter'
          },
          {
            code: 'u[IU]/mL',
            display: 'micro international unit per milliliter'
          },
          {
            code: 'ueq',
            display: 'microequivalents'
          },
          {
            code: 'ueq/L',
            display: 'microequivalent per liter'
          },
          {
            code: 'ueq/mL',
            display: 'microequivalent per milliliter'
          },
          {
            code: 'ug',
            display: 'microgram'
          },
          {
            code: 'ug/(100.g)',
            display: 'microgram per 100 gram'
          },
          {
            code: 'ug/(24.h)',
            display: 'microgram per 24 hour'
          },
          {
            code: 'ug/(8.h)',
            display: 'microgram per 8 hour'
          },
          {
            code: 'ug/(kg.d)',
            display: 'microgram / kilogram * day'
          },
          {
            code: 'ug/(kg.h)',
            display: 'microgram / kilogram * hour'
          },
          {
            code: 'ug/L',
            display: 'microgram per liter'
          },
          {
            code: 'ug/L/(24.h)',
            display: 'microgram per liter per 24 hour'
          },
          {
            code: 'ug/[sft_i]',
            display: 'microgram per square foot (international)'
          },
          {
            code: 'ug/d',
            display: 'microgram per day'
          },
          {
            code: 'ug/dL',
            display: 'microgram per deciliter'
          },
          {
            code: 'ug/g',
            display: 'microgram per gram'
          },
          {
            code: 'ug/h',
            display: 'microgram per hour'
          },
          {
            code: 'ug/kg',
            display: 'microgram per kilogram'
          },
          {
            code: 'ug/kg/(8.h)',
            display: 'microgram per kilogram per 8 hour'
          },
          {
            code: 'ug/kg/d',
            display: 'microgram per kilogram per day'
          },
          {
            code: 'ug/kg/h',
            display: 'microgram per kilogram per hour'
          },
          {
            code: 'ug/kg/min',
            display: 'microgram per kilogram per minute'
          },
          {
            code: 'ug/m2',
            display: 'microgram per square meter'
          },
          {
            code: 'ug/m3',
            display: 'microgram per cubic meter'
          },
          {
            code: 'ug/mL',
            display: 'microgram per milliliter'
          },
          {
            code: 'ug/mg',
            display: 'microgram per milligram'
          },
          {
            code: 'ug/min',
            display: 'microgram per minute'
          },
          {
            code: 'ug/mmol',
            display: 'microgram per millimole'
          },
          {
            code: 'ug/ng',
            display: 'microgram per nanogram'
          },
          {
            code: 'ukat',
            display: 'microkatal'
          },
          {
            code: 'um',
            display: 'micrometer'
          },
          {
            code: 'um/s',
            display: 'micrometer per second'
          },
          {
            code: 'umol',
            display: 'micromole'
          },
          {
            code: 'umol/(2.h)',
            display: 'micromole per 2 hour'
          },
          {
            code: 'umol/(24.h)',
            display: 'micromole per 24 hour'
          },
          {
            code: 'umol/(8.h)',
            display: 'micromole per 8 hour'
          },
          {
            code: 'umol/L',
            display: 'micromole per liter'
          },
          {
            code: 'umol/L/h',
            display: 'micromole per liter per hour'
          },
          {
            code: 'umol/d',
            display: 'micromole per day'
          },
          {
            code: 'umol/dL',
            display: 'micromole per deciliter'
          },
          {
            code: 'umol/g',
            display: 'micromole per gram'
          },
          {
            code: 'umol/h',
            display: 'micromole per hour'
          },
          {
            code: 'umol/h/L',
            display: 'micromole per hour per liter'
          },
          {
            code: 'umol/h/g',
            display: 'micromole / hour / gram'
          },
          {
            code: 'umol/h/mg',
            display: 'micromole per hour per milligram'
          },
          {
            code: 'umol/kg',
            display: 'micromole per kilogram'
          },
          {
            code: 'umol/m',
            display: 'micromole / meter'
          },
          {
            code: 'umol/mL',
            display: 'micromole per milliliter'
          },
          {
            code: 'umol/mL/min',
            display: 'micromole per milliliter per minute'
          },
          {
            code: 'umol/mg',
            display: 'micromole per milligram'
          },
          {
            code: 'umol/min',
            display: 'micromole per minute'
          },
          {
            code: 'umol/min/L',
            display: 'micromole per minute per liter'
          },
          {
            code: 'umol/min/g',
            display: 'micromole per minute per gram'
          },
          {
            code: 'umol/mmol',
            display: 'micromole per millimole'
          },
          {
            code: 'umol/mol',
            display: 'micromole per mole'
          },
          {
            code: 'umol/umol',
            display: 'micromole per micromole'
          },
          {
            code: 'us',
            display: 'microsecond'
          },
          {
            code: 'wk',
            display: 'week'
          }
        ]
      }
    ]
  }
}
