import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "src/app/guards/auth.guard";
import { UiModule } from "../ui/ui.module";
import { AuthService } from "./auth.service";
import { ChangePasswordPageComponent } from "./change-password-page/change-password-page.component";
import { LoginPageComponent } from "./login-page/login-page.component";
import { SignupPageComponent } from "./signup-page/signup-page.component";

export const authRoutes: Routes = [
  {
    path:      'login',
    component: LoginPageComponent
  },
  {
    path:      'signup',
    component: SignupPageComponent
  },
  {
    path:      'change-password',
    canActivate: [AuthGuard],
    component: ChangePasswordPageComponent
  }
];

@NgModule({
    declarations: [LoginPageComponent, SignupPageComponent, ChangePasswordPageComponent],
    entryComponents: [],
    exports: [LoginPageComponent, SignupPageComponent, ChangePasswordPageComponent],
    imports: [RouterModule.forChild(authRoutes), UiModule, HttpClientModule, CommonModule, FormsModule, ReactiveFormsModule],
    providers: [AuthService]
  })
  export class AuthModule {}
