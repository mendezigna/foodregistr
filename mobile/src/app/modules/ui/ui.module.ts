import { NgModule } from "@angular/core";
import { PasswordInputFieldComponent } from "./password-input-field/password-input-field.component";
import { TextInputFieldComponent } from "./text-input-field/text-input-field.component";

@NgModule({
    declarations: [TextInputFieldComponent, PasswordInputFieldComponent],
    exports: [TextInputFieldComponent, PasswordInputFieldComponent],
    imports: [],
  })
  export class UiModule {}