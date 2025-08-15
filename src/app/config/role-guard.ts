import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AppRole, AuthService } from './auth.service';



@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}
  canActivate(route: ActivatedRouteSnapshot): boolean {
    const allowed = route.data['roles'] as AppRole[];
    const userRole = this.auth.getRole();
    if (userRole && allowed?.includes(userRole)) return true;
    this.router.navigate(['/forbidden']); // ou page d’accueil
    return false;
  }
}
