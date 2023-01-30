import Decimal from 'decimal.js';
import { Row } from '../types';

export const getSupportedCalculationMethods = (
  values: { label: string; value: string }[]
): ('ar4' | 'ar5')[] => {
  return values.reduce(
    (
      methods: ('ar4' | 'ar5')[],
      item: { label: string; value: string | number }
    ) => {
      if (item.value !== '' && item.value !== 'not-supplied') {
        return [...methods, item.label as 'ar4' | 'ar5'];
      }
      return methods;
    },
    []
  );
};

export const getFactorAndCalculationMethod = (
  row: Row,
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
