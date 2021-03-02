import { IonicModule } from '@ionic/angular';
import { NgModule } from "@angular/core";
import { PasswordInputFieldComponent } from "./password-input-field/password-input-field.component";
import { TabsComponent } from "./tabs/tabs.component";
import { TextInputFieldComponent } from "./text-input-field/text-input-field.component";
import { DrawerComponent } from "./drawer/drawer.component";
import { TabsBtnComponent } from './tabs-btn/tabs-btn.component';

@NgModule({
    declarations: [TextInputFieldComponent, PasswordInputFieldComponent, TabsComponent, TabsBtnComponent, DrawerComponent],
    exports: [TextInputFieldComponent, PasswordInputFieldComponent, TabsComponent, TabsBtnComponent, DrawerComponent],
    imports: [IonicModule],
  })
  export class UiModule {}
