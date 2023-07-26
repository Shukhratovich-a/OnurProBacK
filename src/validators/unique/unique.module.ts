import { Module } from "@nestjs/common";

import { UniqueConstraint } from "./unique.constraint";
import { UniqueSerivce } from "./unique.service";

@Module({
  providers: [UniqueSerivce, UniqueConstraint],
  exports: [UniqueSerivce, UniqueConstraint],
})
export class UniqueModule {}
