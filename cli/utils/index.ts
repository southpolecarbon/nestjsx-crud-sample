import { IEmissionFactor, IRow } from '../types';
import * as countryLookup from 'country-code-lookup';
import axios from './axios';
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
  const uncertainty: number | null =
    row.uncertainty === '' ? null : Number(row.uncertainty);
  const regionName = getRegion(row.region);

  const unitType = [getUnitType(row.activity_unit)];
  const unit = row.activity_unit === 'g' ? 'g/kg' : `kg/${row.activity_unit}`;

  const supportedCalculationMethods: string[] = [
    { label: 'ar4', value: row['kgco2e-ar4'] },
    { label: 'ar5', value: row['kgco2e-ar5'] },
  ].reduce(
    (methods: string[], item: { label: string; value: string | number }) => {
      if (item.value !== '' && item.value !== 'not-supplied') {
        return [...methods, item.label];
      }

      return methods;
    },
    []
  );

  let factorCalculationMethod: string = 'ar4';
  let co2e: number = 0.0;

  if (supportedCalculationMethods.includes('ar5')) {
    factorCalculationMethod = 'ar5';
    co2e = Number(row['kgco2e-ar5']);
  }

  if (supportedCalculationMethods.includes('ar4')) {
    factorCalculationMethod = 'ar4';
    co2e = Number(row['kgco2e-ar4']);
  }

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
    supported_calculation_methods: supportedCalculationMethods,
    factor: co2e,
    factor_calculation_method: factorCalculationMethod,
    factor_calculation_origin: row.contributor,
    constituent_gases: {
      co2e_total: co2e,
    },
  };

  return emissionFactor;
};

export const insertEmissionFactors = async (
  emissionFactors: IEmissionFactor[]
): Promise<void> => {
  const { status, data } = await axios.post('/emissionFactors/bulk', {
    bulk: emissionFactors,
  });

  console.log('emission factor inserted successfully');

  try {
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
        switch (region) {
          case 'EU':
            regionName = 'European Union';
            break;
          case 'NZ-WLG':
            regionName = 'Wellington, WGN, NZ';
            break;
          case 'NZ-WLG':
            regionName = 'Wellington, WGN, NZ';
            break;
          case 'EU_S_AMERICA':
            regionName = 'Europe and South America';
            break;
          case 'ASIA_AFRICA':
            regionName = 'Asia and Africa';
            break;
          case 'N_AMERICA':
            regionName = 'North America';
            break;

          default:
            regionName = countryLookup.byIso(region)?.country || region;
            break;
        }
      }
    }

    return regionName;
  } catch (err: unknown) {}

  return region;
};
