import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

import { StatusEnum } from "@/enums/status.enum";

import { ServiceEntity } from "../service/service.entity";

@Entity("partners", { name: "partner" })
export class PartnerEntity extends BaseEntity {
  @PrimaryGeneratedColumn("uuid", { name: "id" })
  id: string;

  @Column({ name: "name", type: "varchar", length: 64 })
  name: string;

  @Column({ name: "alias", type: "varchar", length: 64, unique: true })
  alias: string;

  @Column({ name: "site", type: "varchar", length: 128 })
  site: string;

  @Column({ name: "image", type: "varchar", length: 256 })
  image: string;

  @ManyToOne(() => ServiceEntity, (service) => service.partners, {
    onDelete: "CASCADE",
    nullable: false,
  })
  @JoinColumn({ name: "service_id" })
  service: ServiceEntity;

  @Column({ name: "status", type: "enum", enum: StatusEnum, default: StatusEnum.ACTIVE })
  status: StatusEnum;

  @CreateDateColumn({ name: "create_at" })
  createAt: Date;

  @UpdateDateColumn({ name: "update_at" })
  updateAt: Date;
}
