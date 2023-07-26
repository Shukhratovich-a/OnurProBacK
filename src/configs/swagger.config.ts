import { DocumentBuilder } from "@nestjs/swagger";

export const swaggerConfig = new DocumentBuilder()
  .setTitle("Printer site documentation")
  .setDescription("This documentation helps people who work with the client side")
  .setVersion("1.0")
  .build();
