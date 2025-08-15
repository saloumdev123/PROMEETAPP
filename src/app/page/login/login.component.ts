import { Component } from '@angular/core';
import { AuthService } from '../../config/auth.service';
import { Router } from '@angular/router';
import { Utilisateur } from '../../interfaces/utilisateur';
import { Role } from '../../enums/role';
import { UtilisateurService } from '../../services/utilisateur.service';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { UtilisateurCreateDTO } from '../../interfaces/UtilisateurCreateDTO';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  isRegister = true;

  utilisateur: Utilisateur = {
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    role: Role.CLIENT.toString(),
    bio: '',
    localisation: ''
  };
   motDePasse = '';

  constructor(
    private auth: AuthService,
    private utilisateurService: UtilisateurService,
    private router: Router
  ) {}

  toggle() {
    this.isRegister = !this.isRegister;
    this.utilisateur = { nom: '', prenom: '', email: '', telephone: '', role: Role.CLIENT.toString(), bio: '', localisation: '' };
    this.motDePasse = '';
  }

  submit() {
    if (this.isRegister) {
      // Créer le DTO pour le backend
      const newUser: UtilisateurCreateDTO = {
        nom: this.utilisateur.nom,
        prenom: this.utilisateur.prenom,
        email: this.utilisateur.email,
        telephone: this.utilisateur.telephone,
        bio: this.utilisateur.bio,
        localisation: this.utilisateur.localisation,
        motDePasse: this.motDePasse,
        role: "",
        id: 0
      };

      this.utilisateurService.createUtilisateur(newUser).subscribe({
        next: () => {
          alert('Compte créé avec succès !');
          this.toggle(); // switch vers login
        },
        error: (err) => {
          console.error('Erreur backend:', err);
          alert('Erreur lors de l\'inscription : ' + (err.error?.message || err.statusText));
        }
      });
    } else {
      // Login via AuthService
      this.auth.login(this.utilisateur.email, this.motDePasse).subscribe({
        next: () => this.router.navigate(['/accueil']),
        error: () => alert('Email ou mot de passe invalide')
      });
    }
  }

  // Getters pour le HTML
  get submitBtnText(): string {
    return this.isRegister ? 'Créer un compte' : 'Se connecter';
  }

  get toggleTextPrefix(): string {
    return this.isRegister ? 'Vous avez déjà un compte ?' : 'Vous n\'avez pas de compte ?';
  }

  get toggleTextLink(): string {
    return this.isRegister ? 'Se connecter' : 'Créer un compte';
  }

  get passwordPlaceholder(): string {
    return this.isRegister ? 'Créer un mot de passe' : 'Mot de passe';
  }
}
