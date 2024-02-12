import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { Repository } from "typeorm";

import { LangEnum } from "@/enums/lang.enum";

import { AboutEntity } from "./about.entity";

import { CreateAboutDto } from "./dto/create-about.dto";
import { UpdateAboutDto } from "./dto/update-about.dto";

@Injectable()
export class AboutService {
  constructor(
    @InjectRepository(AboutEntity)
    private readonly aboutRepository: Repository<AboutEntity>,
  ) {}

  async findByLang(lang: LangEnum) {
    return this.aboutRepository.findOne({ where: { lang } });
  }

  async findById(id: string) {
    return this.aboutRepository.findOne({ where: { id } });
  }

  async create(lang: LangEnum, body: CreateAboutDto) {
    return this.aboutRepository.save({ description: body.description, lang });
  }

  async update(lang: LangEnum, body: UpdateAboutDto) {
    const oldAbout = await this.findByLang(lang);

    return this.aboutRepository.save({ id: oldAbout.id, ...body });
  }
}
