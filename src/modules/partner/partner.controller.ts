import {
  Controller,
  UseInterceptors,
  UseGuards,
  Get,
  Post,
  Param,
  Body,
  ValidationPipe,
  ParseUUIDPipe,
  NotFoundException,
  Patch,
} from "@nestjs/common";
import {
  ApiTags,
  ApiBearerAuth,
  ApiParam,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
  ApiNotFoundResponse,
} from "@nestjs/swagger";

import { ResponseInterceptor } from "@/interceptors/response.interceptor";
import { ParamsInterceptor } from "@/interceptors/params.interceptor";

import { ResponseMessage } from "@/decorators/response-message.decorator";

import { JwtAuthGuard } from "@/guards/jwt.guard";

import { ServiceService } from "../service/service.service";

import { PartnerSerivce } from "./partner.service";

import { CreatePartnerDto } from "./dto/create-partner.dto";
import { UpdatePartnerDto } from "./dto/update-partner.dto";

import {
  GET_MANY_SUCCESS,
  GET_ONE_SUCCESS,
  CREATE_SUCCESS,
  UPDATE_SUCCESS,
  INVALID_INPUT,
  PARTNER_NOT_FOUND,
  SERVICE_NOT_FOUND,
  UNAUTHORIZED,
} from "./partner.constants";

@Controller("partner")
@UseInterceptors(ResponseInterceptor)
@ApiTags("Partner")
export class PartnerController {
  constructor(private readonly partnerService: PartnerSerivce, private readonly serviceService: ServiceService) {}

  @Get()
  @ResponseMessage(GET_MANY_SUCCESS)
  @ApiOkResponse({ description: GET_MANY_SUCCESS })
  async getAll() {
    return await this.partnerService.findAll();
  }

  @Get("/by-alias/:alias")
  @ResponseMessage(GET_ONE_SUCCESS)
  @ApiParam({
    name: "alias",
    type: "string",
    example: "it",
    description: "Enter alias",
    required: true,
  })
  @ApiOkResponse({ description: GET_ONE_SUCCESS })
  async getByAlias(@Param("alias") alias: string) {
    return await this.partnerService.findByAlias(alias);
  }

  @Get("/by-id/:id")
  @UseGuards(JwtAuthGuard)
  @ResponseMessage(GET_ONE_SUCCESS)
  @ApiBearerAuth()
  @ApiParam({
    name: "id",
    type: "uuid",
    example: "id",
    description: "Enter id",
    required: true,
  })
  @ApiOkResponse({ description: GET_ONE_SUCCESS })
  @ApiBadRequestResponse({ description: INVALID_INPUT })
  @ApiUnauthorizedResponse({ description: UNAUTHORIZED })
  async getById(@Param("id", ParseUUIDPipe) id: string) {
    return await this.partnerService.findById(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ResponseMessage(CREATE_SUCCESS)
  @ApiBearerAuth()
  @ApiCreatedResponse({ description: CREATE_SUCCESS })
  @ApiBadRequestResponse({ description: INVALID_INPUT })
  @ApiUnauthorizedResponse({ description: UNAUTHORIZED })
  @ApiNotFoundResponse({ description: SERVICE_NOT_FOUND })
  async create(@Body(ValidationPipe) body: CreatePartnerDto) {
    const service = await this.serviceService.findById(body.serviceId);
    if (!service) throw new NotFoundException(SERVICE_NOT_FOUND);

    return this.partnerService.create(body);
  }

  @Patch(":id")
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ParamsInterceptor)
  @ResponseMessage(UPDATE_SUCCESS)
  @ApiBearerAuth()
  @ApiOkResponse({ description: UPDATE_SUCCESS })
  @ApiBadRequestResponse({ description: INVALID_INPUT })
  @ApiUnauthorizedResponse({ description: UNAUTHORIZED })
  @ApiNotFoundResponse({ description: "Service or " + PARTNER_NOT_FOUND })
  async update(@Param("id", ParseUUIDPipe) id: string, @Body(ValidationPipe) body: UpdatePartnerDto) {
    const partner = await this.partnerService.findById(id);
    if (!partner) throw new NotFoundException(PARTNER_NOT_FOUND);

    const service = await this.serviceService.findById(body.serviceId);
    if (!service) throw new NotFoundException(SERVICE_NOT_FOUND);

    return this.partnerService.update(id, body);
  }
}
