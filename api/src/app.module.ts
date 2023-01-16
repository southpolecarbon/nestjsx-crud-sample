import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import { UsersModule } from './user/users.module';
import { EmissionFactorsModule } from './emission-factors/emission-factors.module';
import { EmissionFactor } from './emission-factors/entities/emission-factor.enitity';
import { ConstituentGases } from './emission-factors/entities/constituent-gases.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      database: 'app',
      port: 5435,
      username: 'user',
      password: 'password',
      entities: [User, ConstituentGases, EmissionFactor],
      synchronize: true,
    }),
    UsersModule,
    EmissionFactorsModule,
  ],
})
export class AppModule {}
