import { Route } from "@angular/compiler/src/core";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { UtilsService } from "../../utils/utils.service";
import { MonthService } from "../month.service";

@Component({
    selector: 'app-month-page',
    templateUrl: './month-page.component.html',
    styleUrls: ['./month-page.component.scss'],
})
export class MonthPageComponent implements OnInit{
    
    public date: string;
    public monthDays : number[];
    public hasNextMonth: boolean;
    
    constructor(private route: ActivatedRoute, private utilsService : UtilsService, private monthService: MonthService){}
    ngOnInit(){
        this.date = this.route.snapshot.paramMap.get('date') || this.utilsService.formatDate(new Date()).slice(0, 7)
        this.hasNextMonth = this.date.split("-")[1] as unknown as number < new Date().getMonth() + 1 || this.date.split("-")[0] as unknown as number < new Date().getFullYear()
        this.monthDays = this.utilsService.getMonthDays(this.date)
    }

    public navigateToNextMonth(): void {
        const nextMonth = this.utilsService.getNextMonth(this.date)
        this.monthService.navigateToMonth(nextMonth)
    }

    public navigateToPrevMonth(): void {
        const prevMonth = this.utilsService.getPrevMonth(this.date)
        this.monthService.navigateToMonth(prevMonth)
        
    }
}