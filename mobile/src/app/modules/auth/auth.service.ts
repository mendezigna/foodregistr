import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from "@angular/fire/firestore";
import { Store } from "../utils/store.service";

@Injectable()
export class AuthService {
    constructor(
        private fireAuth: AngularFireAuth,
        private fireDAO: AngularFirestore,
        private store: Store
        ) {}

    public signup(password: string, email: string, name : string) : Promise<string> {
        return this.fireAuth.createUserWithEmailAndPassword(email, password)
        .then((res) => {
            res.user.updateProfile({displayName : name})
            this.createUser(res.user.toJSON(), name)
            return (res.user.toJSON() as any).stsTokenManager.accessToken
        })
        .catch((err) => {
            throw new Error(err)
        })
    }

    public login(password: string, email: string) : any {
        return this.fireAuth.signInWithEmailAndPassword(email, password)
        .then((res) => { 
            return this.store.setUserInfo(
                res.user.displayName,
                res.user.uid,
                (res.user.toJSON() as any).stsTokenManager.accessToken,
            )
        })
        .catch((err) => {
            throw new Error(err)
        })
    }

    private createUser(user, displayName: string) {
        this.fireDAO.collection('user').doc(user.uid).set({
            displayName: displayName,
            email: user.providerData[0].email,
            photoURL: user.providerData[0].photoURL
        })
    }

    public async reauthenticate(): Promise<void> {
        const newToken  = await (await this.fireAuth.currentUser).getIdToken(true)
        this.store.set('token', newToken)
    }
}
