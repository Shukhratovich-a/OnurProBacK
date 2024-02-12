import {
  Entity,
  Index,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  Relation,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

import { StatusEnum } from "@/enums/status.enum";
import { LangEnum } from "@/enums/lang.enum";

import { PartnerEntity } from "../partner/partner.entity";

@Entity("services", { name: "service" })
export class ServiceEntity extends BaseEntity {
  @PrimaryGeneratedColumn("uuid", { name: "id" })
  id: string;

  @Column({ name: "poster", type: "varchar" })
  poster: string;

  @Column({ name: "image", type: "varchar", nullable: true })
  image?: string;

  @Column({ name: "alias", type: "varchar", unique: true })
  alias: string;

  @Column({ name: "status", type: "enum", enum: StatusEnum, default: StatusEnum.ACTIVE })
  status?: StatusEnum;

  @OneToMany(() => ServiceBodyEntity, (serviceBody) => serviceBody.service, { onDelete: "CASCADE" })
  serviceBody: Relation<ServiceBodyEntity[]>;

  @OneToMany(() => PartnerEntity, (partner) => partner.service, { onDelete: "CASCADE" })
  partners: Relation<PartnerEntity[]>;

  @CreateDateColumn({ name: "create_at" })
  createAt: Date;

  @UpdateDateColumn({ name: "update_at" })
  updateAt: Date;
}

@Entity("service_bodys", { name: "ServiceBody" })
@Index(["service", "lang"], { unique: true })
export class ServiceBodyEntity extends BaseEntity {
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

  @ManyToOne(() => ServiceEntity, (service) => service.serviceBody, { onDelete: "CASCADE", nullable: false })
  @JoinColumn({ name: "service_id" })
  service: ServiceEntity;

  @CreateDateColumn({ name: "create_at" })
  createAt: Date;

  @UpdateDateColumn({ name: "update_at" })
  updateAt: Date;
}
