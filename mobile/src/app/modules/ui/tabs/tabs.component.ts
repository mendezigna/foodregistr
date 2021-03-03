import { Component, ViewChild } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { DrawerComponent } from '../drawer/drawer.component';


@Component({
  selector: 'tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
})
export class TabsComponent {

  constructor(private menu : MenuController){

  }

  public goToToday() {
    console.log('WIP')
  }

  public goToWeek() {
    console.log('WIP')
  }

  public goToMonth() {
    console.log('WIP')
  }

  public openSidebar() {
    this.menu.open("first").then().catch(console.log)
  }

}
