import * as countryLookup from 'country-code-lookup';
const iso3166 = require('iso-3166-2');

const getRegionName = (region: string): string | null => {
  const regions: { region: string; regionName: string }[] = [
    { region: 'EU', regionName: 'European Union' },
    { region: 'NZ-WLG', regionName: 'Wellington, WGN, NZ' },
    { region: 'EU_S_AMERICA', regionName: 'Europe and South America' },
    { region: 'ASIA_AFRICA', regionName: 'Asia and Africa' },
    { region: 'N_AMERICA', regionName: 'North America' },
    { region: 'FR-2A-FR-2B', regionName: 'Corse-du-Sud, FR' },
    { region: 'PF-FAA', regionName: "Tahiti Fa'a'à, PF" },
    { region: 'FR-OIA', regionName: 'Corscia, 2B, FR' },
    { region: 'FR-PAR', regionName: 'Paris, 75, FR' },
    { region: 'EURASIA', regionName: 'Europe and Eurasia' },
    { region: 'LATAM', regionName: 'Latin America' },
    { region: 'GB-LON', regionName: 'London, LND, GB' },
    { region: 'ZA-CPT', regionName: 'Cape Town, WC, ZA' },
    { region: 'HK-HKG', regionName: 'Hong Kong, HK' },
    { region: 'JP-TYO', regionName: 'Tokyo, 13, JP' },
    { region: 'KR-SEL', regionName: 'Seoul, 11, KR' },
    { region: 'JP-OSA', regionName: 'Osaka, 27, JP' },
    { region: 'IN-BOM', regionName: 'Mumbai (ex Bombay), MH, IN' },
    { region: 'SG-SIN', regionName: 'Singapore, SG' },
    { region: 'AU-SYD', regionName: 'Sydney, NSW, AU' },
    { region: 'CA-MTR', regionName: 'Montreal, QC, CA' },
    { region: 'CN-BJS', regionName: 'Beijing, BJ, CN' },
    { region: 'CN-NX', regionName: 'Ningxia Huizu Zizhiqu, CN' },
    { region: 'DE-FRA', regionName: 'Frankfurt am Main, HE, DE' },
    { region: 'SE-STO', regionName: 'Stockholm, AB, SE' },
    { region: 'IT-MIL', regionName: 'Milano, IT' },
    { region: 'IE-DUB', regionName: 'Dublin, IE' },
    { region: 'BH-AMH', regionName: 'Al Manamah, 13, BH' },
    { region: 'BR-SAO', regionName: 'São Paulo, SP, BR' },
    { region: 'US-GIR', regionName: 'Gilroy, CA, US' },
    { region: 'AU-CBR', regionName: 'Canberra, ACT, AU' },
    { region: 'AU-MEL', regionName: 'Melbourne, VIC, AU' },
    { region: 'CA-TOR', regionName: 'Toronto, ON, CA' },
    { region: 'CA-QUE', regionName: 'Quebec, QC, CA' },
    { region: 'IN-PNQ', regionName: 'Pune, MH, IN' },
    { region: 'IN-MAA', regionName: 'Chennai (ex Madras), TN, IN' },
    { region: 'JP-STM', regionName: 'Saitama, 11, JP' },
    { region: 'NO-OSL', regionName: 'Oslo, 03, NO' },
    { region: 'ZA-HDL', regionName: 'Heriotdale/Johannesburg, ZA' },
    { region: 'SE-GVX', regionName: 'Gävle, X, SE' },
    { region: 'CH-ZRH', regionName: 'Zurich, ZH, CH' },
    { region: 'GB-CDF', regionName: 'Cardiff, CRF, GB' },
    { region: 'AE-DXB', regionName: 'Dubai, DU, AE' },
    { region: 'NL-ZBD', regionName: 'Middenmeer, NH, NL' },
    { region: 'IN-DEL', regionName: 'Delhi, DL, IN' },
    { region: 'ID-JKT', regionName: 'Jakarta, Java, JK, ID' },
    { region: 'PL-WAW', regionName: 'Warszawa, 14, PL' },
    { region: 'FI-HMN', regionName: 'Hamina (Fredrikshamn), 09, FI' },
    { region: 'BE-GHI', regionName: 'Saint-Ghislain, WHT, BE' },
    { region: 'NL-EEM', regionName: 'Eemshaven, NL' },
    { region: 'US-LAX', regionName: 'Los Angeles, CA, US' },
    { region: 'US-SLC', regionName: 'Salt Lake City, UT, US' },
    { region: 'US-LAS', regionName: 'Las Vegas, NV, US' },
    { region: 'US-AKGD', regionName: 'ASCC Alaska Grid, US' },
    { region: 'US-AKMS', regionName: 'ASCC Miscellaneous, US' },
    { region: 'US-AZNM', regionName: 'WECC Southwest, US' },
    { region: 'US-CAMX', regionName: 'WECC California, US' },
    { region: 'US-ERCT', regionName: 'ERCOT All, US' },
    { region: 'US-FRCC', regionName: 'FRCC All, US' },
    { region: 'US-HIMS', regionName: 'HICC Miscellaneous, US' },
    { region: 'US-HIOA', regionName: 'HICC Oahu, US' },
    { region: 'US-MROE', regionName: 'MRO East, US' },
    { region: 'US-MROW', regionName: 'MRO West, US' },
    { region: 'US-NEWE', regionName: 'NPCC New England, US' },
    { region: 'US-NWPP', regionName: 'WECC Northwest, US' },
    { region: 'US-NYCW', regionName: 'NPCC NYC/Westchester, US' },
    { region: 'US-NYLI', regionName: 'NPCC Long Island, US' },
    { region: 'US-NYUP', regionName: 'NPCC Upstate NY, US' },
    { region: 'US-PRMS', regionName: 'Puerto Rico Miscellaneous, US' },
    { region: 'US-RFCE', regionName: 'RFC East, US' },
    { region: 'US-RFCM', regionName: 'RFC Michigan, US' },
    { region: 'US-RFCW', regionName: 'RFC West, US' },
    { region: 'US-RMPA', regionName: 'WECC Rockies, US' },
    { region: 'US-SPNO', regionName: 'SPP North, US' },
    { region: 'US-SPSO', regionName: 'SPP South, US' },
    { region: 'US-SRMV', regionName: 'SERC Mississippi Valley, US' },
    { region: 'US-SRMW', regionName: 'SERC Midwest, US' },
    { region: 'US-SRSO', regionName: 'SERC South, US' },
    { region: 'US-SRTV', regionName: 'SERC Tennessee Valley, US' },
    { region: 'US-SRVC', regionName: 'SERC Virginia/Carolina, US' },
    {
      region: 'ROW_WA',
      regionName: 'Central Asia and Pacific Asia, Oceania, Antarctica',
    },
    { region: 'ROW_WE', regionName: 'East Europe and Iceland' },
    {
      region: 'ROW_WF',
      regionName: 'Africa except Egypt and South Africa',
    },
    { region: 'ROW_WL', regionName: 'Latin America except Brazil' },
    { region: 'ROW_WM', regionName: 'Middle East, Asia and Egypt' },
    { region: 'CN-C', regionName: 'Central China grid, CN' },
    { region: 'CN-E', regionName: 'East China grid, CN' },
    { region: 'CN-HI', regionName: 'Hainan Sheng, CN' },
    { region: 'CN-N', regionName: 'North China grid, CN' },
    { region: 'CN-NE', regionName: 'China Northeast grid, CN' },
    { region: 'CN-NW', regionName: 'China Northwest grid, CN' },
    { region: 'CN-S', regionName: 'China Southern grid, CN' },
  ];

  return (
    regions.find((currentRegion) => currentRegion.region === region)
      ?.regionName || null
  );
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
