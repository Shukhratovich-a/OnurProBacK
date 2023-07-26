import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { Repository } from "typeorm";

import { LangEnum } from "@/enums/lang.enum";

import { AboutEntity } from "./about.entity";

import { CreateAboutDto } from "./dto/create-about.dto";
import { UpdateAboutDto } from "./dto/update-about.dto";

@Injectable()
export class AboutSerivce {
  constructor(
    @InjectRepository(AboutEntity)
    private readonly aboutRepository: Repository<AboutEntity>,
  ) {}

  async findAbout(lang: LangEnum) {
    return this.aboutRepository.findOne({ where: { lang } });
  }

  async createAbout(lang: LangEnum, body: CreateAboutDto) {
    const newAbout = this.aboutRepository.create({
      description: body.description,
      lang,
    });

    return newAbout.save();
  }

  async updateAbout(lang: LangEnum, body: UpdateAboutDto) {
    const oldAbout = await this.findAbout(lang);

    return this.aboutRepository.save({ id: oldAbout.id, ...body });
  }
}
