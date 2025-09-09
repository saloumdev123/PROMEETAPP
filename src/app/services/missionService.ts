import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, of } from 'rxjs';
import { Mission, MissionFilter, MissionPriority, MissionStatus } from '../models/mission';

@Injectable({
  providedIn: 'root'
})
export class MissionService {
private missionsSubject = new BehaviorSubject<Mission[]>([]);
  public missions$ = this.missionsSubject.asObservable();

  private mockMissions: Mission[] = [
    {
      id: '1',
      reference: 'AEG-CAIROLI',
      type: 'Développement',
      status: MissionStatus.IN_PROGRESS,
      priority: MissionPriority.HIGH,
      title: 'Développement application mobile',
      description: 'Création d\'une application mobile pour la gestion des tâches',
      client: 'CAIROLI',
      assignee: 'Jean Dupont',
      rating: 4.5,
      createdDate: new Date('2024-01-15'),
      dueDate: new Date('2024-03-15'),
      budget: 15000,
      tags: ['Mobile', 'React Native', 'UI/UX']
    },
    {
      id: '2',
      reference: 'WEB-MARTIN',
      type: 'Web Design',
      status: MissionStatus.COMPLETED,
      priority: MissionPriority.MEDIUM,
      title: 'Refonte site web entreprise',
      description: 'Modernisation complète du site web corporate',
      client: 'MARTIN SARL',
      assignee: 'Marie Lambert',
      rating: 5.0,
      createdDate: new Date('2024-01-10'),
      dueDate: new Date('2024-02-28'),
      budget: 8500,
      tags: ['Web', 'Design', 'Responsive']
    },
    {
      id: '3',
      reference: 'API-TECHNOVA',
      type: 'Backend',
      status: MissionStatus.PENDING,
      priority: MissionPriority.URGENT,
      title: 'Développement API REST',
      description: 'Création d\'une API REST pour système de gestion',
      client: 'TECHNOVA',
      assignee: 'Pierre Moreau',
      rating: 0,
      createdDate: new Date('2024-02-01'),
      dueDate: new Date('2024-04-01'),
      budget: 12000,
      tags: ['API', 'Node.js', 'Database']
    },
    {
      id: '4',
      reference: 'UX-INNOVATE',
      type: 'UX/UI',
      status: MissionStatus.IN_PROGRESS,
      priority: MissionPriority.HIGH,
      title: 'Audit UX et redesign',
      description: 'Audit complet UX et proposition de nouveau design',
      client: 'INNOVATE Corp',
      assignee: 'Sophie Bernard',
      rating: 4.0,
      createdDate: new Date('2024-01-20'),
      dueDate: new Date('2024-03-20'),
      budget: 9500,
      tags: ['UX', 'Design', 'Audit']
    },
    {
      id: '5',
      reference: 'SEC-PROTECT',
      type: 'Sécurité',
      status: MissionStatus.ON_HOLD,
      priority: MissionPriority.LOW,
      title: 'Audit de sécurité',
      description: 'Audit complet de sécurité des systèmes informatiques',
      client: 'PROTECT Systems',
      assignee: 'Lucas Petit',
      rating: 3.5,
      createdDate: new Date('2024-02-05'),
      dueDate: new Date('2024-05-01'),
      budget: 20000,
      tags: ['Sécurité', 'Audit', 'Pentest']
    }
  ];

  constructor() {
    this.missionsSubject.next(this.mockMissions);
  }

  getMissions(): Observable<Mission[]> {
    return this.missions$;
  }

  getMissionById(id: string): Observable<Mission | undefined> {
    return this.missions$.pipe(
      map(missions => missions.find(mission => mission.id === id))
    );
  }

  filterMissions(filter: MissionFilter): Observable<Mission[]> {
    return this.missions$.pipe(
      map(missions => missions.filter(mission => {
        const matchesSearch = !filter.search || 
          mission.title.toLowerCase().includes(filter.search.toLowerCase()) ||
          mission.reference.toLowerCase().includes(filter.search.toLowerCase()) ||
          mission.client.toLowerCase().includes(filter.search.toLowerCase());
        
        const matchesStatus = !filter.status || mission.status === filter.status;
        const matchesClient = !filter.client || mission.client.toLowerCase().includes(filter.client.toLowerCase());
        const matchesAssignee = !filter.assignee || mission.assignee.toLowerCase().includes(filter.assignee.toLowerCase());

        return matchesSearch && matchesStatus && matchesClient && matchesAssignee;
      }))
    );
  }

  addMission(mission: Omit<Mission, 'id'>): Observable<Mission> {
    const newMission: Mission = {
      ...mission,
      id: Date.now().toString()
    };
    
    const currentMissions = this.missionsSubject.value;
    this.missionsSubject.next([...currentMissions, newMission]);
    
    return of(newMission);
  }

  updateMission(id: string, updates: Partial<Mission>): Observable<Mission | null> {
    const currentMissions = this.missionsSubject.value;
    const index = currentMissions.findIndex(mission => mission.id === id);
    
    if (index !== -1) {
      const updatedMission = { ...currentMissions[index], ...updates };
      const updatedMissions = [...currentMissions];
      updatedMissions[index] = updatedMission;
      this.missionsSubject.next(updatedMissions);
      return of(updatedMission);
    }
    
    return of(null);
  }

  deleteMission(id: string): Observable<boolean> {
    const currentMissions = this.missionsSubject.value;
    const updatedMissions = currentMissions.filter(mission => mission.id !== id);
    this.missionsSubject.next(updatedMissions);
    return of(true);
  }
}
