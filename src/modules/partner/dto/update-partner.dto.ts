import { ApiProperty } from "@nestjs/swagger";

import { IsOptional, IsString, IsUrl } from "class-validator";

import { Unique } from "@/validators/unique/unique.decorator";

import { PartnerEntity } from "../partner.entity";

export class UpdatePartnerDto {
  @ApiProperty({
    name: "name",
    type: "string",
    required: false,
    example: "Nova",
    description: "Enter partner name",
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({
    name: "alias",
    type: "string",
    required: false,
    example: "partner-nova",
    description: "Enter partner alias",
  })
  @IsString()
  @IsOptional()
  @Unique([
    PartnerEntity,
    {
      select: "entity.id",
      where: "entity.alias = :alias and id != :id",
      parameters: { alias: "value", id: "params.id" },
    },
  ])
  alias?: string;

  @ApiProperty({
    name: "site",
    type: "string",
    required: false,
    example: "https://novaplastic.com",
    description: "Enter partner site",
  })
  @IsString()
  @IsOptional()
  @IsUrl()
  site?: string;

  @ApiProperty({
    name: "image",
    type: "string",
    required: false,
    example: "partner-nova.jpg",
    description: "Enter partner image path",
  })
  @IsString()
  @IsOptional()
  image?: string;

  @ApiProperty({
    name: "serviceId",
    type: "uuid",
    required: false,
    example: "f62c835f-755b-4831-b107-b4d920791dd0",
    description: "Enter service id",
  })
  @IsOptional()
  serviceId?: string;
}
