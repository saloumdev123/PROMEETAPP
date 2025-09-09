import { Component, OnDestroy, OnInit } from '@angular/core';
import { Mission, MissionFilter, MissionPriority, MissionStatus } from '../../models/mission';
import { debounceTime, distinctUntilChanged, Subject, takeUntil } from 'rxjs';
import { MissionService } from '../../services/missionService';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-mission-list-component',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './mission-list-component.html',
  styleUrls: ['./mission-list-component.css']
})
export class MissionListComponent implements OnInit, OnDestroy {
  missions: Mission[] = [];
  filteredMissions: Mission[] = [];
  loading = false;
  
  filter: MissionFilter = {
    search: '',
    status: '',
    client: '',
    assignee: ''
  };

  private destroy$ = new Subject<void>();
  private filterSubject = new Subject<MissionFilter>();

  constructor(private missionService: MissionService) {}

  ngOnInit(): void {
    this.loadMissions();
    this.setupFilterSubscription();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadMissions(): void {
    this.loading = true;
    this.missionService.getMissions()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (missions) => {
          this.missions = missions;
          this.filteredMissions = missions;
          this.loading = false;
        },
        error: (error) => {
          console.error('Erreur lors du chargement des missions:', error);
          this.loading = false;
        }
      });
  }

  private setupFilterSubscription(): void {
    this.filterSubject
      .pipe(
        debounceTime(300),
        distinctUntilChanged((prev, curr) => JSON.stringify(prev) === JSON.stringify(curr)),
        takeUntil(this.destroy$)
      )
      .subscribe(filter => {
        this.missionService.filterMissions(filter)
          .pipe(takeUntil(this.destroy$))
          .subscribe(filtered => {
            this.filteredMissions = filtered;
          });
      });
  }

  onFilterChange(): void {
    this.filterSubject.next({ ...this.filter });
  }

  getStatusClass(status: MissionStatus): string {
    switch (status) {
      case MissionStatus.COMPLETED:
        return 'status-completed';
      case MissionStatus.IN_PROGRESS:
        return 'status-in-progress';
      case MissionStatus.PENDING:
        return 'status-pending';
      case MissionStatus.ON_HOLD:
        return 'status-on-hold';
      case MissionStatus.CANCELLED:
        return 'status-cancelled';
      default:
        return '';
    }
  }

  getPriorityClass(priority: MissionPriority): string {
    switch (priority) {
      case MissionPriority.URGENT:
        return 'priority-urgent';
      case MissionPriority.HIGH:
        return 'priority-high';
      case MissionPriority.MEDIUM:
        return 'priority-medium';
      case MissionPriority.LOW:
        return 'priority-low';
      default:
        return '';
    }
  }

  getStars(rating: number): boolean[] {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(i <= rating);
    }
    return stars;
  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount);
  }

  formatDate(date: Date): string {
    return new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(new Date(date));
  }

  clearFilters(): void {
    this.filter = {
      search: '',
      status: '',
      client: '',
      assignee: ''
    };
    this.onFilterChange();
  }

  trackByMissionId(index: number, mission: Mission): string {
    return mission.id;
  }

}
