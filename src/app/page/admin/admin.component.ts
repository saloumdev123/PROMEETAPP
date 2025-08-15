import { Component } from '@angular/core';
import { UtilisateurCreateDTO } from '../../interfaces/UtilisateurCreateDTO';
import { AdminService } from '../../services/admin.service';
import { Observable } from 'rxjs';
import { RoleType } from '../../enums/role-type';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
 utilisateurs: UtilisateurCreateDTO[] = [];

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadUtilisateurs();
  }

  loadUtilisateurs() {
    this.adminService.getAllUtilisateurs().subscribe({
      next: (data) => this.utilisateurs = data,
      error: (err) => console.error(err)
    });
  }

  changerRoleFromSelect(id: number, value: string) {
    const role = value as RoleType;
    this.adminService.changerRoleUtilisateur(id, role).subscribe({
      next: () => this.loadUtilisateurs(),
      error: (err) => console.error(err)
    });
  }

}
