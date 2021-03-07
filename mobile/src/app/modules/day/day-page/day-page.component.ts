import { FoodRegistryComponent } from './../food-registry/food-registry.component';
import { Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core'
import { IonSlides, ToastController } from '@ionic/angular';
import { DayService } from '../day.service';
import { FoodRegistry } from '../food-registry/FoodRegistry';
import { UtilsService } from '../../utils/utils.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-day-page',
  templateUrl: './day-page.component.html',
  styleUrls: ['./day-page.component.scss'],
})
export class DayPageComponent implements OnInit {

  @ViewChildren(FoodRegistryComponent)
  foodRegistryComponents: QueryList<FoodRegistryComponent>

  @ViewChild('slides') slider: IonSlides

  foodRegistries: FoodRegistry[]

  foodTypes: string[]

  dayDate: string

  constructor(
    private dayService: DayService,
    private utilsService: UtilsService,
    private route: ActivatedRoute) {}

  ngOnInit(): void {
    //this.dayService.resetDailyFoodRegistries(this.foodTypes)
    this.foodTypes = this.dayService.getFoodTypes()
    this.dayDate = this.route.snapshot.paramMap.get("date") || this.utilsService.formatDate(new Date())
    this.getFoodRegistriesFromToday().then((data: any) => {
      this.foodRegistries = this.mapPreviousRegistries(data)
    })
  }
  
  private mapPreviousRegistries(
    prevRegistries: FoodRegistry[]): FoodRegistry[] {
      const mappedRegistries: any[] = []
      for (const type of this.foodTypes) {
        const aRegistry = 
        prevRegistries
        ? prevRegistries.find(registry => registry.foodType === type)
        : undefined

        aRegistry 
        ? mappedRegistries.push(aRegistry) 
        : mappedRegistries.push({foodType: type})
      }
    return mappedRegistries
  }

  // public async submit(): Promise<void> {
  //   this.slider.getActiveIndex().then(index => {
  //     this.foodRegistryComponents.toArray()[index].submit(this.dayDate).then( () => {
  //       this.successMsg()
  //     }).catch(err => {
  //       console.error(err)
  //       this.failedMsg()
  //     })
  //   })
    /*
    for (const foodRegistry of this.foodRegistries) {
      await foodRegistry.submit()
    }
    
    this.dayService.registerDay()
      .then(() => this.successMsg())
      .catch((err) => {
        console.error(err)
        this.failedMsg()
      })
    */
  // }

  public nextSlide(): void {
    this.slider.slideNext();
  }

  public prevSlide(): void {
    this.slider.slidePrev();
  }

  private async getFoodRegistriesFromToday(): Promise<FoodRegistry[]> {
    return this.dayService.getFoodRegistriesFromDay(this.dayDate)
  }

  public getFoodRegistry(foodType: string): FoodRegistry {
    return this.foodRegistries.find((registry) => {
      return registry.foodType === foodType
    })
  }

}
