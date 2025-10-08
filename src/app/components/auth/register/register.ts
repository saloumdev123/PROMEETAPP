import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import intlTelInput from "intl-tel-input";

@Component({
  selector: 'app-register',
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule ],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class RegisterComponent {
  registerForm!: FormGroup;
  isLoading = false;
  registerError: string | null = null;
  showPassword: boolean = false;
  phonePlaceholder: string = "Ex: 77 123 45 67";

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

countries = [
  { code: "SN", flag: "🇸🇳", name: "Sénégal", dial_code: "+221", example: "77 123 45 67" },
  { code: "FR", flag: "🇫🇷", name: "France", dial_code: "+33", example: "6 12 34 56 78" },
  { code: "US", flag: "🇺🇸", name: "États-Unis", dial_code: "+1", example: "202 555 0176" },
  { code: "MA", flag: "🇲🇦", name: "Maroc", dial_code: "+212", example: "612 34 56 78" },
  { code: "CI", flag: "🇨🇮", name: "Côte d'Ivoire", dial_code: "+225", example: "01 23 45 67" }
];


  updatePhonePlaceholder(): void {
    const selectedCode = this.registerForm.get('countryCode')?.value;
    const country = this.countries.find(c => c.code === selectedCode);

    if (country) {
      this.phonePlaceholder = `${country.dial_code} ${country.example}`;
    } else {
      this.phonePlaceholder = "Ex: 77 123 45 67";
    }
  }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      nom: ['', [Validators.required, Validators.minLength(2)]],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).{4,8}$/)]],
      telephone: [''],
      countryCode: ['SN'],
      metier: [''],
      adresse: [''],
      role: ['PARTICULIER', Validators.required],
      typePartenaire: [null],
      typeIdentification: [null],
      numeroIdentification: [null]
    });
    this.updatePhonePlaceholder
  }

  onSubmit(): void {
    if (this.isLoading || this.registerForm.invalid) return;

    this.isLoading = true;
    this.registerError = null;

    let formValue: any = { ...this.registerForm.value };

    if (formValue.role !== 'PARTENAIRE') {
      // Supprimer complètement les champs
      delete formValue.typePartenaire;
      delete formValue.typeIdentification;
      delete formValue.numeroIdentification;
    } else {
      if (['ARTISAN', 'STAGIAIRE'].includes(formValue.typePartenaire)) {
        delete formValue.typeIdentification;
        delete formValue.numeroIdentification;
      }
    }

    this.authService.register(formValue).subscribe({
      next: () => {
        this.router.navigate(['/login']);
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
        this.registerError = err.status === 409
          ? "Email déjà utilisé."
          : "Utilisateur crée avec succès";
      }
    });
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  ngAfterViewInit() {
  const input = document.querySelector("#telephone") as HTMLInputElement;
  intlTelInput(input, {
    initialCountry: "sn"
  });
}
}