import { Request } from 'express';
import { Controller, Get, Post, Req } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('asfsdfgasdsdgsdfa')
  cualquierCosa(): string {
    return 'Cualquier cosa';
  }

  @Post('test')
  logInput(@Req() req: Request): void {
    this.appService.print(req.body);
  }
}
