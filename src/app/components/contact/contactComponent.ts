import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule,TranslateModule ],
  templateUrl: './contactComponent.html',
  styleUrl: './contact.css'
})
export class ContactComponent {

  contactForm: FormGroup;
  phonePlaceholder = "Numéro de téléphone";

  countries = [
    { name: "France", code: "+33", flag: "🇫🇷", placeholder: "6 12 34 56 78", regex: /^[1-9]\d{8}$/ },
    { name: "Sénégal", code: "+221", flag: "🇸🇳", placeholder: "77 123 45 67", regex: /^(70|76|77|78)\d{7}$/ },
    { name: "USA", code: "+1", flag: "🇺🇸", placeholder: "202 555 0182", regex: /^\d{10}$/ },
    { name: "Maroc", code: "+212", flag: "🇲🇦", placeholder: "612-345678", regex: /^6\d{8}$/ },
    { name: "Algérie", code: "+213", flag: "🇩🇿", placeholder: "0551 23 45 67", regex: /^0[567]\d{8}$/ },
    { name: "Canada", code: "+1", flag: "🇨🇦", placeholder: "416 123 4567", regex: /^\d{10}$/ },
    { name: "Espagne", code: "+34", flag: "🇪🇸", placeholder: "612 34 56 78", regex: /^[6-7]\d{8}$/ },
    { name: "Italie", code: "+39", flag: "🇮🇹", placeholder: "312 345 6789", regex: /^\d{9,10}$/ },
    { name: "Allemagne", code: "+49", flag: "🇩🇪", placeholder: "1512 3456789", regex: /^\d{10,11}$/ },
    { name: "Royaume-Uni", code: "+44", flag: "🇬🇧", placeholder: "7123 456789", regex: /^7\d{9}$/ },
    { name: "Brésil", code: "+55", flag: "🇧🇷", placeholder: "21 91234-5678", regex: /^\d{10,11}$/ },
    { name: "Inde", code: "+91", flag: "🇮🇳", placeholder: "91234 56789", regex: /^[6-9]\d{9}$/ },
    { name: "Chine", code: "+86", flag: "🇨🇳", placeholder: "138 0013 8000", regex: /^1[3-9]\d{9}$/ },
    { name: "Japon", code: "+81", flag: "🇯🇵", placeholder: "090 1234 5678", regex: /^0\d{9,10}$/ },
    { name: "Turquie", code: "+90", flag: "🇹🇷", placeholder: "531 234 5678", regex: /^5\d{9}$/ },
    { name: "Russie", code: "+7", flag: "🇷🇺", placeholder: "912 123 4567", regex: /^9\d{9}$/ },
    { name: "Afrique du Sud", code: "+27", flag: "🇿🇦", placeholder: "82 123 4567", regex: /^0\d{9}$/ },
    { name: "Égypte", code: "+20", flag: "🇪🇬", placeholder: "010 123 45678", regex: /^01[0-2,5]\d{8}$/ },
    { name: "Tunisie", code: "+216", flag: "🇹🇳", placeholder: "20 123 456", regex: /^[2-9]\d{7}$/ },
    { name: "Belgique", code: "+32", flag: "🇧🇪", placeholder: "471 23 45 67", regex: /^4\d{8}$/ },
    { name: "Suisse", code: "+41", flag: "🇨🇭", placeholder: "79 123 45 67", regex: /^7[5-9]\d{7}$/ },
    { name: "Luxembourg", code: "+352", flag: "🇱🇺", placeholder: "621 123 456", regex: /^6\d{8}$/ },
    { name: "Pays-Bas", code: "+31", flag: "🇳🇱", placeholder: "612 345 678", regex: /^6\d{8}$/ },
    { name: "Portugal", code: "+351", flag: "🇵🇹", placeholder: "912 345 678", regex: /^9[1236]\d{7}$/ },
    { name: "Suède", code: "+46", flag: "🇸🇪", placeholder: "070 123 45 67", regex: /^7\d{8}$/ },
    { name: "Norvège", code: "+47", flag: "🇳🇴", placeholder: "412 34 567", regex: /^4\d{7}$/ },
    { name: "Danemark", code: "+45", flag: "🇩🇰", placeholder: "20 12 34 56", regex: /^[2-9]\d{7}$/ },
    { name: "Finlande", code: "+358", flag: "🇫🇮", placeholder: "050 1234567", regex: /^0\d{6,9}$/ },
    { name: "Grèce", code: "+30", flag: "🇬🇷", placeholder: "691 234 5678", regex: /^6\d{9}$/ },
    { name: "Mexique", code: "+52", flag: "🇲🇽", placeholder: "55 1234 5678", regex: /^\d{10}$/ }
  ];

  recording = false;
  mediaRecorder!: MediaRecorder;
  audioChunks: Blob[] = [];

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      countryCode: [this.countries[0].code],
      phone: ['', Validators.required],
      message: ['', Validators.required]
    });

    this.updatePlaceholder();
  }

  updatePlaceholder() {
    const code = this.contactForm.get('countryCode')?.value;
    const country = this.countries.find(c => c.code === code);
    this.phonePlaceholder = country ? country.placeholder : "Numéro de téléphone";

    // Mise à jour de la validation dynamique
    if (country) {
      this.contactForm.get('phone')?.setValidators([
        Validators.required,
        Validators.pattern(country.regex)
      ]);
      this.contactForm.get('phone')?.updateValueAndValidity();
    }
  }

  // 🎤 Enregistrement vocal
  async startRecording() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.mediaRecorder = new MediaRecorder(stream);
      this.audioChunks = [];
      this.recording = true;

      this.mediaRecorder.ondataavailable = (event) => {
        this.audioChunks.push(event.data);
      };

      this.mediaRecorder.onstop = () => {
        this.recording = false;
        const audioBlob = new Blob(this.audioChunks, { type: 'audio/mp3' });
        const audioUrl = URL.createObjectURL(audioBlob);
        console.log("Enregistrement audio prêt :", audioUrl);
      };

      this.mediaRecorder.start();
      setTimeout(() => this.stopRecording(), 5000); // auto-stop après 5 sec
    }
  }

  stopRecording() {
    this.mediaRecorder.stop();
  }

  onSubmit() {
    if (this.contactForm.valid) {
      console.log("Formulaire envoyé :", this.contactForm.value);
    } else {
      console.log("Formulaire invalide !");
    }
  }
}
