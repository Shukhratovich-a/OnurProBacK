import { Inject, Injectable } from "@nestjs/common";
import { InjectEntityManager } from "@nestjs/typeorm";

import { EntityManager } from "typeorm";
import { each, at } from "lodash";
import {
  ValidationArguments,
  ValidatorConstraintInterface,
  ValidatorConstraint,
} from "class-validator";

import { UniqueSerivce } from "./unique.service";

interface Arguments extends ValidationArguments {
  object: {
    context: Record<string, string>;
  };
}

@ValidatorConstraint({ name: "unique", async: true })
@Injectable()
export class UniqueConstraint implements ValidatorConstraintInterface {
  constructor(
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
    @Inject(UniqueSerivce)
    private uniqueService: UniqueSerivce,
  ) {}

  async validate(value: string, validationArguments?: Arguments): Promise<boolean> {
    const [entityClass, queryConditions] = validationArguments.constraints;

    if (value) value = value.toLowerCase();

    const parameters = {
      value: value,
      params: this.uniqueService.getParams(),
    };

    const qb = this.entityManager.getRepository(entityClass).createQueryBuilder("entity");
    qb.select(queryConditions.select).where(queryConditions.where);

    const parametersQuery = {};
    each(queryConditions.parameters, (val, property) => {
      const find = at(parameters, val);
      parametersQuery[property] = find[0];
    });

    const entity = await qb.setParameters(parametersQuery).getOne();

    if (entity) return false;
    else return true;
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    return `${validationArguments.property} already exists`;
  }
}
