import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { EmissionFactor } from './entities/emission-factor.enitity';
import { uniq } from 'lodash';

@Injectable()
export class EmissionFactorsService extends TypeOrmCrudService<EmissionFactor> {
  constructor(@InjectRepository(EmissionFactor) emissionFactor) {
    super(emissionFactor);
  }

  getSelect(query, options) {
    return uniq(super.getSelect(query, options));
  }
}
