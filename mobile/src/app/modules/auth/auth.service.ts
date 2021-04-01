import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from "@angular/fire/firestore";
import firebase from 'firebase/app'
import { Store } from "../utils/store.service";

@Injectable()
export class AuthService {
    
    constructor(
        private fireAuth: AngularFireAuth,
        private fireDAO: AngularFirestore,
        private store: Store
        ) {
            this.fireAuth.onIdTokenChanged(async(user) => {
                if (user) {
                    const reauthenticatedToken = await user.getIdToken()
                    this.store.set('token', reauthenticatedToken)
                }
            })
        }

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
        .then(async(res) => this.saveUserDataLocally(res))
        .catch((err) => {
            throw new Error(err)
        })
    }

    private async saveUserDataLocally(data) {
        return this.store.setUserInfo(
            data.user.displayName,
            data.user.uid,
            data.user.email,
            (data.user.toJSON() as any).stsTokenManager.accessToken,
        )
    }

    private createUser(user, displayName: string) {
        this.fireDAO.collection('user').doc(user.uid).set({
            displayName: displayName,
            email: user.providerData[0].email,
            photoURL: user.providerData[0].photoURL
        })
    }

    public deauthenticate(): void {
        this.store.revokeSession()
        this.fireAuth.signOut()
    }

    public updatePassword(oldPassword: string, newPassword: string): Promise<any>{
        return this.fireAuth.currentUser.then(user => {
            const credentials = firebase.auth.EmailAuthProvider.credential(this.store.get('email'), oldPassword)
            return user.reauthenticateWithCredential(credentials).then(res => {
                return res.user.updatePassword(newPassword)
            })

        })
    }

    public getUserToken(): string {
        return this.store.get('token')
    }
}
