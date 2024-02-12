import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from "@nestjs/common";
import { Observable } from "rxjs";
import { Handler } from "express";

import { UniqueService } from "@/validators/unique/unique.service";

@Injectable()
export class ParamsInterceptor implements NestInterceptor {
  constructor(private uniqueService: UniqueService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<Handler> {
    const request = context.switchToHttp().getRequest();

    this.uniqueService.setParams(request.params);

    return next.handle();
  }
}
