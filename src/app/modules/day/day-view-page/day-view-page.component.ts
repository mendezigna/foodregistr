import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ViewWillEnter } from "@ionic/angular";
import { UtilsService } from "../../utils/utils.service";
import { DayService } from "../day.service";
import { FoodRegistry } from "../food-registry/FoodRegistry";

@Component({
  selector: "app-day-view-page",
  templateUrl: "./day-view-page.component.html",
  styleUrls: ["./day-view-page.component.scss"],
})
export class DayViewPageComponent implements OnInit, ViewWillEnter {
  public dayDate: string;

  foodRegistries: FoodRegistry[];

  foodTypes: string[];

  public hasNextDay: boolean;

  constructor(
    private route: ActivatedRoute,
    private utilsService: UtilsService,
    private dayService: DayService
  ) {}

  ionViewWillEnter(): void {
    this.dayDate =
      this.route.snapshot.paramMap.get("date") ||
      this.utilsService.formatDate(new Date());
    this.hasNextDay = this.utilsService.formatDate(new Date()) > this.dayDate;
    this.dayService.getFoodRegistriesFromDay(this.dayDate).then((data: any) => {
      this.foodRegistries = this.dayService.mapPreviousRegistries(data);
    });
  }

  ngOnInit(): void {
    this.foodTypes = this.dayService.getFoodTypes();
  }

  public navigateToNextDay(): void {
    const nextDay = this.utilsService.getNextDay(this.dayDate);
    this.dayService.navigateToDayView(nextDay);
  }

  public navigateToPrevDay(): void {
    const prevDay = this.utilsService.getPrevDay(this.dayDate);
    this.dayService.navigateToDayView(prevDay);
  }
}
