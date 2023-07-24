import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

import { Repository } from 'typeorm';
import { compare, genSalt, hash } from 'bcryptjs';

import { AdminEntity } from './admin.entity';

import { AuthAdminDto } from './dto/auth-admin.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(AdminEntity)
    private readonly adminRepository: Repository<AdminEntity>,
    private readonly jwtService: JwtService,
  ) {}

  async findAdmin(name: string) {
    return this.adminRepository.findOne({ where: { name } });
  }

  async createAdmin(body: AuthAdminDto) {
    const salt = await genSalt(10);

    const newUser = this.adminRepository.create({
      name: body.name.toLowerCase(),
      password: await hash(body.password, salt),
    });

    return newUser.save();
  }

  async validateAdmin(body: AuthAdminDto) {
    const admin = await this.findAdmin(body.name);
    if (!admin) {
      throw new UnauthorizedException();
    }

    const isCorrectPassword = await compare(body.password, admin.password);
    if (!isCorrectPassword) {
      throw new UnauthorizedException();
    }

    return { id: admin.id };
  }

  async login(id: number) {
    const payload = { id };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
