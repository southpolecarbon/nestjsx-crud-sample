export interface IRow {
  uuid: string;
  sector: string;
  category: string;
  activity_id: string;
  name: string;
  activity_unit: string;
  'kgco2e-ar5': string;
  'kgco2e-ar4': string;
  kgco2: string;
  kgch4: string;
  kgn2o: string;
  'kgco2e-otherghgs-ar5': string;
  'kgco2e-otherghgs-ar4': string;
  uncertainty: string;
  scope: string;
  lca_activity: string;
  source: string;
  dataset: string;
  year_released: string;
  year_valid_from: string;
  years_calculated_from: string;
  region: string;
  data_quality: string;
  contributor: string;
  date_accessed: string;
  description: string;
  source_link: string;
}

export interface IEmissionFactor {
  activity_id: string;
  uuid: string;
  name: string;
  category: string;
  sector: string;
  source: string;
  source_link: string;
  uncertainty: number | null;
  year: string;
  region: string;
  region_name: string;
  description: string;
  unit_type: string[];
  unit: string;
  lca_activity: string;
  access_type: string;
  supported_calculation_methods: string[];
  factor: number;
  factor_calculation_method: string;
  factor_calculation_origin: string;
  constituent_gases: {
    co2e_total: number;
  };
}
