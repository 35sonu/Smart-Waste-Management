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
  Leaf
} from 'lucide-react';

interface MobileNavigationProps {
  isOpen: boolean;
  onClose: () => void;
}

const demoUser = {
  name: "Demo User",
  email: "demo@ecowaste.com",
  initials: "DU"
};

const navigation = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Dashboard', href: '/dashboard', icon: BarChart3 },
  { name: 'Sort Waste', href: '/sort', icon: Trash2 },
  { name: 'Schedule', href: '/schedule', icon: Calendar },
  { name: 'Recycling Hubs', href: '/recycling-hubs', icon: MapPin },
  { name: 'Rewards', href: '/rewards', icon: Trophy },
];

export default function MobileNavigationSimple({ isOpen, onClose }: MobileNavigationProps) {
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
    <div className="fixed inset-0 z-50 md:hidden">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Panel */}
      <div className="fixed right-0 top-0 h-full w-80 max-w-sm bg-white dark:bg-gray-900 shadow-2xl transform transition-transform duration-300">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="bg-white/20 p-2 rounded-xl">
                <Leaf className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-white">EcoWaste</span>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/20 hover:bg-white/30 transition-colors"
              aria-label="Close menu"
            >
              <X className="h-6 w-6 text-white" />
            </button>
          </div>
          
          {/* User Profile */}
          {isSignedIn ? (
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-white font-medium">
                {demoUser.initials}
              </div>
              <div>
                <p className="text-white font-medium">{demoUser.name}</p>
                <p className="text-green-100 text-sm">{demoUser.email}</p>
              </div>
            </div>
          ) : (
            <button
              onClick={handleSignIn}
              className="w-full bg-white/20 hover:bg-white/30 text-white px-4 py-3 rounded-xl font-medium transition-colors flex items-center justify-center space-x-2"
            >
              <User className="h-5 w-5" />
              <span>Sign In</span>
            </button>
          )}
        </div>

        {/* Navigation */}
        <nav className="p-6 space-y-2">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                onClick={handleNavClick}
                className={`flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400'
                    : 'text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Bottom Section */}
        {isSignedIn && (
          <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={handleSignOut}
              className="w-full flex items-center justify-center space-x-2 px-4 py-3 text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all duration-200"
            >
              <LogOut className="h-5 w-5" />
              <span>Sign Out</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
