import { Outlet } from "react-router";
import { Suspense, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Menu, 
  X, 
  Home,
  Calendar,
  Trash2,
  MapPin,
  Route,
  Trophy,
  BarChart3,
  Sun,
  Moon,
  Leaf,
  Bell,
  Settings,
  User,
  LogOut,
  LogIn,
  Shield
} from "lucide-react";
import { ThemeProvider, useTheme } from "../contexts/ThemeContext";
import { AuthProvider, useAuth } from "../contexts/AuthContext";
import { AuthModal } from "../components/AuthModal";

// Navigation items
const navigationItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "Schedule", href: "/schedule", icon: Calendar },
  { name: "Sort Assistant", href: "/sort", icon: Trash2 },
  { name: "Recycling Hubs", href: "/recycling-hubs", icon: MapPin },
  { name: "Route Optimizer", href: "/route-optimizer", icon: Route },
  { name: "Rewards", href: "/rewards", icon: Trophy },
  { name: "Dashboard", href: "/dashboard", icon: BarChart3 },
  { name: "Admin Panel", href: "/admin", icon: Shield },
];

function MainLayoutContent() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const { theme, toggleTheme, isLoaded: themeLoaded } = useTheme();
  const { user, logout, isAuthenticated, isLoading: authLoading } = useAuth();
  
  console.log('MainLayoutContent render - isAuthenticated:', isAuthenticated, 'user:', user, 'authModalOpen:', authModalOpen);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div 
              className="fixed inset-0 bg-gray-600 bg-opacity-75"
              onClick={() => setSidebarOpen(false)}
            />
            
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 shadow-xl"
            >
              <SidebarContent onClose={() => setSidebarOpen(false)} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        <SidebarContent />
      </div>

      {/* Main content */}
      <div className="lg:pl-72">
        {/* Top navigation */}
        <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
          <button
            type="button"
            className="-m-2.5 p-2.5 text-gray-700 dark:text-gray-300 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>

          {/* Separator */}
          <div className="h-6 w-px bg-gray-200 dark:bg-gray-700 lg:hidden" aria-hidden="true" />

          <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
            <div className="flex items-center gap-x-4 lg:gap-x-6">
              {/* Logo for mobile */}
              <div className="flex items-center lg:hidden">
                <Leaf className="h-8 w-8 text-green-600" />
                <span className="ml-2 text-lg font-semibold text-gray-900 dark:text-white">
                  EcoWaste
                </span>
              </div>
            </div>

            <div className="ml-auto flex items-center gap-x-4 lg:gap-x-6">
              {/* Theme toggle */}
              <button
                type="button"
                className="p-2.5 text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400"
                onClick={() => {
                  console.log('Theme toggle clicked, current theme:', theme);
                  toggleTheme();
                }}
              >
                <span className="sr-only">Toggle theme</span>
                {theme === 'light' ? (
                  <Moon className="h-6 w-6" aria-hidden="true" />
                ) : (
                  <Sun className="h-6 w-6" aria-hidden="true" />
                )}
              </button>

              {/* Notifications */}
              <button
                type="button"
                className="p-2.5 text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400"
              >
                <span className="sr-only">View notifications</span>
                <Bell className="h-6 w-6" aria-hidden="true" />
              </button>

              {/* Separator */}
              <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200 dark:lg:bg-gray-700" aria-hidden="true" />

              {/* Admin Panel Access */}
              <a
                href="/admin"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
              >
                <Shield className="h-4 w-4 mr-2" />
                Admin Panel
              </a>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="py-10">
          <div className="px-4 sm:px-6 lg:px-8">
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
      </div>
      
      {/* Auth Modal */}
      <AuthModal 
        isOpen={authModalOpen} 
        onClose={() => setAuthModalOpen(false)} 
      />
    </div>
  );
}

function SidebarContent({ onClose }: { onClose?: () => void }) {
  return (
    <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-6 pb-4">
      <div className="flex h-16 shrink-0 items-center">
        {onClose && (
          <button
            type="button"
            className="absolute right-4 top-4 text-gray-400 hover:text-gray-500 lg:hidden"
            onClick={onClose}
          >
            <span className="sr-only">Close sidebar</span>
            <X className="h-6 w-6" aria-hidden="true" />
          </button>
        )}
        <Leaf className="h-8 w-8 text-green-600" />
        <span className="ml-3 text-xl font-bold text-gradient">
          EcoWaste Manager
        </span>
      </div>
      
      <nav className="flex flex-1 flex-col">
        <ul role="list" className="flex flex-1 flex-col gap-y-7">
          <li>
            <ul role="list" className="-mx-2 space-y-1">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 hover:bg-gray-50 dark:hover:bg-gray-700 group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-medium transition-colors duration-200"
                      onClick={onClose}
                    >
                      <Icon
                        className="h-6 w-6 shrink-0"
                        aria-hidden="true"
                      />
                      {item.name}
                    </a>
                  </li>
                );
              })}
            </ul>
          </li>
          
          <li className="mt-auto">
            <a
              href="#"
              className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 hover:bg-gray-50 dark:hover:bg-gray-700 group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-medium transition-colors duration-200"
            >
              <Settings
                className="h-6 w-6 shrink-0"
                aria-hidden="true"
              />
              Settings
            </a>
          </li>
        </ul>
      </nav>
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
