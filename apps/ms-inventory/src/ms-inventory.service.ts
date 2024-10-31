import { Injectable } from '@nestjs/common';

@Injectable()
export class MsInventoryService {
  getHello(): string {
    return 'Hello World from MS-INVENTORY!';
  }
}
