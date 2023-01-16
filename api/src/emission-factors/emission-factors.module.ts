import { Module } from '@nestjs/common';
import { EmissionFactorsService } from './emission-factors.service';
import { EmissionFactorsController } from './emission-factors.controller';
import { EmissionFactor } from './entities/emission-factor.enitity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([EmissionFactor])],
  controllers: [EmissionFactorsController],
  providers: [EmissionFactorsService],
  exports: [EmissionFactorsService],
})
export class EmissionFactorsModule {}
