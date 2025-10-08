import { Component, OnInit } from '@angular/core';
import { Client } from '../../models/client';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClientService } from '../../services/client.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-gestion-clients',
  standalone: true, // ⚡ recommandé avec Angular 15+
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './gestion-clients.html',
  styleUrls: ['./gestion-clients.css']
})
export class GestionClients implements OnInit {

  clients: Client[] = [];
  clientForm!: FormGroup;
  isEditing = false;
  selectedClientId?: number;

  constructor(private fb: FormBuilder, private clientService: ClientService) {}

  ngOnInit(): void {
    this.initForm();
    this.loadClients();
  }

  // ✅ Initialisation du formulaire
  private initForm(): void {
    this.clientForm = this.fb.group({
      nom: ['', Validators.required],
      adresse: ['', Validators.required],
      codePostalVille: ['', Validators.required],
      telephone: ['', [Validators.required, Validators.pattern(/^[0-9]{9,}$/)]],
      email: ['', [Validators.required, Validators.email]],
      departement: ['', Validators.required]
    });
  }

  // ✅ Charger tous les clients
  loadClients(): void {
    this.clientService.getAll().subscribe({
      next: (res) => (this.clients = res),
      error: (err) => console.error('Erreur lors du chargement des clients :', err)
    });
  }

saveClient(): void {
  const clientData: Client = this.clientForm.value;

  if (this.selectedClientId) {
    // 🔁 Cas de mise à jour
    this.clientService.update(this.selectedClientId, clientData).subscribe({
      next: () => {
        this.loadClients();
        this.resetForm();
      },
      error: (err) => console.error('Erreur lors de la mise à jour :', err)
    });
  } else {
    // ✅ Cas de création
    this.clientService.create(clientData).subscribe({
      next: (createdClient) => {
        this.clients.push(createdClient); // 🔥 ajoute directement le nouveau client à la liste
        this.resetForm();
      },
      error: (err) => console.error('Erreur lors de la création :', err)
    });
  }
}
listeVisible: boolean = true;

toggleListe(): void {
  this.listeVisible = !this.listeVisible;
}


  // ✅ Préparer la modification
  editClient(client: Client): void {
    this.isEditing = true;
    this.selectedClientId = client.id;
    this.clientForm.patchValue(client);
  }

  // ✅ Supprimer un client
  deleteClient(id: number): void {
    if (confirm('Voulez-vous vraiment supprimer ce client ?')) {
      this.clientService.delete(id).subscribe({
        next: () => this.loadClients(),
        error: (err) => console.error('Erreur lors de la suppression :', err)
      });
    }
  }

  // ✅ Réinitialiser le formulaire
  resetForm(): void {
    this.clientForm.reset();
    this.isEditing = false;
    this.selectedClientId = undefined;
  }

}
