import { experiences } from '../data/mockData';
import { Experience } from '../types/guestflow.types';

export function getAllExperiences(): Experience[] {
  return [...experiences];
}

export function getExperienceById(id: string): Experience | undefined {
  return experiences.find((e) => e.id === id);
}
