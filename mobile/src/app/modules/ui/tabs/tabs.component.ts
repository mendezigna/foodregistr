import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
})
export class TabsComponent {

  constructor(
    private menu: MenuController
    ) {}

  public goToToday() {
    console.log('WIP')
  }

  public goToWeek() {
    console.log('WIP')
  }

  public goToMonth() {
    console.log('WIP')
  }

  public async openSidebar(): Promise<void> {
    await this.menu.open()
  }

}
