import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
  HttpStatus,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { extend } from 'underscore';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToClass(metatype, value);
    const errors = await validate(object);
    if (errors.length > 0) {
      const err = [];
      errors.forEach((error) => {
        const keys = Object.keys(error.constraints);
        err.push({
          [error.property]: [
            ...keys.map((key) => {
              return error.constraints[key];
            }),
          ],
        });
      });

      const validation = err.reduce((acc, curr) => {
        return extend(acc, curr);
      }, {});

      throw new BadRequestException({
        message: 'Validation failed',
        errors: validation,
        statusCode: HttpStatus.BAD_REQUEST,
      });
    }
    return value;
  }

  private toValidate(metatype: any): boolean {
    const types: any[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
