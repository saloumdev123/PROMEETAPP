import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Candidat, Macros } from '../../models/candidat';
import { CandidatService } from '../../services/candidat.service';
import { CommonModule } from '@angular/common';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-candidat-profil-component',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './candidat-profil-component.html',
  styleUrls: ['./candidat-profil-component.css']
})
export class CandidatProfilComponent implements OnInit {
  candidatForm!: FormGroup;
  candidats: Candidat[] = [];

  isEditing = false;
  currentId: number | null = null;
  resume = '';
  currentTarget: 'resume' | 'lm' | null = null;

  selectedFiles: { [key: string]: File | null } = {
    cv: null,
    lm: null,
    photo: null
  };

  isRecording = false;
  recognition: any;

  // listes dynamiques
  experiences: any[] = [];
  langues: any[] = [];
  educations: any[] = [];
  certifications: any[] = [];
  competences: string[] = [];
  centresInteret: string[] = [];

  showCVForm = false;
  showLMForm = false;

  lettreMotivation = {
    objet: '',
    contenu: ''
  };

  constructor(private fb: FormBuilder, private candidatService: CandidatService) {
    const { webkitSpeechRecognition }: IWindow = <IWindow><unknown>window;
    if (webkitSpeechRecognition) {
      this.recognition = new webkitSpeechRecognition();
      this.recognition.lang = 'fr-FR';
      this.recognition.continuous = true;
      this.recognition.interimResults = true;
      this.recognition.onend = () => (this.isRecording = false);
    }
  }

  ngOnInit(): void {
    this.initForm();
    this.loadCandidats();

    // 🔥 Calcul automatique de l’âge lorsqu’on modifie la date de naissance
    this.candidatForm.get('dateNaissance')?.valueChanges.subscribe((date) => {
      if (date) {
        const age = this.calculerAge(date);
        this.candidatForm.get('age')?.setValue(age);
      }
    });
  }

  /** Initialisation du formulaire */
  initForm(): void {
    this.candidatForm = this.fb.group({
      prenom: ['', Validators.required],
      nom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telephone: [''],
      adresse: [''],
      dateNaissance: [''],
      age: [{ value: null}], // 🔹 âge auto-calculé
      permis: [''], // 🔹 type de permis sélectionné
      metier: [''],
      salaire: [''],
      mobilite: [''],
      resume: ['']
    });
  }

  /** Calcul automatique de l’âge */
  private calculerAge(dateNaissance: string): number {
    const birthDate = new Date(dateNaissance);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  /** Charger la liste des candidats */
  loadCandidats(): void {
    this.candidatService.getCandidats(0, 10).subscribe({
      next: (res) => (this.candidats = res.content || res),
      error: (err) => console.error('Erreur de chargement des candidats', err)
    });
  }

  /** Enregistrer ou modifier un candidat */
  saveCandidat(): void {
    if (this.candidatForm.invalid) return;

    const candidat: Candidat = {
      ...this.candidatForm.getRawValue(),
      macros: this.buildMacros()
    };

    const request = this.isEditing && this.currentId
      ? this.candidatService.updateCandidat(this.currentId, candidat)
      : this.candidatService.createCandidat(candidat);

    request.subscribe({
      next: () => {
        this.loadCandidats();
        this.resetForm();
      },
      error: (err) => console.error('Erreur de sauvegarde', err)
    });
  }

  /** Construire l’objet macros */
  private buildMacros(): Macros {
    return {
      cv: this.selectedFiles['cv']?.name,
      lm: this.selectedFiles['lm']?.name
    };
  }

  /** Gestion de fichier */
  onFileSelected(event: any, type: 'cv' | 'lm' | 'photo'): void {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFiles[type] = file;
      console.log(`Fichier ${type} sélectionné :`, file.name);
    }
  }

  /** Modifier un candidat */
  editCandidat(c: Candidat): void {
    this.isEditing = true;
    this.currentId = c.id || null;
    this.candidatForm.patchValue(c);
  }

  /** Supprimer un candidat */
  deleteCandidat(id?: number): void {
    if (id && confirm('Voulez-vous vraiment supprimer ce candidat ?')) {
      this.candidatService.deleteCandidat(id).subscribe({
        next: () => this.loadCandidats(),
        error: (err) => console.error('Erreur lors de la suppression', err)
      });
    }
  }

  /** Réinitialiser le formulaire */
  resetForm(): void {
    this.isEditing = false;
    this.currentId = null;
    this.candidatForm.reset();
    this.selectedFiles = { cv: null, lm: null, photo: null };
  }

  // --- Gestion des sous-sections ---
  addExperience() { this.experiences.push({ poste: '', entreprise: '', dateDebut: '', dateFin: '', description: '' }); }
  addLangue() { this.langues.push({ nom: '', niveau: '' }); }
  addEducation() { this.educations.push({ diplome: '', institution: '', dateDebut: '', dateFin: '' }); }
  addCertification() { this.certifications.push({ titre: '', organisme: '', dateObtention: '' }); }
  addCompetence() { this.competences.push(''); }
  addCentreInteret() { this.centresInteret.push(''); }

  removeExperience(i: number) { this.experiences.splice(i, 1); }
  removeLangue(i: number) { this.langues.splice(i, 1); }
  removeEducation(i: number) { this.educations.splice(i, 1); }
  removeCertification(i: number) { this.certifications.splice(i, 1); }
  removeCompetence(i: number) { this.competences.splice(i, 1); }
  removeCentreInteret(i: number) { this.centresInteret.splice(i, 1); }

  submitCV() {
    const cvData = {
      resume: this.candidatForm.get('resume')?.value,
      experiences: this.experiences,
      langues: this.langues,
      educations: this.educations,
      certifications: this.certifications,
      photo: this.selectedFiles['photo']?.name
    };
    console.log('CV soumis :', cvData);
  }

  toggleCVForm() { this.showCVForm = !this.showCVForm; if (this.showCVForm) this.showLMForm = false; }
  toggleLMForm() { this.showLMForm = !this.showLMForm; if (this.showLMForm) this.showCVForm = false; }

  submitLM() {
    console.log('Lettre envoyée :', this.lettreMotivation);
    alert('Lettre de motivation soumise !');
  }

  // --- Téléchargement CV PDF ---
  downloadCV() {
    const doc = new jsPDF();
    if (this.selectedFiles['photo']) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const imgData = e.target.result;
        doc.addImage(imgData, 'JPEG', 170, 10, 25, 25);
        this.generateCVContent(doc);
        doc.save('mon-cv.pdf');
      };
      reader.readAsDataURL(this.selectedFiles['photo']);
    } else {
      this.generateCVContent(doc);
      doc.save('mon-cv.pdf');
    }
  }

  private generateCVContent(doc: jsPDF) {
    let y = 20;
    doc.setFontSize(16).setFont('helvetica', 'bold').setTextColor(0, 51, 102);
    const fullName = `${this.candidatForm.get('prenom')?.value} ${this.candidatForm.get('nom')?.value}`.toUpperCase();
    doc.text(fullName, 10, y);

    y += 7;
    doc.setFontSize(10).setFont('helvetica', 'normal').setTextColor(0, 0, 0);
    doc.text(`Adresse: ${this.candidatForm.get('adresse')?.value}`, 10, y);
    y += 5;
    doc.text(`Tél: ${this.candidatForm.get('telephone')?.value}`, 10, y);
    y += 5;
    doc.text(`Email: ${this.candidatForm.get('email')?.value}`, 10, y);
    y += 5;
    doc.text(`Métier: ${this.candidatForm.get('metier')?.value}`, 10, y);
    y += 5;
    doc.text(`Âge: ${this.candidatForm.get('age')?.value} ans`, 10, y);
    y += 5;
    doc.text(`Permis: ${this.candidatForm.get('permis')?.value}`, 10, y);
    y += 10;

    doc.setDrawColor(0, 51, 102);
    doc.line(10, y, 200, y);
    y += 10;

    // Résumé
    doc.setFontSize(13).setFont('helvetica', 'bold').setTextColor(0, 51, 102);
    doc.text('Résumé', 10, y);
    y += 6;
    doc.setFontSize(11).setTextColor(0, 0, 0);
    const resumeText = this.candidatForm.get('resume')?.value || this.resume || '';
    doc.text(resumeText, 10, y, { maxWidth: 180 });
  }

  toggleRecording(target: 'resume' | 'lm') {
    if (!this.recognition) return alert('Reconnaissance vocale non supportée');
    if (this.isRecording) {
      this.recognition.stop();
      this.isRecording = false;
    } else {
      this.currentTarget = target;
      this.recognition.start();
      this.isRecording = true;
      this.recognition.onresult = (event: any) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        if (this.currentTarget === 'resume') this.resume = transcript;
        else if (this.currentTarget === 'lm') this.lettreMotivation.contenu = transcript;
      };
    }
  }
}

interface IWindow extends Window {
  webkitSpeechRecognition: any;
}
