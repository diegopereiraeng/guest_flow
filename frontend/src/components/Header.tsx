type Page = 'command-center' | 'experiences' | 'checkin' | 'service-readiness';

interface HeaderProps {
  activePage: Page;
  onNavigate: (page: Page) => void;
}

const navItems: { id: Page; label: string }[] = [
  { id: 'command-center', label: 'Command Center' },
  { id: 'experiences', label: 'Experiences' },
  { id: 'checkin', label: 'Reservations & Check-ins' },
  { id: 'service-readiness', label: 'Service Readiness' },
];

export default function Header({ activePage, onNavigate }: HeaderProps) {
  return (
    <header className="header">
      <div className="header-brand" onClick={() => onNavigate('command-center')}>
        <div className="header-logo">GF</div>
        <span className="header-title">
          Guest<span>Flow</span>
        </span>
      </div>
      <nav className="header-nav">
        {navItems.map((item) => (
          <button
            key={item.id}
            className={`nav-item${activePage === item.id ? ' active' : ''}`}
            onClick={() => onNavigate(item.id)}
          >
            {item.label}
          </button>
        ))}
      </nav>
      <div className="header-badge">
        <div className="live-dot" />
        Live
      </div>
    </header>
  );
}
