import { Injectable } from "@nestjs/common";

@Injectable()
export class UniqueService {
  params: Record<string, unknown>;

  getParams(): Record<string, unknown> {
    return this.params;
  }

  setParams(params: Record<string, unknown>): void {
    this.params = params;
  }
}
