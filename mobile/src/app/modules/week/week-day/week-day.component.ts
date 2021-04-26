import { Component, Input, OnInit } from "@angular/core";
import { UtilsService } from "../../utils/utils.service";
import { WeekService } from "../week.service";

@Component({
    selector: "week-day",
    templateUrl: "./week-day.component.html",
    styleUrls: ["./week-day.component.scss"]
}) export class WeekDayComponent implements OnInit{
    
    @Input() day: number;
    @Input() firstDayOfWeek: string;
    @Input() registeredFoods: string[] = [];
    public foodTypes : string[]
    public date: Date;
    
    constructor(private weekService: WeekService, private utilsService: UtilsService){}

    ngOnInit(){
        this.foodTypes = this.weekService.getFoodTypes()
        const temp = this.utilsService.stringToDate(this.firstDayOfWeek)
        temp.setDate(temp.getDate() + this.day)
        this.date = temp
        this.day = this.day + 1

    }

    navigateToDay(){
        this.weekService.navigateToDay(this.utilsService.formatDate(this.date))
    }

    hasNextDay(): boolean{
        return this.date > new Date()
    }

    isRegistered(foodtype: string) : boolean{
        return this.registeredFoods.includes(foodtype)
    }

}