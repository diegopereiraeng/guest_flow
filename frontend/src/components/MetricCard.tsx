interface MetricCardProps {
  label: string;
  value: string | number;
  accent?: 'blue' | 'green' | 'cyan' | 'yellow' | 'purple';
  sub?: string;
}

export default function MetricCard({ label, value, accent, sub }: MetricCardProps) {
  const accentClass = accent ? ` accent-${accent}` : '';
  return (
    <div className="metric-card">
      <div className="metric-card-label">{label}</div>
      <div className={`metric-card-value${accentClass}`}>{value}</div>
      {sub && <div className="metric-card-sub">{sub}</div>}
    </div>
  );
}
