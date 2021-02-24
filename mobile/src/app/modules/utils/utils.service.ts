import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  public async getBlob(blobUrl : string): Promise<any> {
    return await fetch(blobUrl).then(r => r.blob());
  }

  public formatDate(date: Date): string {
    return date.toISOString().split('T')[0]
  }

  public capitalize(str: string): string {
    return str[0].toUpperCase() + str.slice(1);
  }

  public decapitalize(str: string): string {
    return str[0].toLowerCase() + str.slice(1);
  }
}
