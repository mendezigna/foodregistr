import { Placeholder } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'password-input-field',
  templateUrl: './password-input-field.component.html',
  styleUrls: ['./password-input-field.component.scss'],
})
export class PasswordInputFieldComponent implements OnInit {

  @Input()
  placeholder : String;

  constructor() { }


  ngOnInit() {
  }


  getPlaceholder(){
    return this.placeholder
  }

}
