import { Component } from '@angular/core';
import { DayService } from '../../day/day.service';

@Component({
  selector: 'tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
})
export class TabsComponent {

  constructor(private dayService: DayService) {}

  public goToToday() {
    console.log('WIP')
  }

  public goToWeek() {
    console.log('WIP')
  }

}
