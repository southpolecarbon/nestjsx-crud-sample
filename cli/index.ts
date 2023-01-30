import * as fs from 'fs';
import { resolve } from 'node:path';
import { readJsonSync } from 'fs-extra';
import { program } from 'commander';
import { parse } from 'csv-parse';
import { chunks, generateEmissionFactor, insertEmissionFactors } from './utils';

import { Row, EmissionFactor, RowSchema } from './types';

const { version } = readJsonSync(resolve(__dirname, '..', 'package.json'));

program
  .name('ef-importer')
  .description('cli to import climatiq emission factors to dcs')
  .version(version, '-v, --version')
  .option(
    '-f, --file <file>',
    'csv file to read',
    './data/OpenEmissionFactorsDB.csv'
  )
  .parse();

const filePath: string = program.opts().file;

const emissionFactors: EmissionFactor[] = [];

fs.createReadStream(filePath, 'utf-8')
  .pipe(
    parse({
      delimiter: ',',
      from_line: 1,
      trim: true,
      columns: (header) => header.map((column: string) => column.toLowerCase()),
    })
  )
  .on('data', (row: Row) => {
    const parsedData = RowSchema.parse(row);
    const emissionFactor = generateEmissionFactor(parsedData);

    emissionFactors.push(emissionFactor);
  })
  .on('end', async () => {
    const chunkedEmissionFactors = [...chunks(emissionFactors, 10)];

    for (const batch of chunkedEmissionFactors) {
      await insertEmissionFactors(batch);
    }

    console.log(
      `${emissionFactors.length} emission factors inserted successfully`
    );
  })
  .on('error', (error: unknown) => {
    throw error;
  });
