import { DayService } from './../day.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'food-registry',
  templateUrl: './food-registry.component.html',
  styleUrls: ['./food-registry.component.scss'],
})
export class FoodRegistryComponent implements OnInit {

  public hello;

  constructor(
    private dayService: DayService
  ) { }

  ngOnInit() {
    this.hello = this.dayService.getHello();
  }

}
