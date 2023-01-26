import { Module } from '@nestjs/common';
import { EmissionFactorsService } from './emission-factors.service';
import { EmissionFactorsController } from './emission-factors.controller';
import { EmissionFactor } from './entities/emission-factor.enitity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConstituentGases } from './entities/constituent-gases.entity';
import { ConstituentGasesRepository } from './repositories/constituent-gases.repository';

@Module({
  imports: [TypeOrmModule.forFeature([EmissionFactor, ConstituentGases])],
  controllers: [EmissionFactorsController],
  providers: [ConstituentGasesRepository, EmissionFactorsService],
  exports: [EmissionFactorsService],
})
export class EmissionFactorsModule {}
