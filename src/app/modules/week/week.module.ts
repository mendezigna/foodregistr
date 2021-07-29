import { CommonModule } from "@angular/common";
import { Component, NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { IonicModule } from "@ionic/angular";
import { DayService } from "../day/day.service";
import { UiModule } from "../ui/ui.module";
import { WeekDayComponent } from "./week-day/week-day.component";
import { WeekPageComponent } from "./week-page/week-page.component";
import { WeekService } from "./week.service";

export const weekRoutes: Routes = [
  {
    path: "",
    component: WeekPageComponent,
  },
  {
    path: ":startOfWeek/:endOfWeek",
    component: WeekPageComponent,
  },
];

@NgModule({
  declarations: [WeekPageComponent, WeekDayComponent],
  exports: [WeekPageComponent],
  imports: [
    RouterModule.forChild(weekRoutes),
    CommonModule,
    IonicModule,
    UiModule,
  ],
  providers: [WeekService, DayService],
})
export class WeekModule {}
