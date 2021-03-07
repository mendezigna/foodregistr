import { UtilsService } from './../../utils/utils.service';
import { FoodRegistry } from './FoodRegistry';
import { DayService } from './../day.service'
import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core'
import { Camera, CameraPhoto, CameraResultType } from '@capacitor/core'
import { IonTextarea, ToastController } from '@ionic/angular';
@Component({
  selector: 'food-registry',
  templateUrl: './food-registry.component.html',
  styleUrls: ['./food-registry.component.scss'],
})
export class FoodRegistryComponent implements OnInit, AfterViewInit {

  public imageBlobUrl: string

  public description: string

  public image: string

  @ViewChild('description') textArea: IonTextarea;

  @Input()
  public date: string

  @Input()
  public foodType: string

  @Input()
  public foodRegistry: FoodRegistry

  public hasNextDay: boolean

  constructor(
    private dayService: DayService,
    private utilsService: UtilsService,
    private toast: ToastController,
  ) {}

  ngAfterViewInit(): void {
    this.textArea.value = this.foodRegistry.description || ''
  }
  
  ngOnInit(): void {
    this.hasNextDay = this.utilsService.formatDate(new Date()) > this.date
    this.foodType = this.utilsService.capitalize(this.foodRegistry.foodType)
    this.description = this.foodRegistry.description || ''
    if(this.foodRegistry.imageId){
      this.dayService.getImage(this.foodRegistry.imageId).then(url => {
        this.utilsService.downloadImage(url)
        this.image = url
      }).catch(err => console.log(err))
    }
  }

  public getImage() : string{
    return this.imageBlobUrl || this.image || ""
  }

  public setDescription(event : any): void {
    this.description = event.target.value
  }

  public toggleUploadPhoto(): void {
      this.takePhoto().then( res => {
        this.imageBlobUrl = res.webPath
      }).catch( err => console.log(err));
  }

  public removePhoto(): void {
    this.imageBlobUrl = undefined
    this.image = undefined
    this.foodRegistry.imageId = undefined
  }

  private takePhoto(): Promise<CameraPhoto>{
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

  public submit(dateString: string): void {
    const foodRegistry: FoodRegistry = {
      description: this.description || '',
      date: dateString || this.utilsService.formatDate(new Date()),
      foodType: this.utilsService.decapitalize(this.foodType),
      imageId: this.foodRegistry.imageId || '',
    }

    this.dayService.registerFood(foodRegistry, this.imageBlobUrl)
      .then(() => this.successMsg())
      .catch(err => {
        console.error(err)
        this.failedMsg()
      })
  }

  public navigateToNextDay(): void {
    const date = this.utilsService.stringToDate(this.date)
    date.setDate(date.getDate() + 1)
    const nextDay = this.utilsService.formatDate(date)
    this.dayService.navigateToDay(nextDay)
  }

  public navigateToPrevDay(): void {
    const date = this.utilsService.stringToDate(this.date)
    date.setDate(date.getDate() - 1)
    const nextDay = this.utilsService.formatDate(date)
    this.dayService.navigateToDay(nextDay)
  }

  private async successMsg() {
    const msg = await this.toast.create({
      message: 'Saved food registry succesfuly!',
      duration: 1500,
      color: 'dark'
    });
    msg.present();
  }

  private async failedMsg() {
    const msg = await this.toast.create({
      message: 'Save failed. Try again later.',
      duration: 1500,
      color: 'dark'
    });
    msg.present();
  }
}
