import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

import { LangEnum } from "@/enums/lang.enum";
import { StatusEnum } from "@/enums/status.enum";

@Entity("abouts", { name: "about" })
export class AboutEntity extends BaseEntity {
  @PrimaryGeneratedColumn("uuid", { name: "id" })
  id: string;

  @Column({ name: "description", type: "varchar", length: 4096 })
  description: string;

  @Column({ name: "lang", type: "enum", enum: LangEnum, default: LangEnum.EN, unique: true })
  lang: LangEnum;

  @Column({ name: "status", type: "enum", enum: StatusEnum, default: StatusEnum.ACTIVE })
  status: StatusEnum;

  @CreateDateColumn({ name: "create_at" })
  createAt: Date;

  @UpdateDateColumn({ name: "update_at" })
  updateAt: Date;
}
