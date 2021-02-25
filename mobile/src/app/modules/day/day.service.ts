import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { AngularFireStorage } from "@angular/fire/storage";
import { AngularFireAuth } from "@angular/fire/auth";
import { UtilsService } from "../utils/utils.service";
import { FoodRegistry } from "./food-registry/FoodRegistry";

@Injectable()
export class DayService {
    private dailyFoodRegistries: any[]

    constructor(
        private fireDAO: AngularFirestore,
        private fireAuth: AngularFireAuth,
        private fireStorage: AngularFireStorage,
        private utilsService: UtilsService
    ) {}

    getFoodTypes(): string[] {
        return ['breakfast','lunch','snack','dinner']
    }

    public resetDailyFoodRegistries(foodTypes: string[]): void {
        this.dailyFoodRegistries = foodTypes.map((type) => { 
            return { foodType: type } 
        })
    }

    public saveDailyFoodRegistryInternally(foodRegistry: FoodRegistry): void {
        const itemToReplace: number = this.dailyFoodRegistries.findIndex((_foodRegistry) => {
            return _foodRegistry.foodType === foodRegistry.foodType
        })
        this.dailyFoodRegistries.splice(itemToReplace, 1, foodRegistry)
    }

    public async registerFood(foodRegistry: FoodRegistry, blobUrl: string): Promise<any> {
        this.validateFoodRegistryNotEmpty(foodRegistry, blobUrl)

        const uid = (await this.fireAuth.currentUser).uid
        const dateString = this.utilsService.formatDate(foodRegistry.date)
        foodRegistry.imageId = await this.saveImageFromBlob(uid, dateString, blobUrl, foodRegistry.foodType)
        foodRegistry.description = foodRegistry.description || ''
        const ref = this.fireDAO.collection(`${uid}`).doc(dateString).ref
        return this.fireDAO.firestore.runTransaction((transaction) => {
            return transaction.get(ref).then( snapshot => {
                const foodRegistries = snapshot.get("foodRegistries") || []
                const food = foodRegistries.find(f => f.foodType == foodRegistry.foodType)

                if (food){
                    console.log(foodRegistries.indexOf(food))
                    foodRegistries.splice(foodRegistries.indexOf(food), 1)
                }
                foodRegistries.push(foodRegistry)
                return transaction.set(ref, {foodRegistries})
            })
        })
        //this.saveDailyFoodRegistryInternally(foodRegistry)
    }

    public async registerDay(): Promise<any> {
        const uid = (await this.fireAuth.currentUser).uid
        const dateString = this.utilsService.formatDate(this.dailyFoodRegistries[0].date)
    
        return this.fireDAO.collection(`${uid}`).doc(dateString).set({
            foodRegistries: this.dailyFoodRegistries
        })
    }

    private validateFoodRegistryNotEmpty(foodRegistry: FoodRegistry, blobUrl: string) {
        if (foodRegistry.description === undefined && blobUrl === undefined) {
            throw new Error('No food description or image provided.')
        }
    }

    private async saveImageFromBlob(uid: string, date : string, blobUrl: string, foodtype: string): Promise<string> {
        let imageId = '';
        if (blobUrl) {
            const blob = await this.utilsService.getBlob(blobUrl)
            const snapshot = await this.fireStorage.ref(uid).child(date + "/" + foodtype).put(blob)
            imageId = snapshot.ref.fullPath;
        }
        return imageId
    }
}
