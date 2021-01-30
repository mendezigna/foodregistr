import { EjemploService } from './ejemplo.service';
import { Controller, Delete, Get, Inject, Post, Put, Req } from '@nestjs/common';
import { Request } from 'express';
import { Ejemplo } from './ejemplo';

@Controller('ejemplo')
export class EjemploController {
  
  @Inject()
  private ejemploService!: EjemploService;

  @Get()
  getEjemplo(): Promise<Ejemplo[]> {
    return this.ejemploService.getEjemplos();
  }

  @Get(':id')
  getUnEjemplo(@Req() req: Request): Promise<Ejemplo> {
    return this.ejemploService.getEjemplo(req.params.id);
  }

  @Post()
  postEjemplo(): Promise<void> {
    const ej: Ejemplo = { id: 'caca', field: 'hello world' };
    return this.ejemploService.postEjemplo(ej);
  }

  @Put(':id')
  updateEjemplo(@Req() req: Request): any {
    return this.ejemploService.updateEjemplo(req.params.id);
  }

  @Delete()
  deleteEjemplo(): string {
    return this.ejemploService.deleteEjemplo();
  }
  
}
