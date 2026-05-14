import ServiceReadinessPanel from '../components/ServiceReadinessPanel';

export default function ServiceReadiness() {
  const serviceInfo = [
    { key: 'Service', value: 'guestflow-api' },
    { key: 'Owner', value: 'Digital Experience Team' },
    { key: 'Tier', value: '1' },
    { key: 'Lifecycle', value: 'Production' },
    { key: 'Catalog Status', value: 'Registered' },
    { key: 'Runbook', value: 'Available' },
  ];

  const engineeringGates = [
    { key: 'Health Endpoint', value: 'PASSING', badge: true },
    { key: 'API Contract', value: 'Available' },
    { key: 'Security Scan', value: 'PASSING', badge: true },
    { key: 'Test Coverage', value: '87%' },
    { key: 'Last Deployment', value: 'v1.3.0', mono: true },
    { key: 'Rollback Strategy', value: 'Enabled' },
  ];

  const scorecards = [
    { title: 'Testing Score', value: '88%', level: 'high', pct: 88 },
    { title: 'Security Score', value: '95%', level: 'high', pct: 95 },
    { title: 'DevOps Maturity', value: 'Level 3', level: 'accent-purple', pct: 75 },
    { title: 'Service Readiness', value: '91%', level: 'high', pct: 91 },
  ];

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Service Readiness</h1>
        <p className="page-subtitle">
          A product-facing view of engineering maturity, security posture, testing confidence, and catalog readiness.
        </p>
      </div>

      <div className="readiness-grid">
        <ServiceReadinessPanel title="Service Metadata" rows={serviceInfo} />
        <ServiceReadinessPanel title="Engineering Gates" rows={engineeringGates} />
      </div>

      <div className="section-title" style={{ marginBottom: 16 }}>Scorecards</div>
      <div className="scorecard-grid">
        {scorecards.map((sc) => (
          <div key={sc.title} className="scorecard-card">
            <div className="scorecard-title">{sc.title}</div>
            <div className={`scorecard-value ${sc.level}`}>{sc.value}</div>
            <div className="scorecard-bar">
              <div className="scorecard-bar-fill" style={{ width: `${sc.pct}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
