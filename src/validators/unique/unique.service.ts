import { Injectable } from '@nestjs/common';

@Injectable()
export class UniqueSerivce {
  params: Record<string, any>;

  getParams(): Record<string, any> {
    return this.params;
  }

  setParams(params: Record<string, any>): void {
    this.params = params;
  }
}
