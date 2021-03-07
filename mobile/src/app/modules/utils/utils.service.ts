import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  public async getBlob(blobUrl : string): Promise<any> {
    return await fetch(blobUrl).then(r => r.blob());
  }

  public downloadImage(url : string){
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'blob';
    xhr.onload = function(event) {
      var blob = xhr.response;
    };
    xhr.open('GET', url);
    xhr.send();
  }

  public formatDate(date: Date): string {
    return new Date(
      date.getTime() - (date.getTimezoneOffset() * 60000)
      ).toISOString().split('T')[0]
  }

  public stringToDate(dateString: string): Date{
    const splitedString = dateString.split("-")
    return new Date(splitedString[0] as unknown as number, splitedString[1] as unknown as number - 1, splitedString[2] as unknown as number)
  }

  public capitalize(str: string): string {
    return str[0].toUpperCase() + str.slice(1);
  }

  public decapitalize(str: string): string {
    return str[0].toLowerCase() + str.slice(1);
  }
}
