import { JwtHelperService } from '@auth0/angular-jwt';
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Store } from '../modules/utils/store.service';
import { AuthService } from '../modules/auth/auth.service';
@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(public router: Router,
    private store: Store,
    private authService: AuthService,
    private jwtHelper: JwtHelperService) {}
  public canActivate(): boolean {
    const token = this.store.get('token')
    
    if (!token) {
      this.router.navigate(['/auth/login'])
      return false
    }

    if (!this.isAuthenticated(token)) {
      this.authService.reauthenticate()
      return true
    }
    
    return true
  }

  private isAuthenticated(token: string): boolean {
    return !this.jwtHelper.isTokenExpired(token)
  }
}
