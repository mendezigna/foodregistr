import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { Router } from "@angular/router";
import { DayService } from "../day/day.service";
import { FoodRegistry } from "../day/food-registry/FoodRegistry";
import { Store } from "../utils/store.service";
import { UtilsService } from "../utils/utils.service";

@Injectable({
  providedIn: "root",
})
export class WeekService {
  constructor(
    private router: Router,
    private fireDAO: AngularFirestore,
    private storeService: Store,
    private utilsService: UtilsService,
    private dayService: DayService
  ) {}

  navigateToWeek(startDay: string, endDay: string) {
    this.router.navigate(["tabs/week", startDay, endDay]);
  }

  navigateToDay(date) {
    this.router.navigate(["tabs/day", date]);
  }

  getFoods(start: string, end: string): Promise<string[]> {
    const uid = this.storeService.get("uid");
    const days = this.getDaysOfWeek(start, end);

    return this.fireDAO
      .collection(uid)
      .ref.where("date", ">=", start)
      .where("date", "<=", end)
      .get()
      .then((snapshot) => {
        const foods = [];
        snapshot.forEach((doc) => {
          const foodRegistrie = (
            (doc.get("foodRegistries") as FoodRegistry[]) || []
          ).map((food) => food.foodType);
          const date = doc.get("date");
          while (days[0] != date) {
            days.splice(0, 1);
            foods.push([]);
          }
          foods.push(foodRegistrie);
          days.splice(0, 1);
        });
        days.forEach((day) => foods.push([]));
        return foods;
      });
  }

  public getFoodTypes(): string[] {
    return this.dayService.getFoodTypes();
  }

  private getDaysOfWeek(start: string, end: string): string[] {
    const days = [];
    const currentDate = this.utilsService.stringToDate(start);
    while (currentDate <= this.utilsService.stringToDate(end)) {
      days.push(this.utilsService.formatDate(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return days;
  }
}
