import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

vi.mock('../api/guestflowApi', () => ({
  getDashboard: () =>
    Promise.resolve({
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
    }),
  getExperiences: () => Promise.resolve([]),
  getReservations: () => Promise.resolve([]),
  getCheckins: () => Promise.resolve([]),
  createCheckin: vi.fn(),
}));

beforeEach(() => {
  vi.clearAllMocks();
});

describe('App', () => {
  it('deve renderizar GuestFlow', () => {
    render(<App />);
    expect(screen.getByText('GF')).toBeTruthy();
  });

  it('deve mostrar navegação com Command Center', () => {
    render(<App />);
    expect(screen.getByText('Command Center')).toBeTruthy();
  });

  it('deve permitir trocar para Experiences', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole('button', { name: 'Experiences' }));
    expect(screen.getByRole('heading', { name: 'Experiences' })).toBeTruthy();
  });
});
