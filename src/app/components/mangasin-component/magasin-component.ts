import { Component, OnInit } from '@angular/core';
import { Magasin } from '../../models/magasin';
import { MagasinService } from '../../services/magasin-service';

@Component({
  selector: 'app-mangasin-component',
  imports: [],
  templateUrl: './mangasin-component.html',
  styleUrl: './mangasin-component.css'
})
export class MagasinComponent implements OnInit {

  magasins: Magasin[] = [];
  selectedMagasin: Magasin | null = null;
  newMagasin: Magasin = { nom: '', localisation: '', telephone: '' };

  constructor(private magasinService: MagasinService) { }

  ngOnInit(): void {
    this.loadMagasins();
  }

  loadMagasins(): void {
    this.magasinService.getMagasins().subscribe(data => this.magasins = data);
  }

  selectMagasin(magasin: Magasin): void {
    this.selectedMagasin = { ...magasin }; // copie pour modification
  }

  createMagasin(): void {
    this.magasinService.createMagasin(this.newMagasin).subscribe(() => {
      this.loadMagasins();
      this.newMagasin = { nom: '', localisation: '', telephone: '' };
    });
  }

  updateMagasin(): void {
    if (this.selectedMagasin && this.selectedMagasin.id) {
      this.magasinService.updateMagasin(this.selectedMagasin.id, this.selectedMagasin).subscribe(() => {
        this.loadMagasins();
        this.selectedMagasin = null;
      });
    }
  }

  deleteMagasin(id: number): void {
    this.magasinService.deleteMagasin(id).subscribe(() => this.loadMagasins());
  }

  cancelEdit(): void {
    this.selectedMagasin = null;
  }

}
