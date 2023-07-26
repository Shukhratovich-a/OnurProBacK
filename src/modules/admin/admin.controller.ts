import {
  Controller,
  UseInterceptors,
  Body,
  Post,
  UseGuards,
  ValidationPipe,
  BadRequestException,
} from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";

import { ResponseMessage } from "@decorators/response-message.decorator";

import { ResponseInterceptor } from "@/interceptors/response.interceptor";

import { JwtAuthGuard } from "@/guards/jwt.guard";

import { AdminService } from "./admin.service";

import { RegisterAdminDto } from "./dto/register-admin.dto";
import { LoginAdminDto } from "./dto/login-admin.dto";

import {
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  UNAUTHORIZED,
  NAME_ALREADT_EXISTS,
  LOGIN_INCORRECT,
  INVALID_INPUT,
} from "./admin.constants";

@Controller("admin")
@UseInterceptors(ResponseInterceptor)
@ApiTags("Admin")
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post("register")
  @UseGuards(JwtAuthGuard)
  @ResponseMessage(REGISTER_SUCCESS)
  @ApiCreatedResponse({ description: REGISTER_SUCCESS })
  @ApiBadRequestResponse({ description: INVALID_INPUT })
  @ApiUnauthorizedResponse({ description: UNAUTHORIZED })
  async register(@Body(ValidationPipe) body: RegisterAdminDto) {
    const oldAdmin = await this.adminService.findAdmin(body.name);
    if (oldAdmin) throw new BadRequestException(NAME_ALREADT_EXISTS);

    return await this.adminService.createAdmin(body);
  }

  @Post("login")
  @ResponseMessage(LOGIN_SUCCESS)
  @ApiOkResponse({ description: LOGIN_SUCCESS })
  @ApiBadRequestResponse({ description: INVALID_INPUT })
  @ApiUnauthorizedResponse({ description: LOGIN_INCORRECT })
  async login(@Body(ValidationPipe) body: LoginAdminDto) {
    const { id } = await this.adminService.validateAdmin(body);
    return this.adminService.login(id);
  }
}
