const BASE_URL = (import.meta as { env?: Record<string, string> }).env?.VITE_API_BASE_URL ?? 'http://localhost:8080';

async function fetchJson<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, options);
  const data = await res.json();
  if (!res.ok) throw new Error(data.error ?? 'Request failed');
  return data as T;
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
  status: string;
  scheduledTime: string;
}

export interface CheckIn {
  checkinId: string;
  guestName: string;
  experienceId: string;
  experienceName: string;
  reservationCode: string;
  status: string;
  timestamp: string;
}

export interface CheckInPayload {
  guestName: string;
  experienceId: string;
  reservationCode: string;
}

export const getDashboard = () => fetchJson<DashboardMetrics>('/api/dashboard');
export const getExperiences = () => fetchJson<Experience[]>('/api/experiences');
export const getReservations = () => fetchJson<Reservation[]>('/api/reservations');
export const getCheckins = () => fetchJson<CheckIn[]>('/api/checkins');
export const createCheckin = (payload: CheckInPayload) =>
  fetchJson<CheckIn>('/api/checkins', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
