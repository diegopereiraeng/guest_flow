import { useEffect, useState } from 'react';
import { getExperiences, Experience } from '../api/guestflowApi';
import ExperienceCard from '../components/ExperienceCard';

export default function Experiences() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getExperiences()
      .then(setExperiences)
      .catch(() => setError('Failed to load experiences'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <div className="loading-state">
      <div className="spinner" />
      Loading experiences...
    </div>
  );

  if (error) return <div className="alert alert-error">{error}</div>;

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Experiences</h1>
        <p className="page-subtitle">
          Availability, wait times, capacity and satisfaction across guest-facing experiences.
        </p>
      </div>
      <div className="experiences-grid">
        {experiences.map((exp) => (
          <ExperienceCard key={exp.id} experience={exp} />
        ))}
      </div>
    </div>
  );
}
