import {
  Controller,
  UseInterceptors,
  Body,
  Post,
  ValidationPipe,
  BadRequestException,
} from '@nestjs/common';

// import { ResponseMessage } from '@decorators/response-message.decorator';

import { ResponseInterceptor } from '@/interceptors/response.interceptor';
// import { ParamsInterceptor } from '@/interceptors/params.interceptor';

import { AdminService } from './admin.service';

import { AuthAdminDto } from './dto/auth-admin.dto';

@Controller('admin')
@UseInterceptors(ResponseInterceptor)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('register')
  async register(@Body(ValidationPipe) body: AuthAdminDto) {
    const oldAdmin = await this.adminService.findAdmin(body.name);
    if (!oldAdmin) throw new BadRequestException();

    return this.adminService.createAdmin(body);
  }

  @Post('login')
  async login(@Body(ValidationPipe) body: AuthAdminDto) {
    const oldAdmin = await this.adminService.findAdmin(body.name);
    if (!oldAdmin) throw new BadRequestException();

    return this.adminService.createAdmin(body);
  }
}
