import { Injectable } from '@nestjs/common';

@Injectable()
export class MsKitchenService {
  getHello(): string {
    return 'Hello World!';
  }
}
