import { EjemploModule } from './modules/ejemplo/ejemplo.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports:     [EjemploModule],
  controllers: [AppController],
  providers:   [AppService]
})
export class AppModule {}
