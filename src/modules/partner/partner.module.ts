import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { ValidatorsModule } from "@/validators/validators.module";
import { ServiceBodyEntity, ServiceEntity } from "@/modules/service/service.entity";
import { ServiceService } from "@/modules/service/service.service";

import { PartnerEntity } from "./partner.entity";

import { PartnerController } from "./partner.controller";

import { PartnerService } from "./partner.service";

@Module({
  imports: [TypeOrmModule.forFeature([PartnerEntity, ServiceEntity, ServiceBodyEntity]), ValidatorsModule],
  controllers: [PartnerController],
  providers: [PartnerService, ServiceService],
})
export class PartnerModule {}
