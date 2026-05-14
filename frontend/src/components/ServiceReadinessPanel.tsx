import StatusBadge from './StatusBadge';

interface ReadinessRow {
  key: string;
  value: string;
  mono?: boolean;
  badge?: boolean;
}

interface ServiceReadinessPanelProps {
  title: string;
  rows: ReadinessRow[];
}

export default function ServiceReadinessPanel({ title, rows }: ServiceReadinessPanelProps) {
  return (
    <div className="readiness-card">
      <div className="readiness-card-title">{title}</div>
      {rows.map((row) => (
        <div key={row.key} className="readiness-row">
          <span className="readiness-key">{row.key}</span>
          {row.badge ? (
            <StatusBadge status={row.value} />
          ) : (
            <span className={`readiness-value${row.mono ? ' mono' : ''}`}>{row.value}</span>
          )}
        </div>
      ))}
    </div>
  );
}
