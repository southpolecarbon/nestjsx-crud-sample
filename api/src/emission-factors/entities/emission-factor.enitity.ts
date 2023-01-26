import { CrudValidationGroups } from '@nestjsx/crud';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsDefined,
  IsEmpty,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { ConstituentGases } from './constituent-gases.entity';

const { CREATE, UPDATE } = CrudValidationGroups;

enum SupportedCalculationMethods {
  AR4 = 'ar4',
  AR5 = 'ar5',
}

@Entity()
export class EmissionFactor {
  @IsOptional({ groups: [UPDATE] })
  @IsNotEmpty({ groups: [CREATE] })
  @IsString({ always: true })
  @Column({ type: 'varchar', nullable: false })
  access_type: string;

  @IsOptional({ groups: [UPDATE] })
  @IsNotEmpty({ groups: [CREATE] })
  @IsString({ always: true })
  @Column({ type: 'varchar', nullable: false })
  activity_id: string;

  @IsOptional({ groups: [UPDATE] })
  @IsNotEmpty({ groups: [CREATE] })
  @IsString({ always: true })
  @Column({ type: 'varchar', nullable: false })
  category: string;

  @IsDefined()
  @Type(() => ConstituentGases)
  @ValidateNested({ always: true })
  @OneToOne(() => ConstituentGases, (constituentGases) => constituentGases, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  constituent_gases: ConstituentGases;

  @IsOptional({ groups: [UPDATE] })
  @IsNotEmpty({ groups: [CREATE] })
  @IsString({ always: true })
  @Column({ type: 'varchar', nullable: false })
  description: string;

  @IsOptional({ groups: [UPDATE] })
  @IsNotEmpty({ groups: [CREATE] })
  @IsNumber({}, { always: true })
  @Column({ type: 'float', nullable: false })
  factor: number;

  @IsOptional({ groups: [UPDATE] })
  @IsNotEmpty({ groups: [CREATE] })
  @IsString({ always: true })
  @Column({ type: 'varchar', nullable: false })
  factor_calculation_method: string;

  @IsOptional({ groups: [UPDATE] })
  @IsNotEmpty({ groups: [CREATE] })
  @IsString({ always: true })
  @Column({ type: 'varchar', nullable: false })
  factor_calculation_origin: string;

  @IsOptional({ groups: [UPDATE] })
  @IsEmpty({ groups: [CREATE] })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @IsOptional({ groups: [UPDATE] })
  @IsNotEmpty({ groups: [CREATE] })
  @IsString({ always: true })
  @Column({ type: 'varchar', nullable: false })
  lca_activity: string;

  @IsOptional({ groups: [UPDATE] })
  @IsNotEmpty({ groups: [CREATE] })
  @IsString({ always: true })
  @Column({ type: 'varchar', nullable: false })
  name: string;

  @IsOptional({ groups: [UPDATE] })
  @IsNotEmpty({ groups: [CREATE] })
  @IsString({ always: true })
  @Column({ type: 'varchar', nullable: false })
  region: string;

  @IsOptional({ groups: [UPDATE] })
  @IsNotEmpty({ groups: [CREATE] })
  @IsString({ always: true })
  @Column({ type: 'varchar', nullable: false })
  region_name: string;

  @IsOptional({ groups: [UPDATE] })
  @IsNotEmpty({ groups: [CREATE] })
  @IsString({ always: true })
  @Column({ type: 'varchar', nullable: false })
  sector: string;

  @IsOptional({ groups: [UPDATE] })
  @IsNotEmpty({ groups: [CREATE] })
  @IsString({ always: true })
  @Column({ type: 'varchar', nullable: false })
  source: string;

  @IsOptional({ groups: [UPDATE] })
  @IsNotEmpty({ groups: [CREATE] })
  @IsString({ always: true })
  @Column({ type: 'varchar', nullable: false })
  source_link: string;

  @IsOptional({ groups: [UPDATE] })
  @IsNotEmpty({ groups: [CREATE] })
  @IsArray()
  @IsEnum(SupportedCalculationMethods, { each: true })
  @Column({
    type: 'enum',
    enum: SupportedCalculationMethods,
    nullable: false,
    array: true,
  })
  supported_calculation_methods: SupportedCalculationMethods[];

  @IsOptional({ groups: [CREATE, UPDATE] })
  @IsNumber({}, { always: true })
  @Column({ nullable: true })
  uncertainty: number | null;

  @IsOptional({ groups: [UPDATE] })
  @IsNotEmpty({ groups: [CREATE] })
  @IsString({ always: true })
  @Column({ type: 'varchar', nullable: false })
  unit: string;

  @IsOptional({ groups: [UPDATE] })
  @IsNotEmpty({ groups: [CREATE] })
  @IsArray()
  @IsString({ each: true })
  @Column({ type: 'varchar', nullable: false, array: true })
  unit_type: string[];

  @IsOptional({ groups: [UPDATE] })
  @IsNotEmpty({ groups: [CREATE] })
  @IsString({ always: true })
  @Column({ type: 'varchar', nullable: false, unique: true })
  uuid: string;

  @IsOptional({ groups: [UPDATE] })
  @IsNotEmpty({ groups: [CREATE] })
  @IsString({ always: true })
  @Column({ type: 'varchar', nullable: false })
  year: string;
}
