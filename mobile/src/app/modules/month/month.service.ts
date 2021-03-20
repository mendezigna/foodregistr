import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MonthService {

    constructor(private router: Router){}

    public navigateToMonth(month: string): void {
        this.router.navigate(['tabs/month', month])
    }

    public navigateToDay(day: number, datestring: string){
        let date = datestring + "-" 
        if(day < 10){
            date = date + "0" + day as string
        } else {
            date = date + day as string
        }
        
        this.router.navigate(['tabs/day', date])
    }
}