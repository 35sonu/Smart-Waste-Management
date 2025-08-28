import { Outlet } from "react-router";
import { Suspense, useState, useEffect } from "react";
import { ThemeProvider } from "../contexts/ThemeContext";
import { AuthProvider, useAuth } from "../contexts/AuthContext";
import { AuthModal } from "../components/AuthModal";
import TopBar from "../components/TopBar";
import MobileNavigation from "../components/MobileNavigation";
import { ToastContainer, useToast } from "../components/Toast";

function MainLayoutContent() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const { error, user } = useAuth();
  const { toasts, removeToast, success, error: showError } = useToast();

  // Show authentication feedback
  useEffect(() => {
    if (error) {
      showError(error, {
        title: 'Authentication Error',
        duration: 6000
      });
    }
  }, [error, showError]);

  // Show welcome message for new users
  useEffect(() => {
    if (user && user.name) {
      success(`Welcome back, ${user.name}!`, {
        title: 'Sign In Successful',
        duration: 4000
      });
    }
  }, [user?.id]); // Only trigger on user ID change (new sign-in)

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Top Navigation */}
      <TopBar onMobileMenuToggle={() => setMobileMenuOpen(true)} />
      
      {/* Mobile Navigation */}
      <MobileNavigation 
        isOpen={mobileMenuOpen} 
        onClose={() => setMobileMenuOpen(false)} 
      />

      {/* Main Content */}
      <main className="pt-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
          <Suspense 
            fallback={
              <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
              </div>
            }
          >
            <Outlet />
          </Suspense>
        </div>
      </main>
      
      {/* Auth Modal */}
      <AuthModal 
        isOpen={authModalOpen} 
        onClose={() => setAuthModalOpen(false)} 
      />
      
      {/* Toast Notifications */}
      <ToastContainer 
        toasts={toasts} 
        onRemove={removeToast} 
        position="top-right" 
      />
    </div>
  );
}

export default function MainLayout() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <MainLayoutContent />
      </AuthProvider>
    </ThemeProvider>
  );
}
