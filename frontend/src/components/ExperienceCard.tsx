import { Experience } from '../api/guestflowApi';
import StatusBadge from './StatusBadge';

interface ExperienceCardProps {
  experience: Experience;
}

export default function ExperienceCard({ experience }: ExperienceCardProps) {
  return (
    <div className="experience-card">
      <div className="experience-card-header">
        <div>
          <div className="experience-card-name">{experience.name}</div>
          <div className="experience-card-type">{experience.type}</div>
        </div>
        <StatusBadge status={experience.status} />
      </div>
      <div className="experience-card-stats">
        <div className="experience-stat">
          <div className="experience-stat-value">{experience.waitTimeMinutes}m</div>
          <div className="experience-stat-label">Wait</div>
        </div>
        <div className="experience-stat">
          <div className="experience-stat-value">{experience.capacity}</div>
          <div className="experience-stat-label">Capacity</div>
        </div>
        <div className="experience-stat">
          <div className="experience-stat-value">{experience.satisfactionScore}</div>
          <div className="experience-stat-label">Score</div>
        </div>
      </div>
    </div>
  );
}
