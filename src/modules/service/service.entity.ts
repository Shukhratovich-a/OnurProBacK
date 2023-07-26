import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  Relation,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  ManyToOne,
  OneToMany,
} from "typeorm";

import { StatusEnum } from "@/enums/status.enum";
import { LangEnum } from "@/enums/lang.enum";

@Entity("services", { name: "service" })
export class SerivceEntity extends BaseEntity {
  @PrimaryGeneratedColumn("uuid", { name: "id" })
  id: string;

  @Column({ name: "poster", type: "varchar" })
  poster: string;

  @Column({ name: "image", type: "varchar", nullable: true })
  image: string;

  @Column({ name: "alias", type: "varchar", unique: true })
  alias: string;

  @Column({ name: "status", type: "enum", enum: StatusEnum, default: StatusEnum.ACTIVE })
  status: StatusEnum;

  @OneToMany(() => SerivceBodyEntity, (serviceBody) => serviceBody.service, {
    onDelete: "CASCADE",
  })
  serviceBody: Relation<SerivceBodyEntity[]>;

  @CreateDateColumn({ name: "create_at" })
  createAt: Date;

  @UpdateDateColumn({ name: "update_at" })
  updateAt: Date;
}

@Entity("service_bodys", { name: "serivceBody" })
@Index(["service", "lang"], { unique: true })
export class SerivceBodyEntity extends BaseEntity {
  @PrimaryGeneratedColumn("uuid", { name: "id" })
  id: string;

  @Column({ name: "name", type: "varchar", length: 256 })
  name: string;

  @Column({ name: "slug", type: "varchar", length: 256 })
  slug: string;

  @Column({ name: "description", type: "varchar", length: 4096 })
  description: string;

  @Column({ name: "lang", type: "enum", enum: LangEnum, default: LangEnum.EN })
  lang: LangEnum;

  @ManyToOne(() => SerivceEntity, (service) => service.serviceBody, {
    onDelete: "CASCADE",
    nullable: false,
  })
  @JoinColumn({ name: "service_id" })
  service: SerivceEntity;

  @CreateDateColumn({ name: "create_at" })
  createAt: Date;

  @UpdateDateColumn({ name: "update_at" })
  updateAt: Date;
}
