import { EjemploModule } from './modules/ejemplo/ejemplo.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
@Module({
  imports:     [EjemploModule],
  controllers: [AppController],
  providers:   []
})
export class AppModule {}
