import { ApiProperty } from "@nestjs/swagger";

import { IsString } from "class-validator";

import { Unique } from "@/validators/unique/unique.decorator";

import { AdminEntity } from "../admin.entity";

export class RegisterAdminDto {
  @ApiProperty({
    name: "name",
    type: "string",
    required: true,
    example: "John",
    description: "Enter name for admin",
  })
  @Unique([
    AdminEntity,
    {
      select: "entity.id",
      where: "entity.name = :name",
      parameters: { name: "value" },
    },
  ])
  @IsString()
  name: string;

  @ApiProperty({
    name: "password",
    type: "string",
    required: true,
    example: "password",
    description: "Enter password for this admin",
  })
  @IsString()
  password: string;
}
