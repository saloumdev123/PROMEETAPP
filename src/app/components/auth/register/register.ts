import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { User } from '../../../models/user.model';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [CommonModule, RouterModule, FormsModule,ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css'] 
})
export class RegisterComponent {
 registerForm!: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],   // correspond à "password" du backend
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      telephone: ['', Validators.required],
      bio: [''],
      localisation: [''],
      role: ['CLIENT'] // valeur par défaut
    });
  }

  onSubmit(): void {
    if (this.isLoading || this.registerForm.invalid) return;

    this.isLoading = true;
    this.authService.register(this.registerForm.value).subscribe({
      next: (response) => {
        console.log('Inscription réussie :', response);
        this.router.navigate(['/dashboard']);
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Erreur lors de l\'inscription :', error);
        this.isLoading = false;
      }
    });
  }
}