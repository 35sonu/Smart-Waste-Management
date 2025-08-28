import { useEffect } from "react";
import { NavLink, useLocation } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog } from "@headlessui/react";
import {
  X,
  Home,
  Calendar,
  Trash2,
  MapPin,
  Route,
  Trophy,
  BarChart3,
  Leaf,
  Settings,
  User,
  LogOut,
  LogIn,
  Shield,
  UserCircle
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

// Navigation items
const navigationItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "Schedule", href: "/schedule", icon: Calendar },
  { name: "Sort Assistant", href: "/sort", icon: Trash2 },
  { name: "Recycling Hubs", href: "/hubs", icon: MapPin },
  { name: "Route Optimizer", href: "/route-optimizer", icon: Route },
  { name: "Rewards", href: "/rewards", icon: Trophy },
  { name: "Dashboard", href: "/dashboard", icon: BarChart3 },
];

interface MobileNavigationProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileNavigation({ isOpen, onClose }: MobileNavigationProps) {
  const { user, signInWithGoogle, logout, isAuthenticated, isLoading: authLoading, error, getUserDisplayName, getUserInitials, getUserAvatar } = useAuth();
  const location = useLocation();

  // Close navigation when route changes
  useEffect(() => {
    onClose();
  }, [location.pathname, onClose]);

  // Generate user avatar component
  const renderUserAvatar = () => {
    const avatarUrl = getUserAvatar();
    if (avatarUrl) {
      return (
        <img 
          src={avatarUrl} 
          alt={getUserDisplayName()} 
          className="h-12 w-12 rounded-full object-cover"
        />
      );
    }
    
    if (isAuthenticated) {
      const initials = getUserInitials();
      return (
        <div className="h-12 w-12 rounded-full bg-gradient-to-br from-green-500 to-blue-500 flex items-center justify-center text-white text-lg font-semibold">
          {initials}
        </div>
      );
    }
    
    return <UserCircle className="h-12 w-12 text-gray-400" />;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog
          as={motion.div}
          open={isOpen}
          onClose={onClose}
          className="relative z-50 lg:hidden"
          aria-labelledby="mobile-menu-title"
          aria-describedby="mobile-menu-description"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* Full-screen scrollable container */}
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full">
              {/* Panel */}
              <Dialog.Panel
                as={motion.div}
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
                className="relative flex w-full max-w-xs flex-col bg-white dark:bg-gray-900 shadow-2xl"
              >
                {/* Header */}
                <div className="relative flex h-20 items-center justify-between bg-gradient-to-r from-green-500 to-blue-500 px-6">
                  {/* Logo */}
                  <div className="flex items-center">
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                      className="h-10 w-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center"
                    >
                      <Leaf className="h-6 w-6 text-white" />
                    </motion.div>
                    <div className="ml-3">
                      <h1 className="text-lg font-bold text-white">EcoWaste</h1>
                      <p className="text-xs font-medium text-green-100">Manager</p>
                    </div>
                  </div>

                  {/* Close button */}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={onClose}
                    className="p-2 rounded-xl bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white/50"
                    aria-label="Close navigation menu"
                    title="Close navigation menu"
                  >
                    <X className="h-5 w-5" />
                  </motion.button>
                </div>

                {/* User Profile Section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.3 }}
                  className="px-6 py-6 border-b border-gray-200 dark:border-gray-700"
                >
                  {authLoading ? (
                    <div className="flex items-center space-x-3">
                      <div className="h-12 w-12 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse" />
                      <div className="space-y-2">
                        <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                        <div className="h-3 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                      </div>
                    </div>
                  ) : isAuthenticated ? (
                    <div className="flex items-center space-x-3">
                      {renderUserAvatar()}
                      <div className="flex-1 min-w-0">
                        <p className="text-lg font-semibold text-gray-900 dark:text-white truncate">
                          {getUserDisplayName()}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                          {user?.email || "Welcome back!"}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">
                        Welcome to EcoWaste
                      </p>
                      <div className="flex space-x-3">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={async () => {
                            try {
                              await signInWithGoogle();
                            } catch (error) {
                              console.error('Sign-in error:', error);
                            }
                          }}
                          disabled={authLoading}
                          className="flex-1 inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-xl text-gray-600 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {authLoading ? (
                            <div className="w-4 h-4 mr-2 border-2 border-current border-t-transparent rounded-full animate-spin" />
                          ) : (
                            <LogIn className="h-4 w-4 mr-2" />
                          )}
                          {authLoading ? 'Signing in...' : 'Sign In'}
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={async () => {
                            try {
                              await signInWithGoogle();
                            } catch (error) {
                              console.error('Sign-in error:', error);
                            }
                          }}
                          disabled={authLoading}
                          className="flex-1 inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-xl bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-lg hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {authLoading ? (
                            <div className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          ) : (
                            <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                              <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                              <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                              <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                              <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                            </svg>
                          )}
                          {authLoading ? 'Starting...' : 'Get Started'}
                        </motion.button>
                      </div>
                    </div>
                  )}
                </motion.div>

                {/* Navigation Links */}
                <div className="flex-1 px-6 py-6">
                  <nav className="space-y-2">
                    {navigationItems.map((item, index) => {
                      const Icon = item.icon;
                      const isActive = location.pathname === item.href;
                      
                      return (
                        <motion.div
                          key={item.name}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.4 + (0.05 * index), duration: 0.3 }}
                        >
                          <NavLink
                            to={item.href}
                            className={({ isActive: active }) => {
                              const baseClasses = "relative flex items-center space-x-4 px-4 py-4 rounded-xl text-base font-medium transition-all duration-200 group min-h-[48px]";
                              const activeClasses = active
                                ? "bg-gradient-to-r from-green-500/10 to-blue-500/10 text-green-600 dark:text-green-400 border border-green-500/20"
                                : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-green-600 dark:hover:text-green-400";
                              
                              return `${baseClasses} ${activeClasses}`;
                            }}
                          >
                            {({ isActive: active }) => (
                              <>
                                <motion.div
                                  className={`p-2 rounded-lg ${
                                    active 
                                      ? "bg-green-500/20 text-green-600 dark:text-green-400" 
                                      : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 group-hover:bg-green-500/10 group-hover:text-green-600 dark:group-hover:text-green-400"
                                  } transition-colors duration-200`}
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.95 }}
                                >
                                  <Icon className="h-5 w-5" />
                                </motion.div>
                                <span className="flex-1">{item.name}</span>
                                {active && (
                                  <motion.div
                                    layoutId="mobiletab"
                                    className="absolute right-2 w-1 h-8 bg-gradient-to-b from-green-500 to-blue-500 rounded-full"
                                    initial={false}
                                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                  />
                                )}
                              </>
                            )}
                          </NavLink>
                        </motion.div>
                      );
                    })}
                  </nav>
                </div>

                {/* Bottom Actions */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.3 }}
                  className="border-t border-gray-200 dark:border-gray-700 p-6 space-y-2"
                >
                  {isAuthenticated ? (
                    <>
                      <NavLink
                        to="/profile"
                        className="flex items-center space-x-4 px-4 py-3 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 min-h-[48px]"
                      >
                        <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800">
                          <User className="h-4 w-4" />
                        </div>
                        <span>Your Profile</span>
                      </NavLink>
                      
                      <NavLink
                        to="/settings"
                        className="flex items-center space-x-4 px-4 py-3 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 min-h-[48px]"
                      >
                        <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800">
                          <Settings className="h-4 w-4" />
                        </div>
                        <span>Settings</span>
                      </NavLink>
                      
                      <NavLink
                        to="/admin"
                        className="flex items-center space-x-4 px-4 py-3 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 min-h-[48px]"
                      >
                        <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800">
                          <Shield className="h-4 w-4" />
                        </div>
                        <span>Admin Panel</span>
                      </NavLink>
                      
                      <button
                        onClick={logout}
                        className="w-full flex items-center space-x-4 px-4 py-3 rounded-xl text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-200 min-h-[48px]"
                      >
                        <div className="p-2 rounded-lg bg-red-100 dark:bg-red-900/20">
                          <LogOut className="h-4 w-4" />
                        </div>
                        <span>Sign out</span>
                      </button>
                    </>
                  ) : (
                    <div className="text-center text-sm text-gray-500 dark:text-gray-400">
                      Sign in to access all features
                    </div>
                  )}
                </motion.div>
              </Dialog.Panel>
            </div>
          </div>
        </Dialog>
      )}
    </AnimatePresence>
  );
}
