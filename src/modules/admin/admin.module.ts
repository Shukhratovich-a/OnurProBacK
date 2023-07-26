import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";

import { getJwtConfig } from "@/configs/jwt.config";

import { JwtStratagy } from "@/strategies/jwt.strategy";

import { AdminEntity } from "./admin.entity";

import { AdminController } from "./admin.controller";

import { AdminService } from "./admin.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([AdminEntity]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJwtConfig,
    }),
    ConfigModule,
    PassportModule,
  ],
  controllers: [AdminController],
  providers: [AdminService, JwtStratagy],
})
export class AdminModule {}
