import { EjemploService } from './ejemplo.service';
import { Module } from '@nestjs/common';
import { EjemploController } from './ejemplo.controller';

@Module({
  imports:     [],
  controllers: [EjemploController],
  providers:   [EjemploService]
})
export class EjemploModule {}
