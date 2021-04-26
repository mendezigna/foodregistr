import { UtilsService } from './../../utils/utils.service';
import { FoodRegistry } from './FoodRegistry';
import { DayService } from './../day.service'
import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core'
import { Camera, CameraPhoto, CameraResultType } from '@capacitor/core'
import { IonTextarea, ToastController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'food-registry',
  templateUrl: './food-registry.component.html',
  styleUrls: ['./food-registry.component.scss'],
})
export class FoodRegistryComponent implements OnInit, AfterViewInit {

  public imageBlobUrl: string

  public description: string

  public image: string

  public totalCharacters: number;

  @ViewChild('description') textArea: IonTextarea;

  date: string

  @Input()
  public foodType: string

  @Input()
  public foodRegistry: FoodRegistry
  public hasNextDay : boolean;


  constructor(
    private dayService: DayService,
    private utilsService: UtilsService,
    private toast: ToastController,
    private route: ActivatedRoute
  ) {}

  ngAfterViewInit(): void {
    this.textArea.value = this.foodRegistry.description || ''
  }
  
  ngOnInit(): void {
    this.date = this.route.snapshot.paramMap.get("date") || this.utilsService.formatDate(new Date())
    this.hasNextDay = this.utilsService.formatDate(new Date()) > this.date
    this.foodType = this.utilsService.capitalize(this.foodRegistry.foodType)
    this.description = this.foodRegistry.description || ''
    this.totalCharacters = this.description.length

    if(this.foodRegistry.imageId){
      this.dayService.getImage(this.foodRegistry.imageId).then(url => {
        this.utilsService.downloadImage(url)
        this.image = url
      }).catch(err => console.log(err))
    }
  }

  public navigateToNextDay(): void {
    const nextDay = this.utilsService.getNextDay(this.date)
    this.dayService.navigateToDayRegistry(nextDay, 0)
  }

  public navigateToPrevDay(): void {
    const prevDay = this.utilsService.getPrevDay(this.date)
    this.dayService.navigateToDayRegistry(prevDay, 0)

  }

  public getImage() : string{
    return this.imageBlobUrl || this.image || ""
  }

  public setDescription(event : any): void {
    this.description = event.target.value
    this.totalCharacters = this.description.length
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

  public submit(): void {
    const foodRegistry: FoodRegistry = {
      description: this.description,
      foodType: this.utilsService.decapitalize(this.foodType),
      imageId: this.foodRegistry.imageId || '',
    }

    this.dayService.registerFood(foodRegistry, this.imageBlobUrl, this.date)
      .then(() => this.successMsg())
      .catch(err => {
        console.error(err)
        this.failedMsg()
      })
  }

  public isRegistered() : boolean{
    return this.description == "" && this.getImage() == ""
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
