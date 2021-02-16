import { JwtHelperService } from '@auth0/angular-jwt';
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(public router: Router,
    private jwtHelper: JwtHelperService) {}
  public canActivate(): boolean {
    if (!this.isAuthenticated()) {
      this.router.navigate(['/auth/login'])
      return false
    }
    return true
  }

  private isAuthenticated(): boolean {
    const token = localStorage.getItem('token')
    return !this.jwtHelper.isTokenExpired(token)
  }
}
