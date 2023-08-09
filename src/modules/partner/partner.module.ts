import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { ValidatorsModule } from "@/validators/validators.module";
import { SerivceBodyEntity, SerivceEntity } from "@/modules/service/service.entity";
import { ServiceService } from "@/modules/service/service.service";

import { PartnerEntity } from "./partner.entity";

import { PartnerController } from "./partner.controller";

import { PartnerSerivce } from "./partner.service";

@Module({
  imports: [TypeOrmModule.forFeature([PartnerEntity, SerivceEntity, SerivceBodyEntity]), ValidatorsModule],
  controllers: [PartnerController],
  providers: [PartnerSerivce, ServiceService],
})
export class PartnerModule {}
