import { ApiProperty } from "@nestjs/swagger";

import { IsNotEmpty, IsString, IsUrl } from "class-validator";

import { Unique } from "@/validators/unique/unique.decorator";

import { PartnerEntity } from "../partner.entity";

export class CreatePartnerDto {
  @ApiProperty({
    name: "name",
    type: "string",
    required: true,
    example: "Nova",
    description: "Enter partner name",
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    name: "alias",
    type: "string",
    required: true,
    example: "partner-nova",
    description: "Enter partner alias",
  })
  @IsString()
  @IsNotEmpty()
  @Unique([
    PartnerEntity,
    {
      select: "entity.id",
      where: "entity.alias = :alias",
      parameters: { alias: "value" },
    },
  ])
  alias: string;

  @ApiProperty({
    name: "site",
    type: "string",
    required: true,
    example: "https://novaplastic.com",
    description: "Enter partner site",
  })
  @IsString()
  @IsNotEmpty()
  @IsUrl()
  site: string;

  @ApiProperty({
    name: "image",
    type: "string",
    required: true,
    example: "partner-nova.jpg",
    description: "Enter partner image path",
  })
  @IsString()
  @IsNotEmpty()
  image: string;

  @ApiProperty({
    name: "serviceId",
    type: "uuid",
    required: true,
    example: "f62c835f-755b-4831-b107-b4d920791dd0",
    description: "Enter service id",
  })
  @IsNotEmpty()
  serviceId: string;
}
