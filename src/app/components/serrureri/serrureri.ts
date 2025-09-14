import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-serrureri',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './serrureri.html',
  styleUrls: ['./serrureri.css']
})
export class Serrureri {
 hero = {
    title: "Réalisez facilement vos travaux de serrurerie et sécurité 🔐",
    subtitle: "Installer une alarme, un verrou, dépannage de serrure...",
      showSearch: true,
    image: "https://images.pexels.com/photos/279810/pexels-photo-279810.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop"
  };

  navigate(link: string) {
    console.log("Navigate to:", link);
    // tu pourras mettre un Router.navigate ici
  }
}
