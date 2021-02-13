import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import firebase from "firebase/app";

@Injectable()
export class AuthService {
    private fireAuth: firebase.auth.Auth;
    constructor(private http : HttpClient) {
        this.fireAuth = firebase.auth()
    }

    public signup(password: string, email: string, name : string) : Promise<string> {
        return this.fireAuth.createUserWithEmailAndPassword(email, password)
        .then((res) => {
            res.user.updateProfile({displayName : name})
            debugger; return res.user.refreshToken
        })
        .catch((err) => {
            throw new Error(err)
        })
    }

    public login(password: string, email: string) : Promise<string> {
        return this.fireAuth.signInWithEmailAndPassword(email, password)
        .then((res) =>{ 
            return res.user.refreshToken
        })
        .catch((err) => {
            throw new Error(err)
        })
    }
}