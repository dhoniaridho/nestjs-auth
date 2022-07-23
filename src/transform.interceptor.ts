import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map } from 'rxjs/operators';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    return next.handle().pipe(
      map((data) => {
        if (data instanceof Object) {
          return {
            data: data.data || data,
            statusCode: context.switchToHttp().getResponse().statusCode,
            message: data.message || 'Sucessfully retrieved data',
          };
        }
        return data;
      }),
    );
  }
}
