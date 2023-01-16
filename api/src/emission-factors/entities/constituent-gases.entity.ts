import { CrudValidationGroups } from '@nestjsx/crud';
import { Exclude } from 'class-transformer';
import { IsEmpty, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { EmissionFactor } from './emission-factor.enitity';

const { CREATE, UPDATE } = CrudValidationGroups;

@Entity()
export class ConstituentGases {
  @IsOptional({ groups: [UPDATE] })
  @IsEmpty({ groups: [CREATE] })
  @Exclude()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @IsOptional({ groups: [UPDATE] })
  @IsNotEmpty({ groups: [CREATE] })
  @IsNumber({}, { always: true })
  @Column({ type: 'float', nullable: false })
  co2e_total: number;
}
