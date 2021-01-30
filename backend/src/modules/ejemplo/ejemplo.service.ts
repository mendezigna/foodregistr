import { Injectable } from '@nestjs/common';

@Injectable()
export class EjemploService {

  // public getEjemplos(): Promise<any> {
  //   return this.FireDAO.collection('test').get();
  // }

  // public getEjemplo(id: string): any {
  //   return this.FireDAO.collection('test').doc(id);
  // }

  // public postEjemplo(unejemplo : Ejemplo): Promise<any> {
  //   return this.FireDAO.collection('test').add(unejemplo);
  // }

  public updateEjemplo(id: string): string {
    return `WORK IN PROGRESS: ${id}`;
  }

  public deleteEjemplo(): string {
    return 'Not nice.';
  }
}
