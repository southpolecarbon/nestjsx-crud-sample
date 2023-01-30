import { EmissionFactor, EmissionFactorSchema, Row } from '../types';
import axios from './axios';
import {
  getFactorAndCalculationMethod,
  getSupportedCalculationMethods,
} from './helpers';
import { getRegion } from './regions';
import { getUnitType } from './units';

export const generateEmissionFactor = (row: Row): EmissionFactor => {
  const uncertainty = row.uncertainty === '' ? null : Number(row.uncertainty);
  const regionName = getRegion(row.region);

  const unitType = [getUnitType(row.activity_unit)];
  const unit = row.activity_unit === 'g' ? 'g/kg' : `kg/${row.activity_unit}`;

  const supportedCalculationMethods = getSupportedCalculationMethods([
    { label: 'ar4', value: row['kgco2e-ar4'] },
    { label: 'ar5', value: row['kgco2e-ar5'] },
  ]);

  const { factor, factorCalculationMethod } = getFactorAndCalculationMethod(
    row,
    supportedCalculationMethods
  );

  const emissionFactor = EmissionFactorSchema.parse({
    ...row,
    year: row.year_released,
    uncertainty,
    region_name: regionName,
    unit_type: unitType,
    unit,
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
  });

  return emissionFactor;
};

export const insertEmissionFactors = async (
  emissionFactors: EmissionFactor[]
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
