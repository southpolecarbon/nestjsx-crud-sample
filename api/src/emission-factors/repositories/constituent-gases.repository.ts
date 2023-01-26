import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { ConstituentGases } from '../entities/constituent-gases.entity';

@Injectable()
export class ConstituentGasesRepository extends Repository<ConstituentGases> {
  constructor(private dataSource: DataSource) {
    super(ConstituentGases, dataSource.createEntityManager());
  }
}
