import { useState, useEffect } from 'react';
import { Leaf, Sun, Moon, Menu, Bell, ChevronDown, User, Settings, LogOut, Search } from 'lucide-react';
import { Link, useLocation } from 'react-router';

// Simple demo user state
const demoUser = {
  name: "Alex Morgan",
  email: "alex@ecowaste.com",
  initials: "AM",
  avatar: null,
  ecoPoints: 2450,
  level: 5
};

interface TopBarProps {
  onMobileMenuToggle: () => void;
}

export default function TopBarModern({ onMobileMenuToggle }: TopBarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const location = useLocation();

  // Handle scroll for glassmorphism effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Check if we're on homepage for transparent background
  const isHomepage = location.pathname === '/';

  // Navigation items
  const navigation = [
    { name: 'Home', href: '/', description: 'Smart waste solutions' },
    { name: 'Dashboard', href: '/dashboard', description: 'Your eco stats' },
    { name: 'Sort', href: '/sort', description: 'AI waste sorting' },
    { name: 'Schedule', href: '/schedule', description: 'Collection times' },
    { name: 'Hubs', href: '/recycling-hubs', description: 'Find centers' },
    { name: 'Rewards', href: '/rewards', description: 'Earn points' },
  ];

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const handleSignIn = () => {
    setIsSignedIn(true);
    setShowUserMenu(false);
    // Simple demo sign-in animation
    setTimeout(() => {
      // Show welcome notification or similar
    }, 500);
  };

  const handleSignOut = () => {
    setIsSignedIn(false);
    setShowUserMenu(false);
  };

  const notifications = [
    { id: 1, message: "Pickup scheduled for tomorrow", time: "2h ago", type: "schedule" },
    { id: 2, message: "You earned 50 eco-points!", time: "5h ago", type: "reward" },
    { id: 3, message: "New recycling hub opened nearby", time: "1d ago", type: "info" },
  ];

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        isHomepage && !isScrolled
          ? 'bg-transparent'
          : 'bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border-b border-white/10 dark:border-gray-800/10 shadow-2xl shadow-black/5'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-4 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
              <div className="relative bg-gradient-to-r from-green-500 to-emerald-600 p-3 rounded-2xl shadow-xl group-hover:shadow-2xl transition-all duration-300 group-hover:scale-105">
                <Leaf className="h-7 w-7 text-white" />
              </div>
            </div>
            <div className="hidden sm:block">
              <span className="text-2xl font-bold bg-gradient-to-r from-gray-900 via-green-700 to-emerald-600 dark:from-white dark:via-green-400 dark:to-emerald-400 bg-clip-text text-transparent">
                EcoWaste
              </span>
              <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Smart Solutions</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-2">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <div key={item.name} className="relative group">
                  <Link
                    to={item.href}
                    className={`relative px-4 py-3 rounded-2xl font-medium transition-all duration-300 flex items-center space-x-2 ${
                      isActive
                        ? 'text-green-600 dark:text-green-400 bg-green-50/50 dark:bg-green-900/20 shadow-lg'
                        : 'text-gray-700 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-400 hover:bg-white/50 dark:hover:bg-gray-800/50'
                    }`}
                  >
                    <span>{item.name}</span>
                    {isActive && (
                      <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-green-500 rounded-full shadow-lg" />
                    )}
                  </Link>
                  
                  {/* Hover tooltip */}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none">
                    <div className="bg-gray-900 dark:bg-gray-800 text-white text-xs px-3 py-2 rounded-lg shadow-xl whitespace-nowrap">
                      {item.description}
                      <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 dark:bg-gray-800 rotate-45" />
                    </div>
                  </div>
                </div>
              );
            })}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-3">
            {/* Search Button */}
            <button className="hidden md:flex p-3 rounded-2xl text-gray-700 dark:text-gray-200 hover:bg-white/50 dark:hover:bg-gray-800/50 transition-all duration-200 hover:scale-105">
              <Search className="h-5 w-5" />
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="relative p-3 rounded-2xl text-gray-700 dark:text-gray-200 hover:bg-white/50 dark:hover:bg-gray-800/50 transition-all duration-300 hover:scale-105"
              aria-label="Toggle theme"
            >
              <div className="relative">
                {isDarkMode ? (
                  <Sun className="h-5 w-5 transform transition-transform duration-300 rotate-180" />
                ) : (
                  <Moon className="h-5 w-5 transform transition-transform duration-300 rotate-0" />
                )}
              </div>
            </button>

            {/* Notifications */}
            {isSignedIn && (
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative p-3 rounded-2xl text-gray-700 dark:text-gray-200 hover:bg-white/50 dark:hover:bg-gray-800/50 transition-all duration-200 hover:scale-105"
                  aria-label="Notifications"
                >
                  <Bell className="h-5 w-5" />
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center">
                    <span className="text-xs text-white font-bold">3</span>
                  </div>
                </button>

                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 dark:border-gray-800/20 py-4 max-h-96 overflow-y-auto">
                    <div className="px-6 py-2 border-b border-gray-200/50 dark:border-gray-700/50">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Notifications</h3>
                    </div>
                    {notifications.map((notification) => (
                      <div key={notification.id} className="px-6 py-4 hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer">
                        <p className="text-gray-900 dark:text-white font-medium text-sm">{notification.message}</p>
                        <p className="text-gray-500 dark:text-gray-400 text-xs mt-1">{notification.time}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* User Menu */}
            {isSignedIn ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-3 p-2 pr-4 rounded-2xl hover:bg-white/50 dark:hover:bg-gray-800/50 transition-all duration-200 hover:scale-105"
                >
                  <div className="relative">
                    <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl flex items-center justify-center text-white text-sm font-bold shadow-lg">
                      {demoUser.initials}
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full border-2 border-white dark:border-gray-900 flex items-center justify-center">
                      <span className="text-xs text-white font-bold">{demoUser.level}</span>
                    </div>
                  </div>
                  <div className="hidden sm:block text-left">
                    <p className="text-gray-900 dark:text-white font-semibold text-sm">{demoUser.name}</p>
                    <p className="text-green-600 dark:text-green-400 text-xs font-medium">{demoUser.ecoPoints} points</p>
                  </div>
                  <ChevronDown className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-64 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 dark:border-gray-800/20 py-4">
                    <div className="px-6 py-4 border-b border-gray-200/50 dark:border-gray-700/50">
                      <p className="text-gray-900 dark:text-white font-semibold">{demoUser.name}</p>
                      <p className="text-gray-500 dark:text-gray-400 text-sm">{demoUser.email}</p>
                      <div className="flex items-center space-x-4 mt-3">
                        <div className="text-center">
                          <p className="text-lg font-bold text-green-600 dark:text-green-400">{demoUser.ecoPoints}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Eco Points</p>
                        </div>
                        <div className="text-center">
                          <p className="text-lg font-bold text-blue-600 dark:text-blue-400">Level {demoUser.level}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Current Level</p>
                        </div>
                      </div>
                    </div>
                    <div className="py-2">
                      <button className="w-full flex items-center px-6 py-3 text-gray-700 dark:text-gray-200 hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors">
                        <User className="h-5 w-5 mr-3" />
                        Profile Settings
                      </button>
                      <button className="w-full flex items-center px-6 py-3 text-gray-700 dark:text-gray-200 hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors">
                        <Settings className="h-5 w-5 mr-3" />
                        Preferences
                      </button>
                    </div>
                    <div className="border-t border-gray-200/50 dark:border-gray-700/50 pt-2">
                      <button
                        onClick={handleSignOut}
                        className="w-full flex items-center px-6 py-3 text-red-600 dark:text-red-400 hover:bg-red-50/50 dark:hover:bg-red-900/20 transition-colors"
                      >
                        <LogOut className="h-5 w-5 mr-3" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={handleSignIn}
                className="relative overflow-hidden bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-2xl font-semibold hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 hover:scale-105"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-700 transform scale-x-0 hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                <span className="relative">Sign In</span>
              </button>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={onMobileMenuToggle}
              className="lg:hidden p-3 rounded-2xl text-gray-700 dark:text-gray-200 hover:bg-white/50 dark:hover:bg-gray-800/50 transition-all duration-200 hover:scale-105"
              aria-label="Open mobile menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
