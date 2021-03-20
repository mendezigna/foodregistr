import { Component, Input, OnInit } from "@angular/core";
import { MonthService } from "../month.service";

@Component({
    selector: 'month-day',
    templateUrl: './month-day.component.html',
    styleUrls: ['./month-day.component.scss']
})
export class MonthDayComponent implements OnInit{

    @Input() day : number;
    @Input() date: string;

    public deactivated : boolean;

    constructor(private monthService: MonthService){}

    ngOnInit(){
        this.deactivated = this.day > new Date().getDate() && this.date.split("-")[1] as unknown as number >= new Date().getMonth() + 1 && this.date.split("-")[0] as unknown as number >= new Date().getFullYear()
    }

    navigateToDay(): void{
        this.monthService.navigateToDay(this.day, this.date)
    }
}