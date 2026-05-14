import { Experience, Reservation, DashboardMetrics } from '../types/guestflow.types';

export const experiences: Experience[] = [
  {
    id: 'exp-001',
    name: 'Galaxy Adventure',
    type: 'Attraction',
    status: 'AVAILABLE',
    waitTimeMinutes: 25,
    capacity: 120,
    satisfactionScore: 4.8,
  },
  {
    id: 'exp-002',
    name: 'Pirate Journey',
    type: 'Show',
    status: 'DELAYED',
    waitTimeMinutes: 40,
    capacity: 80,
    satisfactionScore: 4.5,
  },
  {
    id: 'exp-003',
    name: 'Jungle Expedition',
    type: 'Attraction',
    status: 'AVAILABLE',
    waitTimeMinutes: 18,
    capacity: 100,
    satisfactionScore: 4.7,
  },
  {
    id: 'exp-004',
    name: 'Castle Lights Show',
    type: 'Show',
    status: 'FULL',
    waitTimeMinutes: 55,
    capacity: 200,
    satisfactionScore: 4.9,
  },
];

export const reservations: Reservation[] = [
  {
    id: 'res-001',
    guestName: 'Ana Silva',
    experienceId: 'exp-001',
    experienceName: 'Galaxy Adventure',
    reservationCode: 'GF-2048',
    status: 'CONFIRMED',
    scheduledTime: '14:30',
  },
  {
    id: 'res-002',
    guestName: 'Lucas Pereira',
    experienceId: 'exp-003',
    experienceName: 'Jungle Expedition',
    reservationCode: 'GF-2049',
    status: 'PENDING',
    scheduledTime: '15:00',
  },
];

export const dashboardMetrics: DashboardMetrics = {
  guestExperienceHealth: 96,
  liveGuestsToday: 1248,
  activeReservations: 342,
  checkinsCompleted: 289,
  averageWaitTimeMinutes: 24,
  topExperience: 'Galaxy Adventure',
  currentRelease: 'v1.3.0',
  releaseConfidence: 92,
  securityReadiness: 95,
  testReliability: 88,
  devopsMaturity: 'Level 3',
};
