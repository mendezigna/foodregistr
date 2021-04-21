import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '../../utils/store.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss'],
})
export class SignupPageComponent {

  showNullEmailErr = false  
  showNullNameErr = false
  showShortPassErr = false
  showRepeatPassErr = false
  showMatchPassErr = false
  showRegisteredEmailErr = false

  password  = "";
  email  = "";
  name  = "";
  repeatPassword  = "";


  constructor(private authService : AuthService, 
    private router : Router, private store: Store) {}

  setPassword(event: any): void {
    this.password = event.target.value
    this.showShortPassErr = false
  }

  setRepeatPassword(event : any): void {
    this.repeatPassword = event.target.value
    this.showRepeatPassErr = false
    this.showMatchPassErr = false
  }

  setEmail(event): void {
    this.email = event.target.value
    this.showRegisteredEmailErr = false
    this.showNullEmailErr
  }

  setName(event): void {
    this.name = event.target.value
    this.showNullNameErr = false
  }

  async onSubmit(): Promise<void> {    
    this.verifyField();
    if (this.allFieldsAreOK()) { 
      try {
        await this.authService.signup(this.password, this.email, this.name)
        
      } catch(err) {
        switch(err.message){
          case "Error: The email address is badly formatted.":
            this.showRegisteredEmailErr = true
            break;
          case "Error: Password should be at least 6 characters":
            this.showShortPassErr = true
            break;
          case "Error: The email address is already in use by another account.":
            this.showRegisteredEmailErr = true
            break;
        }
      }
    }
  }

  private allFieldsAreOK(): boolean {
    return (!this.showNullEmailErr && !this.showRepeatPassErr
            && !this.showShortPassErr && !this.showNullNameErr && !this.showMatchPassErr)
  }

  private verifyField(): void {
    this.showNullEmailErr = this.email == ""
    this.showRepeatPassErr = this.repeatPassword == ""
    this.showShortPassErr = this.password.length < 8
    this.showNullNameErr = this.name == ""
    this.showMatchPassErr = (!this.showRepeatPassErr) && this.repeatPassword != this.password

  }
  
}
