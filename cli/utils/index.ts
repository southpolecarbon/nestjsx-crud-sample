import { IEmissionFactor, IRow } from '../types';
import * as countryLookup from 'country-code-lookup';
import Decimal from 'decimal.js';
import axios from './axios';
import { getRegionName } from './regions';
const iso3166 = require('iso-3166-2');

export const getUnitType = (unit: string): string => {
  const units = [
    {
      label: 'Area',
      values: ['ha', 'km2', 'm2', 'ft2'],
    },
    {
      label: 'Data',
      values: ['mb', 'gb', 'tb'],
    },
    {
      label: 'Distance',
      values: ['km', 'mi', 'nmi', 'm', 'ft', 'mile'],
    },
    {
      label: 'Energy',
      values: ['kwh', 'tj', 'gj', 'mj', 'mmbtu'],
    },
    {
      label: 'Money',
      values: [
        'afn',
        'dzd',
        'ars',
        'aud',
        'bhd',
        'brl',
        'cad',
        'kyd',
        'cny',
        'dkk',
        'egp',
        'eur',
        'hkd',
        'huf',
        'isk',
        'inr',
        'iqd',
        'ils',
        'jpy',
        'lbp',
        'mxn',
        'mad',
        'nzd',
        'nok',
        'qar',
        'rub',
        'sar',
        'sgd',
        'zar',
        'krw',
        'sek',
        'chf',
        'twd',
        'thb',
        'tnd',
        'try',
        'aed',
        'gbp',
        'vef',
        'usd',
      ],
    },
    {
      label: 'Time',
      values: ['year', 'day', 'hour', 'h', 'm', 's', 'ms'],
    },
    {
      label: 'Volume',
      values: [
        'l',
        'ml',
        'm3',
        'standard_cubic_foot',
        'gallons_us',
        'gal (us)',
      ],
    },
    {
      label: 'Weight',
      values: ['g', 'kg', 't', 'ton', 'tonne', 'short ton'],
    },
    {
      label: 'Volume',
      values: ['kg', 't', 'ton', 'scf'],
    },
    {
      label: 'WeightOverDistance',
      values: ['tonne-km', 'ton-mile'],
    },
    {
      label: 'PassengerOverDistance',
      values: ['passenger-km', 'passenger-mile'],
    },
    {
      label: 'Number',
      values: ['container-moved', 'person-night', 'room-night'],
    },
    {
      label: 'ContainerOverDistance',
      values: ['teu-km'],
    },
    {
      label: 'DataOverTime',
      values: ['tb-hour', 'gb-hour'],
    },
    {
      label: 'NumberOverTime',
      values: ['cpu-hour'],
    },
  ];

  const result = units.find((item) => item.values.includes(unit.toLowerCase()));

  return result?.label || '';
};

export function* chunks<T>(arr: T[], n: number): Generator<T[], void> {
  for (let i = 0; i < arr.length; i += n) {
    yield arr.slice(i, i + n);
  }
}

export const generateEmissionFactor = (row: IRow): IEmissionFactor => {
  const uncertainty = row.uncertainty === '' ? null : Number(row.uncertainty);
  const regionName = getRegion(row.region);

  const unitType = [getUnitType(row.activity_unit)];
  const unit = row.activity_unit === 'g' ? 'g/kg' : `kg/${row.activity_unit}`;

  const supportedCalculationMethods: string[] = getSupportedCalculationMethods([
    { label: 'ar4', value: row['kgco2e-ar4'] },
    { label: 'ar5', value: row['kgco2e-ar5'] },
  ]);

  const { factor, factorCalculationMethod } = getFactorAndCalculationMethod(
    row,
    supportedCalculationMethods
  );

  const emissionFactor: IEmissionFactor = {
    activity_id: row.activity_id,
    uuid: row.uuid,
    name: row.name,
    category: row.category,
    sector: row.sector,
    source: row.source,
    source_link: row.source_link,
    uncertainty,
    year: row.year_released,
    region: row.region,
    region_name: regionName,
    description: row.description,
    unit_type: unitType,
    unit,
    lca_activity: row.lca_activity,
    access_type: 'public',
    supported_calculation_methods:
      supportedCalculationMethods.length > 0
        ? supportedCalculationMethods
        : ['ar4', 'ar5'],
    factor,
    factor_calculation_method: factorCalculationMethod,
    factor_calculation_origin: row.contributor,
    constituent_gases: {
      co2e_total: factor,
    },
  };

  return emissionFactor;
};

export const insertEmissionFactors = async (
  emissionFactors: IEmissionFactor[]
): Promise<void> => {
  try {
    await axios.post('/emissionFactors/bulk', {
      bulk: emissionFactors,
    });
  } catch (err) {
    console.log('Failed to insert emission factors', err);
    throw err;
  }
};

export const getRegion = (region: string): string => {
  if (region.toLowerCase() === 'global') {
    return 'Global';
  }

  try {
    let regionName = countryLookup.byFips(region)?.country;

    if (!regionName) {
      const isoRegion = iso3166.subdivision(region);
      if (isoRegion !== null && Object.keys(isoRegion).length > 0) {
        regionName = `${isoRegion.name}, ${isoRegion.countryCode}`;
      } else {
        regionName =
          getRegionName(region) ||
          countryLookup.byIso(region)?.country ||
          region;
      }
    }

    return regionName;
  } catch (err: unknown) {}

  return '';
};

const getSupportedCalculationMethods = (
  values: { label: string; value: string }[]
): string[] => {
  return values.reduce(
    (methods: string[], item: { label: string; value: string | number }) => {
      if (item.value !== '' && item.value !== 'not-supplied') {
        return [...methods, item.label];
      }

      return methods;
    },
    []
  );
};

const getFactorAndCalculationMethod = (
  row: IRow,
  supportedCalculationMethods: string[]
): { factor: number; factorCalculationMethod: string } => {
  const ar5GWP: { [key: string]: number } = { kgco2: 1, kgch4: 28, kgn2o: 265 };

  let factor: number = 0.0;
  let factorCalculationMethod: string = 'ar4';

  if (supportedCalculationMethods.includes('ar5')) {
    factorCalculationMethod = 'ar5';
    factor = Number(row['kgco2e-ar5']);
  } else if (supportedCalculationMethods.includes('ar4')) {
    factorCalculationMethod = 'ar4';
    factor = Number(row['kgco2e-ar4']);
  }

  if (
    (row['kgco2e-ar4'] === '' || row['kgco2e-ar4'] === 'not-supplied') &&
    (row['kgco2e-ar5'] === '' || row['kgco2e-ar5'] === 'not-supplied')
  ) {
    const factorValue = [
      { type: 'kgco2', value: row.kgco2 },
      { type: 'kgch4', value: row.kgch4 },
      { type: 'kgn2o', value: row.kgn2o },
    ].reduce((factorValue, current) => {
      if (current.value !== '' && current.value !== 'not-supplied') {
        return factorValue.add(
          new Decimal(current.value).mul(ar5GWP[current.type])
        );
      }

      return factorValue;
    }, new Decimal(0.0));

    factorCalculationMethod = 'ar5';
    factor = Number(factorValue.toString());
  }

  return { factor, factorCalculationMethod };
};
