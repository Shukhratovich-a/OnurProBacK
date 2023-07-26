import { ApiProperty } from "@nestjs/swagger";

import { IsEnum, IsOptional, IsString, Length } from "class-validator";

import { StatusEnum } from "@/enums/status.enum";

export class UpdateAboutDto {
  @ApiProperty({
    name: "description",
    type: "string",
    required: false,
    example: "This company was created ...",
    description: "Enter description for about",
  })
  @IsOptional()
  @IsString()
  @Length(124, 4096)
  description: string;

  @ApiProperty({
    name: "status",
    enum: StatusEnum,
    required: false,
    example: StatusEnum.ACTIVE,
    description: "Enter status for this about",
  })
  @IsEnum(StatusEnum)
  @IsOptional()
  status: StatusEnum;
}
