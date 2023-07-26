import { ApiProperty } from "@nestjs/swagger";

import { IsString } from "class-validator";

export class LoginAdminDto {
  @ApiProperty({
    name: "name",
    type: "string",
    required: true,
    example: "John",
    description: "Enter name for admin",
  })
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
