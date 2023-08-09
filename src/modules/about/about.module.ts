import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { AboutEntity } from "./about.entity";

import { AboutController } from "./about.controller";

import { AboutSerivce } from "./about.service";

@Module({
  imports: [TypeOrmModule.forFeature([AboutEntity])],
  controllers: [AboutController],
  providers: [AboutSerivce],
})
export class AboutModule {}
