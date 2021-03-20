import { AuthGuard } from './guards/auth.guard';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { TabsComponent } from './modules/ui/tabs/tabs.component';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsComponent,
    children: [
      {
        path: 'day',
        pathMatch:   'prefix',
        canActivate: [AuthGuard],
        loadChildren: () =>
        import('./modules/day/day.module').then(m => m.DayModule)
      },
      {
        path: 'month',
        pathMatch: 'prefix',
        canActivate: [AuthGuard],
        loadChildren: () => import('./modules/month/month.module').then(m => m.MonthModule)
      }
    ]
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
  },
  { path: '**', redirectTo: '/tabs/day', pathMatch: 'full' },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {}
