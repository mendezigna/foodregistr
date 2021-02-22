import { FoodRegistryComponent } from './../food-registry/food-registry.component';
import { Component, ViewChild } from '@angular/core'
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-day-page',
  templateUrl: './day-page.component.html',
  styleUrls: ['./day-page.component.scss'],
})
export class DayPageComponent {

  @ViewChild(FoodRegistryComponent)
  foodRegistry: FoodRegistryComponent

  foodTypes: string[] = ['breakfast','lunch','snack','dinner']

  constructor(private toast: ToastController) {}

  public submit(): void {
    this.foodRegistry.submit()
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
