import { FoodRegistryComponent } from './../food-registry/food-registry.component';
import { Component, OnInit, ViewChildren } from '@angular/core'
import { ToastController } from '@ionic/angular';
import { DayService } from '../day.service';
@Component({
  selector: 'app-day-page',
  templateUrl: './day-page.component.html',
  styleUrls: ['./day-page.component.scss'],
})
export class DayPageComponent implements OnInit {

  @ViewChildren(FoodRegistryComponent)
  foodRegistries: FoodRegistryComponent[]

  foodTypes: string[]

  constructor(private toast: ToastController, private dayService: DayService) {}

  ngOnInit(): void {
    this.foodTypes = this.dayService.getFoodTypes()
    this.dayService.resetDailyFoodRegistries(this.foodTypes)
  }

  public async submit(): Promise<void> {
    for (const foodRegistry of this.foodRegistries) {
      await foodRegistry.submit()
    }
    
    this.dayService.registerDay()
      .then(() => this.successMsg())
      .catch((err) => {
        console.error(err)
        this.failedMsg()
      })
  }

  private async successMsg() {
    const msg = await this.toast.create({
      message: 'Comida registrada con éxito!',
      duration: 1500,
      color: 'dark'
    });
    msg.present();
  }

  private async failedMsg() {
    const msg = await this.toast.create({
      message: 'Tu comida no pudo registrarse. :(',
      duration: 1500,
      color: 'dark'
    });
    msg.present();
  }

}
