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
  registerError: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      nom: ['', [Validators.required, Validators.minLength(2)]],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{4,8}$')
      ]],
      telephone: ['', Validators.required],
      bio: [''],
      localisation: [''],
      role: ['CLIENT']
    });
  }

  onSubmit(): void {
    if (this.isLoading || this.registerForm.invalid) return;

    this.isLoading = true;
    this.registerError = null;

    this.authService.register(this.registerForm.value).subscribe({
      next: () => {
        this.router.navigate(['/auth/login']);
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;

        // Gestion erreurs backend
        if (err.status === 409) {
          this.registerError = "Email déjà utilisé.";
        } else {
          this.registerError = "Erreur lors de l'inscription. Veuillez réessayer.";
        }
      }
    });
  }
}