import { UtilsService } from './../../utils/utils.service';
import { FoodRegistry } from './FoodRegistry';
import { DayService } from './../day.service'
import { Component, Input, OnInit } from '@angular/core'
import { Camera, CameraPhoto, CameraResultType } from '@capacitor/core'
@Component({
  selector: 'food-registry',
  templateUrl: './food-registry.component.html',
  styleUrls: ['./food-registry.component.scss'],
})
export class FoodRegistryComponent implements OnInit {

  public imageBlobUrl: string;

  public description: string;

  @Input()
  public foodType: string;

  constructor(
    private dayService: DayService,
    private utilsService: UtilsService
  ) {}
  
  ngOnInit(): void {
    this.foodType = this.utilsService.capitalize(this.foodType)
  }

  public setDescription(event : any): void {
    this.description = event.target.value
  }

  toggleUploadPhoto(): void {
    if (!this.imageBlobUrl) {
      this.takePhoto().then( res => {
        this.imageBlobUrl = res.webPath
      }).catch( () => {
        this.removePhoto()
      });
    }
  }

  removePhoto(): void {
    this.imageBlobUrl = ''
  }

  private takePhoto() : Promise<CameraPhoto>{
    return Camera.getPhoto({
      quality: 50,
      allowEditing: true,
      resultType: CameraResultType.Uri,
      correctOrientation: true,
    })
    // image.webPath will contain a path that can be set as an image src.
    // You can access the original file using image.path, which can be
    // passed to the Filesystem API to read the raw data of the image,
    // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
  }

  public submit(): Promise<any> {
    const foodRegistry: FoodRegistry = {
      description: this.description,
      date: new Date(),
      foodType: this.utilsService.decapitalize(this.foodType)
    }

    return this.dayService.registerFood(foodRegistry, this.imageBlobUrl)
  }
}
