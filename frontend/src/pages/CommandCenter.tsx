import { useEffect, useState } from 'react';
import { getDashboard, DashboardMetrics } from '../api/guestflowApi';
import MetricCard from '../components/MetricCard';

export default function CommandCenter() {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getDashboard()
      .then(setMetrics)
      .catch(() => setError('Failed to load dashboard metrics'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <div className="loading-state">
      <div className="spinner" />
      Loading dashboard...
    </div>
  );

  if (error || !metrics) return (
    <div className="alert alert-error">{error || 'No data available'}</div>
  );

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">GuestFlow Command Center</h1>
        <p className="page-subtitle">
          Real-time view of guest experience health, release confidence, and operational readiness.
        </p>
      </div>
      <div className="metrics-grid">
        <MetricCard label="Guest Experience Health" value={`${metrics.guestExperienceHealth}%`} accent="green" sub="Overall platform health" />
        <MetricCard label="Live Guests Today" value={metrics.liveGuestsToday.toLocaleString()} accent="cyan" sub="Active visitors" />
        <MetricCard label="Active Reservations" value={metrics.activeReservations} accent="blue" />
        <MetricCard label="Check-ins Completed" value={metrics.checkinsCompleted} accent="green" />
        <MetricCard label="Avg. Wait Time" value={`${metrics.averageWaitTimeMinutes} min`} accent="yellow" />
        <MetricCard label="Top Experience" value={metrics.topExperience} />
        <MetricCard label="Current Release" value={metrics.currentRelease} accent="purple" />
        <MetricCard label="Release Confidence" value={`${metrics.releaseConfidence}%`} accent="blue" sub="Pipeline quality gate" />
        <MetricCard label="Security Readiness" value={`${metrics.securityReadiness}%`} accent="green" sub="SAST + SCA + secrets" />
        <MetricCard label="Test Reliability" value={`${metrics.testReliability}%`} accent="cyan" sub="Unit + API + E2E" />
        <MetricCard label="DevOps Maturity" value={metrics.devopsMaturity} accent="purple" sub="CI/CD + Catalog + Scorecards" />
      </div>
    </div>
  );
}
