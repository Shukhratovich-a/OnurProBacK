import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { JwtService } from "@nestjs/jwt";

import { Repository } from "typeorm";
import { compare, genSalt, hash } from "bcryptjs";

import { AdminEntity } from "./admin.entity";

import { RegisterAdminDto } from "./dto/register-admin.dto";
import { LoginAdminDto } from "./dto/login-admin.dto";

import { LOGIN_INCORRECT } from "./admin.constants";

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(AdminEntity)
    private readonly adminRepository: Repository<AdminEntity>,
    private readonly jwtService: JwtService,
  ) {}

  async findByName(name: string) {
    return this.adminRepository.findOne({ where: { name } });
  }

  async findById(id: string) {
    return this.adminRepository.findOne({ where: { id } });
  }

  async createAdmin(body: RegisterAdminDto) {
    const salt = await genSalt(10);

    const newAdmin = this.adminRepository.create({
      name: body.name.toLowerCase(),
      password: await hash(body.password, salt),
    });

    return newAdmin.save();
  }

  async validateAdmin(body: LoginAdminDto) {
    const admin = await this.findByName(body.name);
    if (!admin) throw new UnauthorizedException(LOGIN_INCORRECT);

    const isCorrectPassword = await compare(body.password, admin.password);
    if (!isCorrectPassword) throw new UnauthorizedException(LOGIN_INCORRECT);

    return { id: admin.id };
  }

  async login(id: string) {
    const payload = { id };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
