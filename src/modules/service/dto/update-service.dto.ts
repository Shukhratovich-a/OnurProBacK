import { ApiProperty } from "@nestjs/swagger";

import { IsEnum, IsOptional, IsString, Length } from "class-validator";

import { Unique } from "@/validators/unique/unique.decorator";

import { ServiceEntity } from "../service.entity";

import { LangEnum } from "@/enums/lang.enum";
import { StatusEnum } from "@/enums/status.enum";

export class UpdateServiceDto {
  @ApiProperty({
    name: "poster",
    type: "string",
    required: false,
    example: "example.webp",
    description: "Enter poster path",
  })
  @IsString()
  @IsOptional()
  poster?: string;

  @ApiProperty({
    name: "image",
    type: "string",
    required: false,
    example: "example.webp",
    description: "Enter image path",
  })
  @IsString()
  @IsOptional()
  image?: string;

  @ApiProperty({
    name: "alias",
    type: "string",
    required: false,
    example: "it-service",
    description: "Enter alias for service",
  })
  @IsString()
  @IsOptional()
  @Unique([
    ServiceEntity,
    {
      select: "entity.id",
      where: "entity.alias = :alias and id != :id",
      parameters: { alias: "value", id: "params.id" },
    },
  ])
  alias?: string;

  @ApiProperty({
    name: "status",
    enum: StatusEnum,
    required: false,
    example: "active",
    description: "Enter status of service",
  })
  @IsEnum(StatusEnum)
  @IsOptional()
  status?: StatusEnum;
}

export class UpdateServiceBodyDto {
  @ApiProperty({
    name: "name",
    type: "string",
    required: false,
    example: "Department of It",
    description: "Enter name for service",
  })
  @IsString()
  @IsOptional()
  @Length(2, 256)
  name?: string;

  @ApiProperty({
    name: "slug",
    type: "string",
    required: false,
    example: "It",
    description: "Enter slug for service",
  })
  @IsString()
  @IsOptional()
  @Length(2, 256)
  slug?: string;

  @ApiProperty({
    name: "description",
    type: "string",
    required: false,
    example: "It",
    description: "Enter description for service",
  })
  @IsString()
  @IsOptional()
  @Length(128, 4096)
  description?: string;

  @ApiProperty({
    name: "lang",
    enum: LangEnum,
    required: false,
    example: "en",
    description: "Enter lang",
  })
  @IsEnum(LangEnum)
  @IsOptional()
  lang?: LangEnum;
}
