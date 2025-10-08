import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-chef-de-projet-component',
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule],
  templateUrl: './chef-de-projet-component.html',
  styleUrl: './chef-de-projet-component.css'
})
export class ChefDeProjetComponent {

}
