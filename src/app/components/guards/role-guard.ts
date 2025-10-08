import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Role } from '../../enums/role';
import { AuthService } from '../../services/auth.service';

export const roleGuard: CanActivateFn = (route, state) => {
  const requiredRoles = route.data?.['roles'] as Role[];

  const authService = inject(AuthService);
  const router = inject(Router);

  const userRole = authService.getRole(); // 🔥 méthode à implémenter dans AuthService

  // Si aucune restriction → accès
  if (!requiredRoles || requiredRoles.length === 0) {
    return true;
  }

  // ADMIN a accès partout
  if (userRole === Role.ADMIN) {
    return true;
  }

  // Vérifie si le rôle utilisateur est dans la liste
  if (requiredRoles.includes(userRole as Role)) {
    return true;
  }

  router.navigate(['/unauthorized']);
  return false;
};
