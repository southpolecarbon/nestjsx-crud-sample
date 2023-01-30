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
