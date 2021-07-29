import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ViewWillEnter } from "@ionic/angular";
import { UtilsService } from "../../utils/utils.service";
import { WeekService } from "../week.service";

@Component({
  selector: "app-week-page",
  templateUrl: "./week-page.component.html",
  styleUrls: ["./week-page.component.scss"],
})
export class WeekPageComponent implements ViewWillEnter {
  public startOfWeek: string;
  public endOfWeek: string;
  public hasNextWeek: boolean;
  public foodsOfWeek = [];
  constructor(
    private route: ActivatedRoute,
    private utilsService: UtilsService,
    private weekService: WeekService
  ) {}

  ionViewWillEnter() {
    const newDate = new Date();
    newDate.setHours(0, 0, 0, 0);
    this.startOfWeek =
      this.route.snapshot.paramMap.get("startOfWeek") ||
      this.utilsService.formatDate(
        this.utilsService.getFirstDayOfWeek(newDate)
      );
    this.endOfWeek =
      this.route.snapshot.paramMap.get("endOfWeek") ||
      this.utilsService.formatDate(this.utilsService.getLastDayOfWeek(newDate));
    this.hasNextWeek = this.utilsService.stringToDate(this.endOfWeek) < newDate;
    this.weekService
      .getFoods(this.startOfWeek, this.endOfWeek)
      .then((foods) => {
        this.foodsOfWeek = foods;
      });
  }

  navigateToPrevWeek() {
    const lastDayOfPrevWeek = this.utilsService.stringToDate(this.startOfWeek);
    lastDayOfPrevWeek.setDate(lastDayOfPrevWeek.getDate() - 1);

    const firstDayOfPrevWeek = this.utilsService.getFirstDayOfWeek(
      new Date(lastDayOfPrevWeek)
    );

    this.weekService.navigateToWeek(
      this.utilsService.formatDate(firstDayOfPrevWeek),
      this.utilsService.formatDate(lastDayOfPrevWeek)
    );
  }

  navigateToNextWeek() {
    const firstDayOfNextWeek = this.utilsService.stringToDate(this.endOfWeek);
    firstDayOfNextWeek.setDate(firstDayOfNextWeek.getDate() + 1);

    const lastDayOfNextWeek = this.utilsService.getLastDayOfWeek(
      new Date(firstDayOfNextWeek)
    );

    this.weekService.navigateToWeek(
      this.utilsService.formatDate(firstDayOfNextWeek),
      this.utilsService.formatDate(lastDayOfNextWeek)
    );
  }

  getFoods(index: number): string[] {
    return this.foodsOfWeek[index] || [];
  }
}
