import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClientInfo } from '../../models/document.model';
import { ClientInfoService } from '../../services/client-info-service';

@Component({
  selector: 'app-client-management-component',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './client-management-component.html',
  styleUrls: ['./client-management-component.css']
})
export class ClientManagementComponent implements OnInit {
  clients: ClientInfo[] = [];
  form!: FormGroup;
  adding = false;
  editing = false;
  selectedClientId?: number;

  constructor(private fb: FormBuilder, private clientInfoService: ClientInfoService) {}

  ngOnInit(): void {
    this.initForm();
    this.loadClients();
  }

  private initForm(): void {
    this.form = this.fb.group({
      company: ['', Validators.required],
      manager: ['', Validators.required],
      address: [''],
      phone: [''],
      mobile: [''],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  loadClients(): void {
    this.clientInfoService.getAll().subscribe({
      next: (data) => (this.clients = data),
      error: (err) => console.error('❌ Erreur chargement clients :', err)
    });
  }

  startAdding(): void {
    this.adding = true;
    this.editing = false;
    this.form.reset();
  }

  startEditing(client: ClientInfo): void {
    this.editing = true;
    this.adding = false;
    this.selectedClientId = client.id;
    this.form.patchValue(client);
  }

  save(): void {
    if (this.form.invalid) return;

    const clientData: ClientInfo = this.form.value;

    if (this.adding) {
      this.clientInfoService.create(clientData).subscribe({
        next: () => {
          this.loadClients();
          this.cancel();
        },
        error: (err) => console.error('❌ Erreur création client :', err)
      });
    } else if (this.editing && this.selectedClientId) {
      this.clientInfoService.update(this.selectedClientId, clientData).subscribe({
        next: () => {
          this.loadClients();
          this.cancel();
        },
        error: (err) => console.error('❌ Erreur mise à jour client :', err)
      });
    }
  }

  delete(id: number): void {
    if (!confirm('🗑️ Supprimer ce client ?')) return;
    this.clientInfoService.delete(id).subscribe({
      next: () => this.loadClients(),
      error: (err) => console.error('❌ Erreur suppression client :', err)
    });
  }

  cancel(): void {
    this.adding = false;
    this.editing = false;
    this.form.reset();
  }
}
