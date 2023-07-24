import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { getPostgresConfig } from '@configs/postgres.config';

import { Modules } from '@modules/modules.module';

import { ValidatorsModule } from '@validators/validators.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env.dev' }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getPostgresConfig,
    }),

    Modules,
    ValidatorsModule,
  ],
})
export class AppModule {}
