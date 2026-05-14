import { dashboardMetrics } from '../data/mockData';
import { DashboardMetrics } from '../types/guestflow.types';

export function getDashboardMetrics(): DashboardMetrics {
  return { ...dashboardMetrics };
}
