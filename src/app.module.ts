import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqljs',
      entities: [User],
      synchronize: true,
    }),
    UserModule,
  ],
})
export class AppModule {}
