import { useState } from 'react';
import Header from './components/Header';
import CommandCenter from './pages/CommandCenter';
import Experiences from './pages/Experiences';
import CheckIn from './pages/CheckIn';
import ServiceReadiness from './pages/ServiceReadiness';
import './styles/global.css';

type Page = 'command-center' | 'experiences' | 'checkin' | 'service-readiness';

export default function App() {
  const [page, setPage] = useState<Page>('command-center');

  const renderPage = () => {
    switch (page) {
      case 'command-center': return <CommandCenter />;
      case 'experiences': return <Experiences />;
      case 'checkin': return <CheckIn />;
      case 'service-readiness': return <ServiceReadiness />;
    }
  };

  return (
    <div className="app-layout">
      <Header activePage={page} onNavigate={setPage} />
      <main className="main-content">{renderPage()}</main>
    </div>
  );
}
