import { Module } from '@nestjs/common';

import { UniqueModule } from './unique/unique.module';

@Module({
  imports: [UniqueModule],
  exports: [UniqueModule],
})
export class ValidatorsModule {}
