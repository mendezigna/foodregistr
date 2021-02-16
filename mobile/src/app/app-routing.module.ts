import { AuthGuard } from './guards/auth.guard';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '*', redirectTo: '', pathMatch: 'full' },
  {
    path: '',
    pathMatch:   'full',
    loadChildren: () =>
    import('./modules/day/day.module').then(m => m.DayModule)
  },
  {
    path: 'day',
    pathMatch:   'full',
    canActivate: [AuthGuard],
    loadChildren: () =>
    import('./modules/day/day.module').then(m => m.DayModule)
  },
  {
    path: 'auth/login',
    pathMatch: 'full',
    loadChildren: () =>
    import('./modules/auth/login.module').then(m => m.LoginModule)
  },
  {
    path: 'auth/signup',
    pathMatch: 'full',
    loadChildren: () =>
    import('./modules/auth/signup.module').then(m => m.SignupModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {}
