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
} from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";

import { ResponseMessage } from "@/decorators/response-message.decorator";

import { ResponseInterceptor } from "@/interceptors/response.interceptor";

import { JwtAuthGuard } from "@/guards/jwt.guard";

import { LangEnum } from "@/enums/lang.enum";

import { AboutSerivce } from "./about.service";

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
  constructor(private readonly aboutService: AboutSerivce) {}

  @Get(":lang")
  @ResponseMessage(FETCHED_SUCCESSFULLY)
  @ApiParam({
    name: "lang",
    enum: LangEnum,
    example: LangEnum.RU,
    description: "Enter lang",
    required: true,
  })
  @ApiOkResponse({ description: FETCHED_SUCCESSFULLY })
  async getAbout(@Param("lang", new ParseEnumPipe(LangEnum)) lang: LangEnum) {
    return this.aboutService.findAbout(lang);
  }

  @Post(":lang")
  @UseGuards(JwtAuthGuard)
  @ResponseMessage(CREATED_SUCCESSFULLY)
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
  async createAbout(
    @Param("lang", new ParseEnumPipe(LangEnum)) lang: LangEnum,
    @Body(ValidationPipe) body: CreateAboutDto,
  ) {
    const oldAbout = await this.aboutService.findAbout(lang);
    if (oldAbout) throw new ForbiddenException(ABOUT_ALREADY_EXISTS);

    return await this.aboutService.createAbout(lang, body);
  }

  @Patch(":lang")
  @UseGuards(JwtAuthGuard)
  @ResponseMessage(UPDATED_SUCCESSFULLY)
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
  async updateAbout(
    @Param("lang", new ParseEnumPipe(LangEnum)) lang: LangEnum,
    @Body(ValidationPipe) body: UpdateAboutDto,
  ) {
    const oldAbout = await this.aboutService.findAbout(lang);
    if (!oldAbout) throw new NotFoundException(NOT_FOUND);

    return await this.aboutService.updateAbout(lang, body);
  }
}
