import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Menu } from "@headlessui/react";
import {
  Menu as MenuIcon,
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
  Shield,
  ChevronDown,
  UserCircle,
  Search,
  Sparkles,
  Zap
} from "lucide-react";

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

interface TopBarProps {
  onMobileMenuToggle: () => void;
}

export default function TopBar({ onMobileMenuToggle }: TopBarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [theme, setTheme] = useState('light');
  const location = useLocation();
  
  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');
  const isAuthenticated = false;
  const authLoading = false;
  const getUserDisplayName = () => 'Guest';
  const getUserInitials = () => 'G';
  const getUserAvatar = () => null;

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Generate user avatar component
  const renderUserAvatar = () => {
    const avatarUrl = getUserAvatar();
    if (avatarUrl) {
      return (
        <img 
          src={avatarUrl} 
          alt={getUserDisplayName()} 
          className="h-8 w-8 rounded-full object-cover"
        />
      );
    }
    
    if (isAuthenticated) {
      const initials = getUserInitials();
      return (
        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-green-500 to-blue-500 flex items-center justify-center text-white text-sm font-semibold">
          {initials}
        </div>
      );
    }
    
    return <UserCircle className="h-8 w-8 text-gray-400" />;
  };

  const isHomePage = location.pathname === "/";

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled || !isHomePage
          ? "bg-white/20 dark:bg-gray-900/20 backdrop-blur-2xl border-b border-white/30 dark:border-gray-700/30 shadow-2xl shadow-black/10 dark:shadow-black/50"
          : "bg-gradient-to-b from-black/10 to-transparent backdrop-blur-sm"
      }`}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <motion.div 
            className="flex items-center"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <NavLink to="/" className="flex items-center group">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className={`h-10 w-10 rounded-xl bg-gradient-to-br from-green-500 to-blue-500 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-200`}
              >
                <Leaf className="h-6 w-6 text-white" />
              </motion.div>
              <div className="ml-3 hidden sm:block">
                <h1 className={`text-xl font-bold transition-colors duration-200 ${
                  isScrolled || !isHomePage 
                    ? "text-gray-900 dark:text-white" 
                    : "text-white"
                }`}>
                  EcoWaste
                </h1>
                <p className={`text-xs font-medium transition-colors duration-200 ${
                  isScrolled || !isHomePage 
                    ? "text-green-600 dark:text-green-400" 
                    : "text-green-200"
                }`}>
                  Manager
                </p>
              </div>
            </NavLink>
          </motion.div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex md:items-center md:space-x-1">
            {navigationItems.slice(0, 6).map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;
              
              return (
                <NavLink
                  key={item.name}
                  to={item.href}
                  className={({ isActive: active }) => {
                    const baseClasses = "relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 flex items-center space-x-2 group";
                    const activeClasses = active
                      ? "bg-white/20 backdrop-blur-sm text-white shadow-lg"
                      : isScrolled || !isHomePage
                        ? "text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 hover:bg-gray-100/50 dark:hover:bg-gray-800/50"
                        : "text-white/80 hover:text-white hover:bg-white/10";
                    
                    return `${baseClasses} ${activeClasses}`;
                  }}
                >
                  {({ isActive: active }) => (
                    <>
                      <Icon className={`h-4 w-4 transition-transform duration-200 ${active ? "scale-110" : "group-hover:scale-105"}`} />
                      <span>{item.name}</span>
                      {active && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute inset-0 rounded-xl bg-gradient-to-r from-green-500/20 to-blue-500/20 border border-white/20"
                          initial={false}
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        />
                      )}
                    </>
                  )}
                </NavLink>
              );
            })}
          </div>

          {/* Right side buttons */}
          <div className="flex items-center space-x-2">
            {/* Theme toggle */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              onClick={toggleTheme}
              className={`p-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 ${
                isScrolled || !isHomePage
                  ? "text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 hover:bg-gray-100/50 dark:hover:bg-gray-800/50"
                  : "text-white/80 hover:text-white hover:bg-white/10"
              }`}
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
              title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={theme}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {theme === 'light' ? (
                    <Moon className="h-5 w-5" />
                  ) : (
                    <Sun className="h-5 w-5" />
                  )}
                </motion.div>
              </AnimatePresence>
            </motion.button>

            {/* Notifications */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              className={`relative p-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 ${
                isScrolled || !isHomePage
                  ? "text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 hover:bg-gray-100/50 dark:hover:bg-gray-800/50"
                  : "text-white/80 hover:text-white hover:bg-white/10"
              }`}
              aria-label="View notifications (3 unread)"
              title="View notifications"
            >
              <Bell className="h-5 w-5" />
              {/* Notification badge */}
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center" aria-hidden="true">
                3
              </span>
            </motion.button>

            {/* Auth Section */}
            {authLoading ? (
              <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse" />
            ) : isAuthenticated ? (
              <Menu as="div" className="relative">
                <Menu.Button className={`flex items-center space-x-2 p-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 ${
                  isScrolled || !isHomePage
                    ? "text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 hover:bg-gray-100/50 dark:hover:bg-gray-800/50"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                }`} aria-label="User menu">
                  {renderUserAvatar()}
                  <span className="hidden sm:block text-sm font-medium">
                    {getUserDisplayName()}
                  </span>
                  <ChevronDown className="h-4 w-4" />
                </Menu.Button>

                <AnimatePresence>
                  <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right rounded-xl bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none border border-gray-200 dark:border-gray-700 backdrop-blur-md">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: -10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: -10 }}
                      transition={{ duration: 0.15 }}
                      className="p-2"
                    >
                      <Menu.Item>
                        {({ active }) => (
                          <NavLink
                            to="/profile"
                            className={`${
                              active ? "bg-gray-100 dark:bg-gray-700" : ""
                            } flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 dark:text-gray-300 rounded-lg transition-colors duration-200`}
                          >
                            <User className="h-4 w-4" />
                            <span>Your Profile</span>
                          </NavLink>
                        )}
                      </Menu.Item>
                      
                      <Menu.Item>
                        {({ active }) => (
                          <NavLink
                            to="/settings"
                            className={`${
                              active ? "bg-gray-100 dark:bg-gray-700" : ""
                            } flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 dark:text-gray-300 rounded-lg transition-colors duration-200`}
                          >
                            <Settings className="h-4 w-4" />
                            <span>Settings</span>
                          </NavLink>
                        )}
                      </Menu.Item>
                      
                      <Menu.Item>
                        {({ active }) => (
                          <NavLink
                            to="/admin"
                            className={`${
                              active ? "bg-gray-100 dark:bg-gray-700" : ""
                            } flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 dark:text-gray-300 rounded-lg transition-colors duration-200`}
                          >
                            <Shield className="h-4 w-4" />
                            <span>Admin Panel</span>
                          </NavLink>
                        )}
                      </Menu.Item>

                      <div className="border-t border-gray-200 dark:border-gray-700 my-2" />
                      
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={logout}
                            className={`${
                              active ? "bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400" : "text-gray-700 dark:text-gray-300"
                            } flex items-center space-x-3 px-4 py-3 text-sm rounded-lg transition-colors duration-200 w-full text-left`}
                          >
                            <LogOut className="h-4 w-4" />
                            <span>Sign out</span>
                          </button>
                        )}
                      </Menu.Item>
                    </motion.div>
                  </Menu.Items>
                </AnimatePresence>
              </Menu>
            ) : (
              <div className="flex items-center space-x-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => console.log('Sign in clicked')}
                  disabled={authLoading}
                  className={`inline-flex items-center px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed ${
                    isScrolled || !isHomePage
                      ? "text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 hover:bg-gray-100/50 dark:hover:bg-gray-800/50"
                      : "text-white/80 hover:text-white hover:bg-white/10"
                  }`}
                  aria-label="Sign in with Google"
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
                  onClick={() => console.log('Get started clicked')}
                  disabled={authLoading}
                  className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-xl bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-lg hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Get started with Google"
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
            )}

            {/* Mobile menu button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              onClick={onMobileMenuToggle}
              className={`p-2 rounded-xl md:hidden transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 ${
                isScrolled || !isHomePage
                  ? "text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 hover:bg-gray-100/50 dark:hover:bg-gray-800/50"
                  : "text-white/80 hover:text-white hover:bg-white/10"
              }`}
              aria-label="Open navigation menu"
              aria-expanded="false"
              title="Open navigation menu"
            >
              <MenuIcon className="h-6 w-6" />
            </motion.button>
          </div>
        </div>
      </nav>
    </motion.header>
  );
}
