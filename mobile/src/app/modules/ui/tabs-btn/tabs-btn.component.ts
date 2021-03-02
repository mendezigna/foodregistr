import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'tabs-btn',
  templateUrl: './tabs-btn.component.html',
  styleUrls: ['./tabs-btn.component.scss'],
})
export class TabsBtnComponent implements OnInit {

  @Input('type')
  type: string

  title: string

  icon: string

  ngOnInit(): void {
    this.title = this.type
    switch(this.type) {
      case 'Account': 
        this.icon = "person-circle-outline"
        break
      case 'Month':
        this.icon = "calendar-number-outline"
        break
      case 'Week':
        this.icon = "calendar-outline"
        break
      case 'Today':
        this.icon = "today-outline"
        break
    }
  }

  navigate(): void {
    console.log('WIP')
  }

}
