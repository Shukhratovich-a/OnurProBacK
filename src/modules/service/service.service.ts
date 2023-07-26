import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { Not, Repository } from "typeorm";

import { LangEnum } from "@/enums/lang.enum";

import { SerivceEntity, SerivceBodyEntity } from "./service.entity";

import { CreateServiceDto, CreateServiceBodyDto } from "./dto/create-service.dto";
import { UpdateServiceBodyDto, UpdateServiceDto } from "./dto/update-service.dto";

@Injectable()
export class ServiceService {
  constructor(
    @InjectRepository(SerivceEntity)
    private readonly serviceRepository: Repository<SerivceEntity>,
    @InjectRepository(SerivceBodyEntity)
    private readonly serviceBodyRepository: Repository<SerivceBodyEntity>,
  ) {}

  async findAll(lang: LangEnum = LangEnum.EN) {
    return this.serviceRepository.find({
      select: { serviceBody: { name: true, slug: true } },
      where: { serviceBody: { lang } },
      relations: { serviceBody: true },
    });
  }

  async findByAlias(lang: LangEnum = LangEnum.EN, alias: string) {
    return this.serviceRepository.findOne({
      where: { serviceBody: { lang }, alias },
      relations: { serviceBody: true },
    });
  }

  async findById(id: string) {
    return this.serviceRepository.findOne({
      where: { id },
    });
  }

  async findByServiceIdAndLang(id: string, lang: LangEnum) {
    return this.serviceBodyRepository.findOne({
      where: {
        lang,
        service: { id },
      },
    });
  }

  async findByBodyIdAndLang(id: string, lang: LangEnum) {
    const service = await this.serviceRepository.findOne({
      where: { serviceBody: { id } },
    });

    return this.serviceBodyRepository.findOne({
      where: {
        id: Not(id),
        lang,
        service: { id: service.id },
      },
    });
  }

  async findBodyById(id: string) {
    return this.serviceBodyRepository.findOne({
      where: { id },
    });
  }

  async createService(body: CreateServiceDto) {
    return this.serviceRepository.save(body);
  }

  async createServiceBody(id: string, body: CreateServiceBodyDto) {
    return this.serviceBodyRepository.save({ ...body, service: { id } });
  }

  async updateService(id: string, body: UpdateServiceDto) {
    return this.serviceRepository.save({ id, ...body });
  }

  async updateServiceBody(id: string, body: UpdateServiceBodyDto) {
    return this.serviceBodyRepository.save({ id, ...body });
  }
}
