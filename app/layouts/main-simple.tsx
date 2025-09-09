import { Outlet } from "react-router";
import { useState } from "react";
import TopBar from "../components/TopBar";
import MobileNavigation from "../components/MobileNavigation";
import { ThemeProvider } from "../contexts/ThemeContext";

export default function ModernMainLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        {/* Top Navigation */}
        <TopBar onMobileMenuToggle={() => setMobileMenuOpen(true)} />
        
        {/* Mobile Navigation */}
        <MobileNavigation 
          isOpen={mobileMenuOpen} 
          onClose={() => setMobileMenuOpen(false)} 
        />

        {/* Main Content */}
        <main className="pt-20">
          <Outlet />
        </main>
      </div>
    </ThemeProvider>
  );
}
