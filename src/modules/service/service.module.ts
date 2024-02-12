import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { ValidatorsModule } from "@/validators/validators.module";

import { ServiceEntity, ServiceBodyEntity } from "./service.entity";

import { ServiceController } from "./service.controller";

import { ServiceService } from "./service.service";

@Module({
  imports: [TypeOrmModule.forFeature([ServiceEntity, ServiceBodyEntity]), ValidatorsModule],
  controllers: [ServiceController],
  providers: [ServiceService],
})
export class ServiceModule {}
