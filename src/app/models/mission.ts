export interface Mission {
  id: string;
  reference: string;
  type: string;
  status: MissionStatus;
  priority: MissionPriority;
  title: string;
  description: string;
  client: string;
  assignee: string;
  rating: number;
  createdDate: Date;
  dueDate: Date;
  budget: number;
  tags: string[];
}

export enum MissionStatus {
  PENDING = 'En attente',
  IN_PROGRESS = 'En cours',
  COMPLETED = 'Terminée',
  CANCELLED = 'Annulée',
  ON_HOLD = 'En pause'
}

export enum MissionPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  URGENT = 'urgent'
}

export interface MissionFilter {
  search: string;
  status: string;
  client: string;
  assignee: string;
}