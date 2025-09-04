import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-utilisateurs',
  imports: [CommonModule],
  templateUrl: './utilisateurs.html',
  styleUrl: './utilisateurs.css'
})
export class Utilisateurs implements OnInit {
  users: User[] = [];
  loading = false;
  error = '';

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.loading = true;
    this.userService.getAll().subscribe({
      next: (data) => {
        this.users = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = err.message;
        this.loading = false;
      }
    });
  }

  deleteUser(id: number): void {
    if (!confirm('Voulez-vous vraiment supprimer cet utilisateur ?')) return;

    this.userService.delete(id).subscribe({
      next: () => {
        this.users = this.users.filter(u => u.id !== id);
      },
      error: (err) => {
        alert('Erreur lors de la suppression : ' + err.message);
      }
    });
  }

  // Pour modifier ou ajouter, tu peux ouvrir un modal ou naviguer vers un formulaire
  editUser(user: User): void {
    // Par exemple, naviguer vers /admin/users/edit/:id
    console.log('Modifier utilisateur :', user);
  }

  addUser(): void {
    // Par exemple, naviguer vers /admin/users/add
    console.log('Ajouter un nouvel utilisateur');
  }

}
