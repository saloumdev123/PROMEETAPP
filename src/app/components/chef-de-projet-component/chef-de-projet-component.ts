import { CommonModule } from '@angular/common';
import { AfterViewInit, Component } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Chart } from 'chart.js';
import { PenLine } from 'lucide-angular';

@Component({
  selector: 'app-chef-de-projet-component',
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule],
  templateUrl: './chef-de-projet-component.html',
  styleUrl: './chef-de-projet-component.css'
})
export class ChefDeProjetComponent implements AfterViewInit{
 
    selectedCategory: string = '';

  ngAfterViewInit(): void {
    this.createCharts();
  }

  createCharts() {
    // 🔹 Développeurs
    new Chart('devChart', {
      type: 'doughnut',
      data: {
        labels: ['Actifs', 'Inactifs'],
        datasets: [{
          data: [75, 25],
          backgroundColor: ['#17a2b8', '#e9ecef']
        }]
      }
    });

    // 🔹 Clients
    new Chart('clientChart', {
      type: 'bar',
      data: {
        labels: ['Jan', 'Fév', 'Mar', 'Avr'],
        datasets: [{
          label: 'Nouveaux Clients',
          data: [12, 19, 8, 15],
          backgroundColor: '#007bff'
        }]
      }
    });

    // 🔹 Factures
    new Chart('factureChart', {
      type: 'line',
      data: {
        labels: ['Jan', 'Fév', 'Mar', 'Avr'],
        datasets: [{
          label: 'Factures émises',
          data: [30, 45, 40, 55],
          borderColor: '#28a745',
          fill: false,
          tension: 0.4
        }]
      }
    });

    // 🔹 Projets
    new Chart('projetChart', {
      type: 'pie',
      data: {
        labels: ['Terminés', 'En cours', 'En attente'],
        datasets: [{
          data: [50, 30, 20],
          backgroundColor: ['#ffc107', '#17a2b8', '#dee2e6']
        }]
      }
    });
  }
  
}
