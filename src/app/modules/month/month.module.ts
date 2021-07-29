import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { IonicModule } from "@ionic/angular";
import { UiModule } from "../ui/ui.module";
import { MonthDayComponent } from "./month-day/month-day.component";
import { MonthPageComponent } from "./month-page/month-page.component";
import { MonthService } from "./month.service";

export const monthRoutes: Routes = [
  {
    path: "",
    component: MonthPageComponent,
  },
  {
    path: ":date",
    component: MonthPageComponent,
  },
];

@NgModule({
  declarations: [MonthPageComponent, MonthDayComponent],
  exports: [MonthPageComponent],
  imports: [
    RouterModule.forChild(monthRoutes),
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    UiModule,
  ],
  providers: [MonthService],
})
export class MonthModule {}
