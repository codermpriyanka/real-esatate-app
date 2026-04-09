import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}
  canActivate(route: ActivatedRouteSnapshot): boolean {
    const userData = sessionStorage.getItem('user');
    if (!userData) {
      this.router.navigate(['/']);
      return false;
    }
    const user = JSON.parse(userData);
    if (route.data.role && route.data.role !== user.role) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}