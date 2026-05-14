export interface Experience {
  id: string;
  name: string;
  type: string;
  status: 'AVAILABLE' | 'DELAYED' | 'FULL';
  waitTimeMinutes: number;
  capacity: number;
  satisfactionScore: number;
}

export interface Reservation {
  id: string;
  guestName: string;
  experienceId: string;
  experienceName: string;
  reservationCode: string;
  status: 'CONFIRMED' | 'PENDING' | 'CANCELLED';
  scheduledTime: string;
}

export interface CheckIn {
  checkinId: string;
  guestName: string;
  experienceId: string;
  experienceName: string;
  reservationCode: string;
  status: 'CONFIRMED';
  timestamp: string;
}

export interface DashboardMetrics {
  guestExperienceHealth: number;
  liveGuestsToday: number;
  activeReservations: number;
  checkinsCompleted: number;
  averageWaitTimeMinutes: number;
  topExperience: string;
  currentRelease: string;
  releaseConfidence: number;
  securityReadiness: number;
  testReliability: number;
  devopsMaturity: string;
}

export interface HealthStatus {
  status: string;
  service: string;
  version: string;
}

export interface ReadinessStatus {
  status: string;
  dependencies: {
    inMemoryStore: string;
    recommendationEngine: string;
  };
}

export interface VersionInfo {
  app: string;
  version: string;
  commit: string;
  environment: string;
}
