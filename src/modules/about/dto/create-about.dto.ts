import { ApiProperty } from "@nestjs/swagger";

import { IsNotEmpty, IsString, Length } from "class-validator";

import {} from "@/enums/status.enum";

export class CreateAboutDto {
  @ApiProperty({
    name: "description",
    type: "string",
    required: true,
    example: "This company was created ...",
    description: "Enter description for about",
  })
  @IsNotEmpty()
  @IsString()
  @Length(124, 4096)
  description: string;
}
