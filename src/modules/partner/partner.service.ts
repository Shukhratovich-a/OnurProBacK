import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { Repository } from "typeorm";

import { StatusEnum } from "@/enums/status.enum";

import { PartnerEntity } from "./partner.entity";

import { CreatePartnerDto } from "./dto/create-partner.dto";
import { UpdatePartnerDto } from "./dto/update-partner.dto";

@Injectable()
export class PartnerService {
  constructor(
    @InjectRepository(PartnerEntity)
    private readonly partnerRepository: Repository<PartnerEntity>,
  ) {}

  async findAll() {
    return this.partnerRepository.find({ where: { status: StatusEnum.ACTIVE } });
  }

  async findByAlias(alias: string) {
    return this.partnerRepository.findOne({ where: { alias, status: StatusEnum.ACTIVE } });
  }

  async findById(id: string) {
    return this.partnerRepository.findOne({ where: { id } });
  }

  async create(body: CreatePartnerDto) {
    return this.partnerRepository.save({ ...body, service: { id: body.serviceId } });
  }

  async update(id: string, body: UpdatePartnerDto) {
    return this.partnerRepository.save({ id, ...body, service: { id: body.serviceId } });
  }
}
