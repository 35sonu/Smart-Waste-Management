import { useState } from 'react';
import { Link, useLocation } from 'react-router';
import { 
  X, 
  Home, 
  BarChart3, 
  Trash2, 
  Calendar, 
  MapPin, 
  Trophy,
  User,
  LogOut,
  Leaf,
  Bell,
  Settings,
  Sparkles
} from 'lucide-react';

interface MobileNavigationProps {
  isOpen: boolean;
  onClose: () => void;
}

const demoUser = {
  name: "Alex Morgan",
  email: "alex@ecowaste.com",
  initials: "AM",
  ecoPoints: 2450,
  level: 5
};

const navigation = [
  { name: 'Home', href: '/', icon: Home, description: 'Smart waste solutions' },
  { name: 'Dashboard', href: '/dashboard', icon: BarChart3, description: 'Your eco stats' },
  { name: 'AI Sort', href: '/sort', icon: Trash2, description: 'Smart waste sorting' },
  { name: 'Schedule', href: '/schedule', icon: Calendar, description: 'Collection times' },
  { name: 'Hubs', href: '/recycling-hubs', icon: MapPin, description: 'Find centers' },
  { name: 'Rewards', href: '/rewards', icon: Trophy, description: 'Earn points' },
];

export default function MobileNavigationModern({ isOpen, onClose }: MobileNavigationProps) {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const location = useLocation();

  const handleSignIn = () => {
    setIsSignedIn(true);
    onClose();
  };

  const handleSignOut = () => {
    setIsSignedIn(false);
    onClose();
  };

  const handleNavClick = () => {
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop with blur */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
      />
      
      {/* Panel with glassmorphism */}
      <div className="fixed right-0 top-0 h-full w-80 max-w-sm bg-white/20 dark:bg-gray-900/20 backdrop-blur-2xl border-l border-white/20 dark:border-gray-800/20 shadow-2xl transform transition-all duration-500 ease-out">
        {/* Header with gradient */}
        <div className="relative bg-gradient-to-r from-green-600 via-emerald-600 to-blue-600 p-6 overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
          </div>
          
          <div className="relative flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-sm shadow-lg">
                  <Leaf className="h-7 w-7 text-white" />
                </div>
                <Sparkles className="absolute -top-1 -right-1 h-4 w-4 text-yellow-300 animate-pulse" />
              </div>
              <div>
                <span className="text-2xl font-black text-white">EcoWaste</span>
                <p className="text-green-100 text-sm font-medium">Smart Solutions</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-3 rounded-2xl bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all duration-200 hover:scale-105"
              aria-label="Close menu"
            >
              <X className="h-6 w-6 text-white" />
            </button>
          </div>
          
          {/* User Profile */}
          {isSignedIn ? (
            <div className="relative bg-white/10 backdrop-blur-sm rounded-3xl p-4 border border-white/20">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div className="w-14 h-14 bg-gradient-to-br from-white/20 to-white/5 rounded-2xl flex items-center justify-center text-white font-bold text-lg backdrop-blur-sm border border-white/20">
                    {demoUser.initials}
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full border-2 border-white flex items-center justify-center">
                    <span className="text-xs text-white font-bold">{demoUser.level}</span>
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-white font-bold text-lg">{demoUser.name}</p>
                  <p className="text-green-100 text-sm">{demoUser.email}</p>
                  <div className="flex items-center space-x-4 mt-2">
                    <div className="flex items-center space-x-1">
                      <Trophy className="h-4 w-4 text-yellow-300" />
                      <span className="text-white text-sm font-semibold">{demoUser.ecoPoints}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Sparkles className="h-4 w-4 text-blue-300" />
                      <span className="text-white text-sm font-semibold">Level {demoUser.level}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <button
              onClick={handleSignIn}
              className="w-full bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-6 py-4 rounded-3xl font-bold transition-all duration-200 flex items-center justify-center space-x-3 border border-white/20 hover:scale-105"
            >
              <User className="h-5 w-5" />
              <span>Sign In to Continue</span>
            </button>
          )}
        </div>

        {/* Navigation */}
        <div className="p-6 space-y-3 flex-1 overflow-y-auto">
          {navigation.map((item, index) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                onClick={handleNavClick}
                className={`group flex items-center space-x-4 px-6 py-4 rounded-3xl font-semibold transition-all duration-300 hover:scale-105 ${
                  isActive
                    ? 'bg-green-500/20 text-green-600 dark:text-green-400 border border-green-500/30 shadow-lg'
                    : 'text-gray-700 dark:text-gray-200 hover:bg-white/30 dark:hover:bg-gray-800/30 hover:text-green-600 dark:hover:text-green-400 backdrop-blur-sm'
                }`}
                style={{
                  animationDelay: `${index * 0.1}s`
                }}
              >
                <div className={`p-3 rounded-2xl transition-all duration-300 ${
                  isActive 
                    ? 'bg-green-500/20 shadow-lg' 
                    : 'bg-gray-100/50 dark:bg-gray-800/50 group-hover:bg-green-500/10'
                }`}>
                  <item.icon className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <p className="font-bold">{item.name}</p>
                  <p className="text-sm opacity-70">{item.description}</p>
                </div>
                {isActive && (
                  <div className="w-2 h-2 bg-green-500 rounded-full shadow-lg animate-pulse" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Bottom Section */}
        {isSignedIn && (
          <div className="p-6 border-t border-gray-200/20 dark:border-gray-700/20 backdrop-blur-sm">
            <div className="space-y-3">
              {/* Quick Actions */}
              <div className="flex space-x-3">
                <button className="flex-1 bg-blue-500/20 hover:bg-blue-500/30 text-blue-600 dark:text-blue-400 p-4 rounded-2xl transition-all duration-200 hover:scale-105 flex items-center justify-center">
                  <Bell className="h-5 w-5" />
                </button>
                <button className="flex-1 bg-purple-500/20 hover:bg-purple-500/30 text-purple-600 dark:text-purple-400 p-4 rounded-2xl transition-all duration-200 hover:scale-105 flex items-center justify-center">
                  <Settings className="h-5 w-5" />
                </button>
              </div>
              
              {/* Sign Out */}
              <button
                onClick={handleSignOut}
                className="w-full flex items-center justify-center space-x-3 px-6 py-4 text-red-600 dark:text-red-400 hover:bg-red-500/10 rounded-2xl transition-all duration-200 hover:scale-105 font-semibold"
              >
                <LogOut className="h-5 w-5" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        )}

        {/* Decorative Elements */}
        <div className="absolute bottom-4 right-4 w-20 h-20 bg-gradient-to-br from-green-500/10 to-blue-500/10 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute top-1/2 left-4 w-12 h-12 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>
    </div>
  );
}
