import { AuthGuard } from './guards/auth.guard';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { TabsComponent } from './modules/ui/tabs/tabs.component';
import { weekRoutes } from './modules/week/week.module';

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
      },
      {
        path: 'week',
        pathMatch: 'prefix',
        canActivate: [AuthGuard],
        loadChildren: () => import('./modules/week/week.module').then(m => m.WeekModule)
      }
    ]
  },
  {
    path: 'auth',
    pathMatch: 'prefix',
    loadChildren: () =>
    import('./modules/auth/auth.module').then(m => m.AuthModule)
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
