import {
  Controller,
  UseInterceptors,
  UseGuards,
  Get,
  Post,
  Patch,
  Param,
  Body,
  ValidationPipe,
  NotFoundException,
  ForbiddenException,
  ParseEnumPipe,
  ParseUUIDPipe,
} from "@nestjs/common";
import {
  ApiTags,
  ApiBearerAuth,
  ApiParam,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiForbiddenResponse,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";

import { ResponseMessage } from "@/decorators/response-message.decorator";

import { ResponseInterceptor } from "@/interceptors/response.interceptor";

import { JwtAuthGuard } from "@/guards/jwt.guard";

import { LangEnum } from "@/enums/lang.enum";

import { AboutService } from "./about.service";

import { CreateAboutDto } from "./dto/create-about.dto";
import { UpdateAboutDto } from "./dto/update-about.dto";

import {
  FETCHED_SUCCESSFULLY,
  CREATED_SUCCESSFULLY,
  UPDATED_SUCCESSFULLY,
  NOT_FOUND,
  UNAUTHORIZED,
  ABOUT_ALREADY_EXISTS,
  INVALID_INPUT,
} from "./about.constants";

@Controller("about")
@UseInterceptors(ResponseInterceptor)
@ApiTags("About")
export class AboutController {
  constructor(private readonly aboutService: AboutService) {}

  @Get("/by-lang/:lang")
  @ResponseMessage(FETCHED_SUCCESSFULLY)
  @ApiParam({
    name: "lang",
    enum: LangEnum,
    example: LangEnum.RU,
    description: "Enter lang",
    required: true,
  })
  @ApiOkResponse({ description: FETCHED_SUCCESSFULLY })
  async getByLang(@Param("lang", new ParseEnumPipe(LangEnum)) lang: LangEnum) {
    return this.aboutService.findByLang(lang);
  }

  @Get("/by-id/:id")
  @UseGuards(JwtAuthGuard)
  @ResponseMessage(FETCHED_SUCCESSFULLY)
  @ApiBearerAuth()
  @ApiParam({
    name: "id",
    type: "string",
    example: "415dddea-9c61-4b0b-850e-7ed1f3663df6",
    description: "Enter id",
    required: true,
  })
  @ApiOkResponse({ description: FETCHED_SUCCESSFULLY })
  async getById(@Param("id", ParseUUIDPipe) id: string) {
    return this.aboutService.findById(id);
  }

  @Post("/create/:lang")
  @UseGuards(JwtAuthGuard)
  @ResponseMessage(CREATED_SUCCESSFULLY)
  @ApiBearerAuth()
  @ApiParam({
    name: "lang",
    enum: LangEnum,
    example: LangEnum.RU,
    description: "Enter lang",
    required: true,
  })
  @ApiCreatedResponse({ description: CREATED_SUCCESSFULLY })
  @ApiBadRequestResponse({ description: INVALID_INPUT })
  @ApiUnauthorizedResponse({ description: UNAUTHORIZED })
  @ApiForbiddenResponse({ description: ABOUT_ALREADY_EXISTS })
  async create(@Param("lang", new ParseEnumPipe(LangEnum)) lang: LangEnum, @Body(ValidationPipe) body: CreateAboutDto) {
    const oldAbout = await this.aboutService.findByLang(lang);
    if (oldAbout) throw new ForbiddenException(ABOUT_ALREADY_EXISTS);

    return await this.aboutService.create(lang, body);
  }

  @Patch("/update/:lang")
  @UseGuards(JwtAuthGuard)
  @ResponseMessage(UPDATED_SUCCESSFULLY)
  @ApiBearerAuth()
  @ApiOkResponse({ description: UPDATED_SUCCESSFULLY })
  @ApiBadRequestResponse({ description: INVALID_INPUT })
  @ApiUnauthorizedResponse({ description: UNAUTHORIZED })
  @ApiParam({
    name: "lang",
    enum: LangEnum,
    example: LangEnum.RU,
    description: "Enter lang",
    required: true,
  })
  async update(@Param("lang", new ParseEnumPipe(LangEnum)) lang: LangEnum, @Body(ValidationPipe) body: UpdateAboutDto) {
    const oldAbout = await this.aboutService.findByLang(lang);
    if (!oldAbout) throw new NotFoundException(NOT_FOUND);

    return await this.aboutService.update(lang, body);
  }
}
