import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../ui/Navbar';
import Sidebar from '../ui/Sidebar';
import { ThemeProvider } from '../context/ThemeContext';

const MainLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <ThemeProvider>
      <div className="app-shell">
        <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />

        <div className="app-main">
          <Navbar onToggleSidebar={toggleSidebar} />

          <main className="content-container">
            <Outlet />
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default MainLayout;
