import {
  Controller,
  UseInterceptors,
  UseGuards,
  Get,
  Post,
  Patch,
  Query,
  Param,
  Body,
  ValidationPipe,
  ParseEnumPipe,
  ParseUUIDPipe,
  NotFoundException,
  ForbiddenException,
} from "@nestjs/common";
import {
  ApiTags,
  ApiBearerAuth,
  ApiParam,
  ApiQuery,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiForbiddenResponse,
} from "@nestjs/swagger";

import { ResponseInterceptor } from "@/interceptors/response.interceptor";
import { ParamsInterceptor } from "@/interceptors/params.interceptor";

import { ResponseMessage } from "@/decorators/response-message.decorator";

import { JwtAuthGuard } from "@/guards/jwt.guard";

import { LangEnum } from "@/enums/lang.enum";

import { ServiceService } from "./service.service";

import { CreateServiceDto, CreateServiceBodyDto } from "./dto/create-service.dto";
import { UpdateServiceDto, UpdateServiceBodyDto } from "./dto/update-service.dto";

import {
  BODY_CREATE_SUCCESS,
  BODY_NOT_FOUND,
  BODY_UPDATE_SUCCESS,
  GET_MANY_SUCCESS,
  GET_ONE_SUCCESS,
  LANG_EXISTS,
  SERVICE_CREATE_SUCCESS,
  SERVICE_NOT_FOUND,
  SERVICE_UPDATE_SUCCESS,
  INVALID_INPUT,
} from "./service.constants";

@Controller("service")
@UseInterceptors(ResponseInterceptor)
@ApiTags("Service")
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @Get()
  @ResponseMessage(GET_MANY_SUCCESS)
  @ApiQuery({
    name: "lang",
    enum: LangEnum,
    example: LangEnum.RU,
    description: "Enter lang",
    required: true,
  })
  @ApiOkResponse({ description: GET_MANY_SUCCESS })
  @ApiBadRequestResponse({ description: INVALID_INPUT })
  async getAll(@Query("lang", new ParseEnumPipe(LangEnum)) lang: LangEnum) {
    return await this.serviceService.findAll(lang);
  }

  @Get("/by-alias/:alias")
  @ResponseMessage(GET_ONE_SUCCESS)
  @ApiQuery({
    name: "lang",
    enum: LangEnum,
    example: LangEnum.RU,
    description: "Enter lang",
    required: true,
  })
  @ApiParam({
    name: "alias",
    type: "string",
    example: "it",
    description: "Enter alias",
    required: true,
  })
  @ApiOkResponse({ description: GET_ONE_SUCCESS })
  @ApiBadRequestResponse({ description: INVALID_INPUT })
  async getByAlias(@Param("alias") alias: string, @Query("lang", new ParseEnumPipe(LangEnum)) lang: LangEnum) {
    return await this.serviceService.findByAlias(lang, alias);
  }

  @Get("/by-id/:id")
  @UseGuards(JwtAuthGuard)
  @ResponseMessage(GET_ONE_SUCCESS)
  @ApiBearerAuth()
  @ApiParam({
    name: "id",
    type: "string",
    example: "415dddea-9c61-4b0b-850e-7ed1f3663df6",
    description: "Enter id",
    required: true,
  })
  @ApiOkResponse({ description: GET_ONE_SUCCESS })
  @ApiBadRequestResponse({ description: INVALID_INPUT })
  async getById(@Param("id", ParseUUIDPipe) id: string) {
    return await this.serviceService.findById(id);
  }

  @Post("/create")
  @UseGuards(JwtAuthGuard)
  @ResponseMessage(SERVICE_CREATE_SUCCESS)
  @ApiBearerAuth()
  @ApiCreatedResponse({ description: SERVICE_CREATE_SUCCESS })
  @ApiBadRequestResponse({ description: INVALID_INPUT })
  async createService(@Body(ValidationPipe) body: CreateServiceDto) {
    return await this.serviceService.createService(body);
  }

  @Post("/create-body/:id")
  @UseGuards(JwtAuthGuard)
  @ResponseMessage(BODY_CREATE_SUCCESS)
  @ApiBearerAuth()
  @ApiParam({
    name: "id",
    type: "string",
    example: "415dddea-9c61-4b0b-850e-7ed1f3663df6",
    description: "Enter id",
    required: true,
  })
  @ApiCreatedResponse({ description: BODY_CREATE_SUCCESS })
  @ApiBadRequestResponse({ description: INVALID_INPUT })
  @ApiForbiddenResponse({ description: LANG_EXISTS })
  @ApiNotFoundResponse({ description: SERVICE_NOT_FOUND })
  async createBody(@Param("id", ParseUUIDPipe) id: string, @Body(ValidationPipe) body: CreateServiceBodyDto) {
    const service = await this.serviceService.findById(id);
    if (!service) throw new NotFoundException(SERVICE_NOT_FOUND);

    const oldServiceBody = await this.serviceService.findByServiceIdAndLang(id, body.lang);
    if (oldServiceBody) throw new ForbiddenException(LANG_EXISTS);

    return await this.serviceService.createServiceBody(id, body);
  }

  @Patch("/update/:id")
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ParamsInterceptor)
  @ResponseMessage(SERVICE_UPDATE_SUCCESS)
  @ApiBearerAuth()
  @ApiOkResponse({ description: SERVICE_UPDATE_SUCCESS })
  @ApiBadRequestResponse({ description: INVALID_INPUT })
  @ApiNotFoundResponse({ description: SERVICE_NOT_FOUND })
  async updateService(@Param("id", ParseUUIDPipe) id: string, @Body(ValidationPipe) body: UpdateServiceDto) {
    const service = await this.serviceService.findById(id);
    if (!service) throw new NotFoundException(SERVICE_NOT_FOUND);

    return this.serviceService.updateService(id, body);
  }

  @Patch("/update-body/:id")
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ParamsInterceptor)
  @ResponseMessage(BODY_UPDATE_SUCCESS)
  @ApiBearerAuth()
  @ApiOkResponse({ description: BODY_UPDATE_SUCCESS })
  @ApiBadRequestResponse({ description: INVALID_INPUT })
  @ApiForbiddenResponse({ description: LANG_EXISTS })
  @ApiNotFoundResponse({ description: BODY_NOT_FOUND })
  async updateServiceBody(@Param("id", ParseUUIDPipe) id: string, @Body(ValidationPipe) body: UpdateServiceBodyDto) {
    const serviceBody = await this.serviceService.findBodyById(id);
    if (!serviceBody) throw new NotFoundException(BODY_NOT_FOUND);

    const oldServiceBody = await this.serviceService.findByBodyIdAndLang(id, body.lang);
    if (oldServiceBody) throw new ForbiddenException(LANG_EXISTS);

    return this.serviceService.updateServiceBody(id, body);
  }
}
