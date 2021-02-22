import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from "@angular/fire/firestore";

@Injectable()
export class AuthService {
    constructor(
        private fireAuth: AngularFireAuth,
        private fireDAO: AngularFirestore
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
            return {
                token: (res.user.toJSON() as any).stsTokenManager.accessToken,
                username: res.user.displayName
            }
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
}
