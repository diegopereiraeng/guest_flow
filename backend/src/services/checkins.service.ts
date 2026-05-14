import { CheckIn } from '../types/guestflow.types';
import { getExperienceById } from './experiences.service';

const checkins: CheckIn[] = [];

export function createCheckin(
  guestName: string,
  experienceId: string,
  reservationCode: string
): CheckIn {
  const experience = getExperienceById(experienceId);
  if (!experience) {
    throw new Error('Experience not found');
  }

  const checkin: CheckIn = {
    checkinId: `chk-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    guestName,
    experienceId,
    experienceName: experience.name,
    reservationCode,
    status: 'CONFIRMED',
    timestamp: new Date().toISOString(),
  };

  checkins.push(checkin);
  return checkin;
}

export function getAllCheckins(): CheckIn[] {
  return [...checkins];
}
