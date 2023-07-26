import { Module } from "@nestjs/common";

import { AdminModule } from "./admin/admin.module";
import { AboutModule } from "./about/about.module";
import { ServiceModule } from "./service/service.module";
import { FilesModule } from "./files/files.module";

@Module({
  imports: [AdminModule, AboutModule, ServiceModule, FilesModule],
})
export class Modules {}
