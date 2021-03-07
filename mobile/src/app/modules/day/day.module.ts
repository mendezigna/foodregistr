import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DayPageComponent } from "./day-page/day-page.component";
import { DayService } from "./day.service";
import { FoodRegistryComponent } from "./food-registry/food-registry.component";
import { UiModule } from '../ui/ui.module';

export const dayRoutes: Routes = [
  {
    path:      ':date',
    component: DayPageComponent
  },
  {
    path:      '',
    component: DayPageComponent
  },
  
];

@NgModule({
    declarations: [FoodRegistryComponent, DayPageComponent],
    exports: [FoodRegistryComponent, DayPageComponent],
    imports: [RouterModule.forChild(dayRoutes), CommonModule, ReactiveFormsModule, IonicModule, UiModule],
    providers: [DayService]
  })
  export class DayModule {}
