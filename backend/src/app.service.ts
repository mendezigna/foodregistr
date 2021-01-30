import { Injectable } from '@nestjs/common';
import { Ejemplo } from './modules/ejemplo/ejemplo';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  print(input: Ejemplo): void {
    console.log(input);
  }
}
