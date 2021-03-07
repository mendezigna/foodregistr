import { IonicModule, MenuController } from '@ionic/angular';
import { NgModule } from "@angular/core";
import { PasswordInputFieldComponent } from "./password-input-field/password-input-field.component";
import { TabsComponent } from "./tabs/tabs.component";
import { TextInputFieldComponent } from "./text-input-field/text-input-field.component";
import { DrawerComponent } from "./drawer/drawer.component";

@NgModule({
    declarations: [TextInputFieldComponent, PasswordInputFieldComponent, TabsComponent, DrawerComponent],
    exports: [TextInputFieldComponent, PasswordInputFieldComponent, TabsComponent, DrawerComponent],
    imports: [IonicModule],
    providers: [MenuController]
  })
  export class UiModule {}
