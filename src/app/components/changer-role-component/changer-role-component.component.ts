import { Component } from '@angular/core';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-changer-role-component',
  standalone: true,
  imports: [],
  templateUrl: './changer-role-component.component.html',
  styleUrl: './changer-role-component.component.css'
})
export class ChangerRoleComponentComponent {
   userId!: number;
  nouveauRole!: 'CLIENT' | 'QUANDIN' | 'PRESTATAIRE';

  constructor(private adminService: AdminService) {}

  changerRole(): void {
    this.adminService.changerRoleUtilisateur(this.userId, this.nouveauRole)
      .subscribe({
        next: () => alert('Rôle mis à jour avec succès'),
        error: () => alert('Erreur lors de la mise à jour du rôle')
      });
  }

}