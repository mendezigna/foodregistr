import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { AngularFireStorage } from "@angular/fire/storage";
import { AngularFireAuth } from "@angular/fire/auth";
import { UtilsService } from "../utils/utils.service";
import { FoodRegistry } from "./food-registry/FoodRegistry";

@Injectable()
export class DayService {
    constructor(
        private fireDAO: AngularFirestore,
        private fireAuth: AngularFireAuth,
        private fireStorage: AngularFireStorage,
        private utilsService: UtilsService
    ) {}

    public async registerFood(foodRegistry: FoodRegistry, blobUrl: string): Promise<any> {
        this.validateFoodRegistryNotEmpty(foodRegistry, blobUrl)

        const uid = (await this.fireAuth.currentUser).uid
        const dateString = this.utilsService.formatDate(foodRegistry.date)
        const imageId = await this.saveImageFromBlob(uid, dateString, blobUrl, foodRegistry.foodType)
        foodRegistry.imageId = imageId
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
