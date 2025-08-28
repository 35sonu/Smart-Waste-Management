import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin,
  Navigation,
  Star,
  Clock,
  Phone,
  Zap,
  Recycle,
  Leaf,
  Trash2,
  Users,
  X,
  ExternalLink,
  Info
} from 'lucide-react';

interface Hub {
  id: number;
  name: string;
  address: string;
  distance: string;
  rating: number;
  reviews: number;
  hours: string;
  phone: string;
  services: string[];
  capacity: number;
  coordinates: { lat: number; lng: number };
  image: string;
  specialties: string[];
  manager: string;
  throughput: string;
  certifications: string[];
  status: 'open' | 'closed' | 'busy';
}

interface InteractiveMapProps {
  hubs: Hub[];
  selectedHub?: Hub | null;
  onHubSelect?: (hub: Hub | null) => void;
  userLocation?: { lat: number; lng: number };
}

const serviceIcons: { [key: string]: any } = {
  'Recyclables': Recycle,
  'Electronics': Zap,
  'Batteries': Zap,
  'Organic': Leaf,
  'General Waste': Trash2,
  'Textiles': Users,
  'Cables': Zap
};

const serviceColors: { [key: string]: string } = {
  'Recyclables': 'text-green-600 bg-green-100',
  'Electronics': 'text-blue-600 bg-blue-100',
  'Batteries': 'text-yellow-600 bg-yellow-100',
  'Organic': 'text-orange-600 bg-orange-100',
  'General Waste': 'text-gray-600 bg-gray-100',
  'Textiles': 'text-purple-600 bg-purple-100',
  'Cables': 'text-indigo-600 bg-indigo-100'
};

export default function InteractiveMap({ hubs, selectedHub, onHubSelect, userLocation }: InteractiveMapProps) {
  const [mapCenter, setMapCenter] = useState({ lat: 40.7128, lng: -74.0060 });
  const [zoom, setZoom] = useState(12);
  const [hoveredHub, setHoveredHub] = useState<Hub | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate map loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  // Update map center when a hub is selected
  useEffect(() => {
    if (selectedHub) {
      setMapCenter(selectedHub.coordinates);
      setZoom(15);
    }
  }, [selectedHub]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'bg-green-500';
      case 'busy':
        return 'bg-yellow-500';
      case 'closed':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getCapacityColor = (capacity: number) => {
    if (capacity >= 80) return 'text-red-600 bg-red-100';
    if (capacity >= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-green-600 bg-green-100';
  };

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-teal-100 to-cyan-100 dark:from-teal-900/20 dark:to-cyan-900/20 rounded-2xl overflow-hidden">
      
      {/* Loading State */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center z-50"
          >
            <div className="text-center">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-teal-200 dark:border-teal-700 rounded-full"></div>
                <div className="absolute inset-0 w-16 h-16 border-4 border-teal-600 border-t-transparent rounded-full animate-spin"></div>
              </div>
              <p className="mt-4 text-teal-600 dark:text-teal-400 font-semibold">Loading Map...</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Map Container */}
      <div className="relative w-full h-full">
        
        {/* Background Map Grid */}
        <div className="absolute inset-0 opacity-20">
          <svg className="w-full h-full" viewBox="0 0 400 300">
            <defs>
              <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" className="text-teal-300 dark:text-teal-700"/>
            
            {/* Simulated Streets */}
            <path d="M 0 100 L 400 100 M 0 200 L 400 200 M 100 0 L 100 300 M 200 0 L 200 300 M 300 0 L 300 300" 
                  stroke="currentColor" strokeWidth="2" className="text-teal-400 dark:text-teal-600"/>
          </svg>
        </div>

        {/* User Location */}
        {userLocation && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute z-10"
            style={{
              left: `${((userLocation.lng + 74.0060) / 0.02) * 100}%`,
              top: `${((40.7589 - userLocation.lat) / 0.02) * 100}%`,
              transform: 'translate(-50%, -50%)'
            }}
          >
            <div className="relative">
              <div className="w-4 h-4 bg-blue-600 rounded-full shadow-lg border-2 border-white"></div>
              <div className="absolute inset-0 w-4 h-4 bg-blue-600 rounded-full animate-ping opacity-75"></div>
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-2 py-1 rounded text-xs font-semibold whitespace-nowrap">
                Your Location
              </div>
            </div>
          </motion.div>
        )}

        {/* Hub Markers */}
        {hubs.map((hub, index) => {
          const x = ((hub.coordinates.lng + 74.0060) / 0.02) * 100;
          const y = ((40.7589 - hub.coordinates.lat) / 0.02) * 100;
          const isSelected = selectedHub?.id === hub.id;
          const isHovered = hoveredHub?.id === hub.id;

          return (
            <motion.div
              key={hub.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="absolute z-20 cursor-pointer"
              style={{
                left: `${x}%`,
                top: `${y}%`,
                transform: 'translate(-50%, -50%)'
              }}
              onClick={() => onHubSelect?.(hub)}
              onMouseEnter={() => setHoveredHub(hub)}
              onMouseLeave={() => setHoveredHub(null)}
            >
              {/* Hub Marker */}
              <motion.div
                animate={{ 
                  scale: isSelected ? 1.3 : isHovered ? 1.1 : 1,
                  y: isSelected ? -5 : 0
                }}
                className={`relative ${isSelected ? 'z-30' : 'z-20'}`}
              >
                <div className={`w-12 h-12 rounded-full shadow-lg border-3 border-white flex items-center justify-center text-white font-bold text-sm relative ${
                  isSelected ? 'bg-gradient-to-br from-teal-500 to-cyan-500' : 'bg-gradient-to-br from-teal-600 to-cyan-600'
                }`}>
                  <span>{hub.image}</span>
                  
                  {/* Status Indicator */}
                  <div className={`absolute -top-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${getStatusColor(hub.status)}`}></div>
                  
                  {/* Pulse Animation for Selected */}
                  {isSelected && (
                    <div className="absolute inset-0 rounded-full bg-teal-400 animate-ping opacity-75"></div>
                  )}
                </div>

                {/* Hub Info Popup */}
                <AnimatePresence>
                  {(isHovered || isSelected) && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.8, y: 10 }}
                      className="absolute -top-2 left-1/2 transform -translate-x-1/2 -translate-y-full mb-2"
                    >
                      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 p-4 min-w-64 max-w-xs">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <h3 className="font-bold text-gray-900 dark:text-white text-sm">{hub.name}</h3>
                            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{hub.address}</p>
                          </div>
                          {isSelected && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                onHubSelect?.(null);
                              }}
                              className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                            >
                              <X className="h-4 w-4 text-gray-500" />
                            </button>
                          )}
                        </div>

                        <div className="space-y-2">
                          {/* Rating */}
                          <div className="flex items-center space-x-2">
                            <div className="flex items-center space-x-1">
                              <Star className="h-3 w-3 text-yellow-500 fill-current" />
                              <span className="text-xs font-semibold text-gray-900 dark:text-white">{hub.rating}</span>
                              <span className="text-xs text-gray-500">({hub.reviews})</span>
                            </div>
                            <span className="text-xs font-semibold text-teal-600">{hub.distance}</span>
                          </div>

                          {/* Services */}
                          <div className="flex flex-wrap gap-1">
                            {hub.services.slice(0, 3).map((service) => {
                              const IconComponent = serviceIcons[service];
                              return (
                                <div key={service} className={`flex items-center space-x-1 px-2 py-1 rounded text-xs ${serviceColors[service]}`}>
                                  {IconComponent && <IconComponent className="h-3 w-3" />}
                                  <span className="font-medium">{service}</span>
                                </div>
                              );
                            })}
                            {hub.services.length > 3 && (
                              <span className="text-xs text-gray-500 px-2 py-1">
                                +{hub.services.length - 3} more
                              </span>
                            )}
                          </div>

                          {/* Capacity */}
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-600 dark:text-gray-400">Capacity</span>
                            <span className={`text-xs font-semibold px-2 py-1 rounded ${getCapacityColor(hub.capacity)}`}>
                              {hub.capacity}%
                            </span>
                          </div>

                          {/* Hours */}
                          <div className="flex items-center space-x-2 text-xs">
                            <Clock className="h-3 w-3 text-gray-500" />
                            <span className="text-gray-600 dark:text-gray-400">{hub.hours}</span>
                          </div>

                          {/* Quick Actions */}
                          <div className="flex space-x-2 mt-3">
                            <button className="flex-1 flex items-center justify-center space-x-1 bg-teal-600 text-white px-3 py-2 rounded-lg text-xs font-semibold hover:bg-teal-700 transition-colors">
                              <Navigation className="h-3 w-3" />
                              <span>Directions</span>
                            </button>
                            <button className="flex items-center justify-center p-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                              <Phone className="h-3 w-3 text-gray-600 dark:text-gray-400" />
                            </button>
                            <button className="flex items-center justify-center p-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                              <Info className="h-3 w-3 text-gray-600 dark:text-gray-400" />
                            </button>
                          </div>
                        </div>
                      </div>
                      
                      {/* Arrow */}
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2">
                        <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white dark:border-t-gray-800"></div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          );
        })}

        {/* Map Controls */}
        <div className="absolute top-4 right-4 z-30 space-y-2">
          {/* Zoom Controls */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
            <button 
              onClick={() => setZoom(Math.min(zoom + 1, 18))}
              className="block w-10 h-10 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors border-b border-gray-200 dark:border-gray-700 rounded-t-lg"
            >
              +
            </button>
            <button 
              onClick={() => setZoom(Math.max(zoom - 1, 8))}
              className="block w-10 h-10 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors rounded-b-lg"
            >
              −
            </button>
          </div>

          {/* View Controls */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-2">
            <button 
              onClick={() => {
                setMapCenter({ lat: 40.7128, lng: -74.0060 });
                setZoom(12);
                onHubSelect?.(null);
              }}
              className="flex items-center justify-center w-10 h-10 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors rounded"
              title="Reset View"
            >
              <ExternalLink className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Legend */}
        <div className="absolute bottom-4 left-4 z-30">
          <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-3">
            <h4 className="text-xs font-semibold text-gray-900 dark:text-white mb-2">Hub Status</h4>
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-xs text-gray-600 dark:text-gray-400">Open</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span className="text-xs text-gray-600 dark:text-gray-400">Busy</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-xs text-gray-600 dark:text-gray-400">Closed</span>
              </div>
            </div>
          </div>
        </div>

        {/* Map Info */}
        <div className="absolute bottom-4 right-4 z-30">
          <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 px-3 py-2">
            <div className="text-xs text-gray-600 dark:text-gray-400">
              <span className="font-semibold">{hubs.length}</span> hubs found
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
