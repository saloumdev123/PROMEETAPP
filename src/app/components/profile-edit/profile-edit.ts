import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router, RouterModule } from '@angular/router';
import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormControl } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-profile-edit',
  imports: [CommonModule, FormsModule,RouterModule, ReactiveFormsModule],
  templateUrl: './profile-edit.html',
  styleUrls: ['./profile-edit.css'] 
})

export class ProfileEdit implements OnInit {
  profileForm!: FormGroup;
  user!: User;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const current = this.authService.currentUser;
    if (current) {
      this.user = { ...current };
      this.initForm();
    }
  }

  initForm(): void {
    this.profileForm = this.fb.group({
      nom: [this.user.nom, Validators.required],
      prenom: [this.user.prenom, Validators.required],
      email: [{ value: this.user.email, disabled: true }, [Validators.required, Validators.email]],
      telephone: [this.user.telephone, Validators.required],
      metier: [this.user.metier || ''],
      adresse: [this.user.adresse || '']
    });
  }

onSubmit(): void {
  if (this.profileForm.invalid) return;

  const updatedUser: User = {
    ...this.user,
    ...this.profileForm.getRawValue()
  };

  this.userService.updateProfile(updatedUser).subscribe({
    next: (res) => {
      console.log('Profil mis à jour', res);
      this.authService.setCurrentUser(res);
      this.router.navigate(['/dashboard']);
    },
    error: (err: HttpErrorResponse) => {
      console.error('Erreur mise à jour profil', err.message);
    }
  });
}


  get nom(): FormControl { return this.profileForm.get('nom') as FormControl; }
  get prenom(): FormControl { return this.profileForm.get('prenom') as FormControl; }
  get email(): FormControl { return this.profileForm.get('email') as FormControl; }
  get telephone(): FormControl { return this.profileForm.get('telephone') as FormControl; }
  get metier(): FormControl { return this.profileForm.get('metier') as FormControl; }
  get adresse(): FormControl { return this.profileForm.get('adresse') as FormControl; }

}
