import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { AngularFireStorage } from "@angular/fire/storage";
import { AngularFireAuth } from "@angular/fire/auth";
import { UtilsService } from "../utils/utils.service";
import { FoodRegistry } from "./food-registry/FoodRegistry";
import { Store } from "../utils/store.service";
import { Router } from "@angular/router";

@Injectable()
export class DayService {
  constructor(
    private fireDAO: AngularFirestore,
    private fireAuth: AngularFireAuth,
    private fireStorage: AngularFireStorage,
    private utilsService: UtilsService,
    private store: Store,
    private router: Router
  ) {}

  public getFoodTypes(): string[] {
    return ["breakfast", "lunch", "snack", "dinner"];
  }

  public getImage(imageId: string): Promise<string> {
    return this.fireStorage.ref(imageId).getDownloadURL().toPromise();
  }

  public async registerFood(
    foodRegistry: FoodRegistry,
    blobUrl: string,
    date: string
  ): Promise<any> {
    this.validateFoodRegistryNotEmpty(foodRegistry, blobUrl);
    const uid = (await this.fireAuth.currentUser).uid;
    if (blobUrl) {
      foodRegistry.imageId = await this.saveImageFromBlob(
        uid,
        date,
        blobUrl,
        foodRegistry.foodType
      );
    }

    const ref = this.fireDAO.collection(`${uid}`).doc(date).ref;
    return this.fireDAO.firestore.runTransaction(async (transaction) => {
      const foodRegistries =
        (await transaction.get(ref)).get("foodRegistries") || [];
      const food = foodRegistries.find(
        (f) => f.foodType == foodRegistry.foodType
      );

      if (food) {
        foodRegistries.splice(foodRegistries.indexOf(food), 1);
      }

      foodRegistries.push(foodRegistry);
      return transaction.set(ref, { foodRegistries, date });
    });
  }

  public navigateToDayRegistry(date: string, index: number): void {
    this.router.navigate(["tabs/day/register", date], {
      queryParams: { index },
    });
  }

  public navigateToDayView(date: string): void {
    this.router.navigate(["tabs/day", date]);
  }

  public async getFoodRegistriesFromDay(
    dateString: string
  ): Promise<FoodRegistry[]> {
    const uid = this.store.get("uid");
    return this.fireDAO
      .collection(`${uid}`)
      .doc(dateString)
      .get()
      .toPromise()
      .then((snapshot) => {
        return snapshot.get("foodRegistries") || [];
      });
  }

  public mapPreviousRegistries(prevRegistries: FoodRegistry[]): FoodRegistry[] {
    const mappedRegistries: any[] = [];
    for (const type of this.getFoodTypes()) {
      const aRegistry = prevRegistries
        ? prevRegistries.find((registry) => registry.foodType === type)
        : undefined;

      aRegistry
        ? mappedRegistries.push(aRegistry)
        : mappedRegistries.push({ foodType: type });
    }
    return mappedRegistries;
  }

  private validateFoodRegistryNotEmpty(
    foodRegistry: FoodRegistry,
    blobUrl: string
  ) {
    if (foodRegistry.description == "" && blobUrl == "") {
      throw new Error("No food description or image provided.");
    }
  }

  private async saveImageFromBlob(
    uid: string,
    date: string,
    blobUrl: string,
    foodtype: string
  ): Promise<string> {
    const blob = await this.utilsService.getBlob(blobUrl);
    const snapshot = await this.fireStorage
      .ref(uid)
      .child(date + "/" + foodtype)
      .put(blob);
    return snapshot.ref.fullPath;
  }
}
