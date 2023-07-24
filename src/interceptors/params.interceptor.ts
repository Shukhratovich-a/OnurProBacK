import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from "@nestjs/common";
import { Observable } from "rxjs";

import { UniqueSerivce } from "@validators/unique/unique.service";

@Injectable()
export class ParamsInterceptor implements NestInterceptor {
  constructor(private uniqueService: UniqueSerivce) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();

    this.uniqueService.setParams(request.params);

    return next.handle();
  }
}
