import { Module } from "@nestjs/common";

import { UniqueConstraint } from "./unique.constraint";
import { UniqueService } from "./unique.service";

@Module({
  providers: [UniqueService, UniqueConstraint],
  exports: [UniqueService, UniqueConstraint],
})
export class UniqueModule {}
