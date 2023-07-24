import { EntitySchema, ObjectType } from "typeorm";
import { registerDecorator, ValidationOptions } from "class-validator";

import { UniqueConstraint } from "./unique.constraint";

type UniqueConstraintInterface<E> = [
  ObjectType<E> | EntitySchema<E> | string,
  {
    select: string;
    where: string;
    parameters: Record<string, string>;
  },
];

export const Unique = <E>(property: UniqueConstraintInterface<E>, validationOptions?: ValidationOptions) => {
  return (object: Record<string, any>, propertyName: string): any => {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      constraints: property,
      options: validationOptions,
      validator: UniqueConstraint,
    });
  };
};
