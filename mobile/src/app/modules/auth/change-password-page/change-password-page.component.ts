import { Component, OnInit } from "@angular/core";
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ToastController } from "@ionic/angular";
import { AuthService } from "../auth.service";

@Component({
    selector: 'app-change-password',
    templateUrl: './change-password-page.component.html',
    styleUrls: ['./change-password-page.component.scss']
})
export class ChangePasswordPageComponent implements OnInit{

    private changePasswordForm : FormGroup;
    

    constructor( private router: Router,private formBuilder: FormBuilder, private authService: AuthService, private toast: ToastController) {
      
    }

    ngOnInit() :void{
        this.changePasswordForm = this.formBuilder.group({
            password: new FormControl('', [Validators.required]),
            repeatPassword: new FormControl('', [Validators.required]),
            newPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
        }, {
            validators: [this.mustMatch,this.mustContainNumbersAndLetters]
        });
    }

    get password() { return this.changePasswordForm.get('password'); }

    get repeatPassword() { return this.changePasswordForm.get('repeatPassword'); }

    get newPassword() { return this.changePasswordForm.get('newPassword'); }

    onSubmit(){
        if(!this.changePasswordForm.invalid){
            this.authService.updatePassword(this.changePasswordForm.get('password').value, this.changePasswordForm.get('newPassword').value).then(res => {
                this.successMsg()
                this.changePasswordForm.get('password').setErrors(null)
            }).catch(err => {
                this.changePasswordForm.get('password').setErrors({invalidPassword: true})
                return;
            })
        }else {
            return;
        }
    }
    cancel(){
        this.router.navigate(['tabs/day'])
    }

    private async successMsg() {
        const msg = await this.toast.create({
            message: 'Password changed successfully!',
            duration: 1500,
            color: 'dark'
        });
        msg.present();
    }
    mustMatch(c: AbstractControl) : {invalid: boolean}{
        const newpassword = c.get('newPassword')
        const repeatPassword = c.get('repeatPassword') 
        
        if (newpassword.value !== repeatPassword.value) {
            repeatPassword.setErrors({mustMatch: true})
            return {invalid: true};
        } else {
            repeatPassword.setErrors(null)
        }
        
    }
    mustContainNumbersAndLetters(c: AbstractControl) : {invalid: boolean}{
        
        const letters = /[a-zA-Z]/g;
        const numbers = /[0-9]/g;
        const newpassword = c.get('newPassword')
        if(!letters.test(newpassword.value) || !numbers.test(newpassword.value)){
            newpassword.setErrors({mustContainLetterAndNumber : true})
            return {invalid: true}
        }
    }
}

