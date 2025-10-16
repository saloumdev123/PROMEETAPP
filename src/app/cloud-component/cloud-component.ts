import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LucideAngularModule, Cloud, Shield, Zap, DollarSign, CheckCircle, Server, Globe, Activity, Users, TrendingUp, Award } from 'lucide-angular';

@Component({
  selector: 'app-cloud-component',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './cloud-component.html',
  styleUrl: './cloud-component.css'
})
export class CloudComponent {
  features = [
    'Infrastructure virtualisée haute performance',
    'Sauvegardes automatiques quotidiennes',
    'Monitoring et alertes en temps réel',
    'Certificats SSL et support HTTPS inclus',
    'Compatibilité avec Angular, Spring Boot, et autres frameworks'
  ];

  securityItems = [
    { icon: 'shield', text: 'Firewall applicatif (WAF)', color: 'text-blue-600' },
    { icon: 'lock', text: "Système de détection d'intrusion (IDS)", color: 'text-red-600' },
    { icon: 'server', text: 'Sauvegardes redondées dans plusieurs datacenters', color: 'text-green-600' },
    { icon: 'check', text: "Authentification forte pour l’accès administrateur", color: 'text-amber-600' }
  ];
  toggleAccordion(event: MouseEvent): void {
    const header = event.currentTarget as HTMLElement;
    const body = header.nextElementSibling as HTMLElement;
    const isVisible = body.style.display === 'block';

    body.style.display = isVisible ? 'none' : 'block';
    header.classList.toggle('open', !isVisible);
  }
  showAwsSection = true; // ou false si tu veux la masquer au départ
  openCardIndex: number | null = null;

flipCard(index: number): void {
  this.openCardIndex = this.openCardIndex === index ? null : index;
}


  openIndex: number | null = null;

  maintenanceItems = [
    {
      title: 'Sauvegardes automatiques quotidiennes et hebdomadaires',
      icon: 'bi bi-shield-lock',
      detail: 'Les sauvegardes sont effectuées chaque nuit et chaque semaine, avec stockage redondant sur Amazon S3 pour garantir la récupération rapide des données en cas d’incident.'
    },
    {
      title: 'Supervision en temps réel du serveur et des performances',
      icon: 'bi bi-eye',
      detail: 'Un système de monitoring basé sur Amazon CloudWatch et des alertes CloudTrail surveille en continu la charge, la mémoire et les erreurs système.'
    },
    {
      title: 'Sécurisation HTTPS (Let’s Encrypt / SSL Premium)',
      icon: 'bi bi-lock-fill',
      detail: 'Toutes les communications sont chiffrées via TLS 1.3 avec renouvellement automatique des certificats SSL. Possibilité d’option SSL Premium pour une meilleure réputation de domaine.'
    },
    {
      title: 'Surveillance anti-malware et pare-feu applicatif',
      icon: 'bi bi-bug',
      detail: 'Un pare-feu applicatif (WAF) protège contre les attaques courantes (SQL Injection, XSS). Des scans anti-malware automatiques assurent l’intégrité du serveur.'
    },
    {
      title: 'Maintenance corrective et évolutive incluse',
      icon: 'bi bi-gear-wide-connected',
      detail: 'Les mises à jour de sécurité, correctifs et évolutions techniques sont assurés sans interruption de service. Une équipe technique est disponible pour tout ajustement.'
    }
  ];

  toggleDetail(index: number): void {
    this.openIndex = this.openIndex === index ? null : index;
  }


  toggleRegion(index: number): void {
    this.openIndex = this.openIndex === index ? null : index;
  }

  openCard: string | null = null;

  private closeTimeout: any;

  // Ordre des cartes (identifiants dans ton HTML)
  private cardOrder = ['users', 'monitoring', 'files', 'security'];

  toggleDropdown(card: string) {
    // Annuler tout timer précédent
    if (this.closeTimeout) clearTimeout(this.closeTimeout);

    // Ouvrir la carte cliquée
    this.openCard = card;

    // Trouver la suivante
    const currentIndex = this.cardOrder.indexOf(card);
    const nextCard = this.cardOrder[(currentIndex + 1) % this.cardOrder.length];

    // Après 2 secondes, fermer celle-ci et ouvrir la suivante
    this.closeTimeout = setTimeout(() => {
      this.openCard = nextCard;
      this.toggleDropdown(nextCard);
    }, 10000);

  }
}