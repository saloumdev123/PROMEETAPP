import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/authService';
import { NotificationService } from '../services/notification.service';
import { Role } from '../../enums/role';

export const roleGuard: CanActivateFn = (route, state) => {


  const requiredRoles = (route.data?.['roles'] as string[]).map(r => r as Role);

  const authService = inject(AuthService);
  const router = inject(Router);
  const notificationService = inject(NotificationService);

  
  if (!requiredRoles || requiredRoles.length === 0) {
    return true;
  }

  if (authService.hasAnyRole(requiredRoles)) {
    return true;
  }

  notificationService.showError('Accès non autorisé');
  router.navigate(['/dashboard']);
  return false;
};