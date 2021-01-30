import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DayPageComponent } from "./day-page/day-page.component";
import { DayService } from "./day.service";
import { FoodRegistryComponent } from "./food-registry/food-registry.component";

export const dayRoutes: Routes = [
  {
    path:      '',
    component: DayPageComponent
  }
];

@NgModule({
    declarations: [FoodRegistryComponent, DayPageComponent],
    exports: [FoodRegistryComponent, DayPageComponent],
    imports: [RouterModule.forChild(dayRoutes),],
    providers: [DayService]
  })
  export class DayModule {}