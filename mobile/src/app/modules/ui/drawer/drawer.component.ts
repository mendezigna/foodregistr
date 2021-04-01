import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../../auth/auth.service';
import { Store } from '../../utils/store.service';

@Component({
  selector: 'drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss'],
})
export class DrawerComponent {
  username : string

  constructor(
    private router : Router,
    private store: Store,
    private alertController: AlertController,
    private authService: AuthService) { 
    this.username = this.store.get('username')
  }

  logOut(): void {
    this.authService.deauthenticate()
    this.router.navigate(['/auth/login'])
  }

  changePassword(): void {
    this.router.navigate(['auth/change-password'])
  }

  async about(): Promise<void> {
    const alert = await this.alertController.create({
      cssClass: 'about-alert',
      header: 'About',
      subHeader: 'version 1.0',
      message: 'Hi!',
      buttons: [
        {
          text: '@leodelgadodev',
          cssClass: 'about-button',
          handler: () => {
            window.open("https://github.com/leodelgadodev",'_system')
          }
        },
        {
          text: '@mendezigna',
          cssClass: 'about-button',
          handler: () => {
            window.open("https://github.com/mendezigna", '_system')
          }
        },
        {
          text: '@AntonellaDatri',
          cssClass: 'about-button',
          handler: () => {
            window.open("https://github.com/AntonellaDatri", '_system')
          }
        },
        'Ok!'
      ]
    });

    await alert.present();
  }

}
