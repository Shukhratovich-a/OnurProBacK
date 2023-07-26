import { NestFactory } from "@nestjs/core";
import { SwaggerModule } from "@nestjs/swagger";

import { useContainer } from "class-validator";

import { swaggerConfig } from "@/configs/swagger.config";

import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup("api/docs", app, document);

  await app.listen(3000);
}
bootstrap();
