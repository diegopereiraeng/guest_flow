import { useEffect, useState } from 'react';
import {
  getReservations,
  getCheckins,
  createCheckin,
  Reservation,
  CheckIn,
} from '../api/guestflowApi';
import StatusBadge from '../components/StatusBadge';

export default function CheckInPage() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [checkins, setCheckins] = useState<CheckIn[]>([]);
  const [loading, setLoading] = useState(true);

  const [guestName, setGuestName] = useState('');
  const [experienceId, setExperienceId] = useState('');
  const [reservationCode, setReservationCode] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  useEffect(() => {
    Promise.all([getReservations(), getCheckins()])
      .then(([res, chk]) => { setReservations(res); setCheckins(chk); })
      .finally(() => setLoading(false));
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setFeedback(null);
    try {
      const checkin = await createCheckin({ guestName, experienceId, reservationCode });
      setCheckins((prev) => [checkin, ...prev]);
      setFeedback({ type: 'success', message: `Check-in confirmed! ID: ${checkin.checkinId}` });
      setGuestName('');
      setExperienceId('');
      setReservationCode('');
    } catch (err) {
      setFeedback({ type: 'error', message: err instanceof Error ? err.message : 'Check-in failed' });
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) return (
    <div className="loading-state">
      <div className="spinner" />
      Loading...
    </div>
  );

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Reservations & Check-ins</h1>
        <p className="page-subtitle">
          Simulate a real guest check-in flow backed by API validation and in-memory persistence.
        </p>
      </div>

      <div className="table-container" style={{ marginBottom: 32 }}>
        <div className="table-header">
          <span className="table-title">Active Reservations</span>
        </div>
        <table>
          <thead>
            <tr>
              <th>Guest</th>
              <th>Experience</th>
              <th>Code</th>
              <th>Time</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((r) => (
              <tr key={r.id}>
                <td className="td-primary">{r.guestName}</td>
                <td>{r.experienceName}</td>
                <td><span className="reservation-code">{r.reservationCode}</span></td>
                <td>{r.scheduledTime}</td>
                <td><StatusBadge status={r.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="section-title">Check-in Guest</div>
      <div className="form-card">
        {feedback && (
          <div className={`alert alert-${feedback.type}`}>{feedback.message}</div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">Guest Name</label>
              <input
                className="form-input"
                placeholder="e.g. Ana Silva"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Experience ID</label>
              <input
                className="form-input"
                placeholder="e.g. exp-001"
                value={experienceId}
                onChange={(e) => setExperienceId(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Reservation Code</label>
              <input
                className="form-input"
                placeholder="e.g. GF-2048"
                value={reservationCode}
                onChange={(e) => setReservationCode(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary" disabled={submitting}>
              {submitting ? 'Checking in...' : 'Check in guest'}
            </button>
          </div>
        </form>
      </div>

      <div className="section-title">Recent Check-ins</div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Check-in ID</th>
              <th>Guest</th>
              <th>Experience</th>
              <th>Code</th>
              <th>Status</th>
              <th>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {checkins.length === 0 ? (
              <tr>
                <td colSpan={6}>
                  <div className="empty-state">No check-ins yet. Use the form above.</div>
                </td>
              </tr>
            ) : (
              checkins.map((c) => (
                <tr key={c.checkinId}>
                  <td><span className="reservation-code">{c.checkinId}</span></td>
                  <td className="td-primary">{c.guestName}</td>
                  <td>{c.experienceName}</td>
                  <td><span className="reservation-code">{c.reservationCode}</span></td>
                  <td><StatusBadge status={c.status} /></td>
                  <td>{new Date(c.timestamp).toLocaleTimeString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
