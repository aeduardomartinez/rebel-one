import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

export default function AppShell({ children }) {
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="app-shell">
      <Sidebar collapsed={sidebarCollapsed} />
      <div className="main-area">
        <Header onToggleSidebar={toggleSidebar} />
        <main className="content-area" id="content-area">
          {children}
        </main>
      </div>
    </div>
  );
}
