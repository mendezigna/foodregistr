import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from "@angular/fire/firestore";
import { Router } from "@angular/router";
import { ToastController } from "@ionic/angular";
import firebase from "firebase/app";
import { Store } from "../utils/store.service";

@Injectable()
export class AuthService {
  constructor(
    private fireAuth: AngularFireAuth,
    private fireDAO: AngularFirestore,
    private store: Store,
    private toastController: ToastController,
    private router: Router
  ) {
    this.fireAuth.onIdTokenChanged(async (user) => {
      if (user) {
        const reauthenticatedToken = await user.getIdToken();
        this.store.set("token", reauthenticatedToken);
      }
    });
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: "Please verify your email address",
      position: "bottom",
      color: "dark",
      buttons: [
        {
          side: "end",
          text: "Ok!",
          handler: () => {
            this.router.navigate(["auth/login"]);
          },
        },
      ],
    });
    toast.present();
  }

  public signup(password: string, email: string, name: string): Promise<void> {
    return this.fireAuth
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        res.user.updateProfile({ displayName: name });

        res.user.sendEmailVerification().then((r) => {
          this.presentToast();
        });

        this.createUser(res.user.toJSON(), name);
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  public login(password: string, email: string): any {
    return this.fireAuth
      .signInWithEmailAndPassword(email, password)
      .then(async (res) => {
        if (!res.user.emailVerified) {
          throw Error("Please verify your email address.");
        }
        this.saveUserDataLocally(res);
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  private async saveUserDataLocally(data) {
    return this.store.setUserInfo(
      data.user.displayName,
      data.user.uid,
      data.user.email,
      (data.user.toJSON() as any).stsTokenManager.accessToken
    );
  }

  private createUser(user, displayName: string) {
    this.fireDAO.collection("user").doc(user.uid).set({
      displayName: displayName,
      email: user.providerData[0].email,
      photoURL: user.providerData[0].photoURL,
    });
  }

  public deauthenticate(): void {
    this.store.revokeSession();
    this.fireAuth.signOut();
  }

  public updatePassword(
    oldPassword: string,
    newPassword: string
  ): Promise<any> {
    return this.fireAuth.currentUser.then((user) => {
      const credentials = firebase.auth.EmailAuthProvider.credential(
        this.store.get("email"),
        oldPassword
      );
      return user.reauthenticateWithCredential(credentials).then((res) => {
        return res.user.updatePassword(newPassword);
      });
    });
  }

  public getUserToken(): string {
    return this.store.get("token");
  }
}
