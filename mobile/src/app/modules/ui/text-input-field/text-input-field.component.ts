import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'text-input-field',
  templateUrl: './text-input-field.component.html',
  styleUrls: ['./text-input-field.component.scss'],
})
export class TextInputFieldComponent implements OnInit {

  @Input() icon : String;
  @Input() placeholder : String;
  @Input() type: String;

  constructor() { }

  ngOnInit() {}

}
