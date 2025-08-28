import { useState, useEffect } from 'react';
import { 
  MapPin,
  Navigation,
  Clock,
  Phone,
  Star,
  Users,
  Recycle,
  Leaf,
  Trash2,
  Zap,
  ChevronRight,
  Filter,
  Search,
  Award,
  TrendingUp,
  Calendar
} from 'lucide-react';
import { motion } from 'framer-motion';
import InteractiveMap from '../components/InteractiveMap';

const hubs = [
  {
    id: 1,
    name: 'EcoCenter Downtown',
    address: '123 Green Street, Downtown',
    distance: '0.8 km',
    rating: 4.8,
    reviews: 156,
    hours: 'Mon-Fri: 8AM-6PM, Sat: 9AM-4PM',
    phone: '+1 (555) 123-4567',
    services: ['Recyclables', 'Electronics', 'Batteries', 'Organic'],
    capacity: 85,
    coordinates: { lat: 40.7128, lng: -74.0060 },
    image: '🏢',
    specialties: ['Large electronics', 'Hazardous waste'],
    manager: 'Sarah Johnson',
    throughput: '2.5k items/week',
    certifications: ['ISO 14001', 'LEED Gold'],
    status: 'open' as const
  },
  {
    id: 2,
    name: 'Green Valley Hub',
    address: '456 Valley Road, Green Valley',
    distance: '1.2 km',
    rating: 4.6,
    reviews: 89,
    hours: 'Daily: 7AM-8PM',
    phone: '+1 (555) 234-5678',
    services: ['Recyclables', 'Organic', 'Textiles'],
    capacity: 92,
    coordinates: { lat: 40.7589, lng: -73.9851 },
    image: '🌳',
    specialties: ['Composting program', 'Textile recycling'],
    manager: 'Mike Chen',
    throughput: '1.8k items/week',
    certifications: ['Green Business'],
    status: 'busy' as const
  },
  {
    id: 3,
    name: 'Tech Recycle Pro',
    address: '789 Innovation Drive, Tech District',
    distance: '2.1 km',
    rating: 4.9,
    reviews: 234,
    hours: 'Mon-Sat: 9AM-7PM',
    phone: '+1 (555) 345-6789',
    services: ['Electronics', 'Batteries', 'Cables'],
    capacity: 76,
    coordinates: { lat: 40.7505, lng: -73.9934 },
    image: '💻',
    specialties: ['Data destruction', 'Refurbishment'],
    manager: 'Alex Rodriguez',
    throughput: '3.2k items/week',
    certifications: ['R2 Certified', 'e-Stewards'],
    status: 'open' as const
  },
  {
    id: 4,
    name: 'Community Waste Hub',
    address: '321 Community Lane, Riverside',
    distance: '2.8 km',
    rating: 4.4,
    reviews: 67,
    hours: 'Tue-Sun: 8AM-5PM',
    phone: '+1 (555) 456-7890',
    services: ['General Waste', 'Recyclables', 'Organic'],
    capacity: 68,
    coordinates: { lat: 40.7282, lng: -74.0776 },
    image: '🏪',
    specialties: ['Community workshops', 'Education programs'],
    manager: 'Emma Davis',
    throughput: '1.4k items/week',
    certifications: ['Community Choice'],
    status: 'open' as const
  }
];

const serviceIcons = {
  'Recyclables': Recycle,
  'Electronics': Zap,
  'Batteries': Zap,
  'Organic': Leaf,
  'General Waste': Trash2,
  'Textiles': Users,
  'Cables': Zap
};

const serviceColors = {
  'Recyclables': 'text-green-600 bg-green-100 dark:bg-green-900/30',
  'Electronics': 'text-blue-600 bg-blue-100 dark:bg-blue-900/30',
  'Batteries': 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30',
  'Organic': 'text-orange-600 bg-orange-100 dark:bg-orange-900/30',
  'General Waste': 'text-gray-600 bg-gray-100 dark:bg-gray-700',
  'Textiles': 'text-purple-600 bg-purple-100 dark:bg-purple-900/30',
  'Cables': 'text-indigo-600 bg-indigo-100 dark:bg-indigo-900/30'
};

export default function HubsBeautiful() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedService, setSelectedService] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'distance' | 'rating' | 'capacity'>('distance');
  const [selectedHub, setSelectedHub] = useState<any>(null);
  const [userLocation] = useState({ lat: 40.7420, lng: -74.0020 }); // Simulated user location
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list'); // Mobile view toggle

  const services = ['All', 'Recyclables', 'Electronics', 'Organic', 'Batteries', 'Textiles'];

  const filteredHubs = hubs
    .filter(hub => 
      hub.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedService === 'All' || hub.services.includes(selectedService))
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'capacity':
          return b.capacity - a.capacity;
        default:
          return parseFloat(a.distance) - parseFloat(b.distance);
      }
    });

  const handleGetDirections = (hub: any) => {
    // Simulate opening map directions
    console.log(`Getting directions to ${hub.name}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="mx-auto h-20 w-20 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full flex items-center justify-center mb-8 shadow-2xl"
          >
            <MapPin className="h-10 w-10 text-white" />
          </motion.div>
          <h1 className="text-5xl md:text-6xl font-black text-gray-900 dark:text-white mb-6">
            Waste <span className="bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">Hubs</span>
          </h1>
          <p className="text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Find nearby waste management hubs, check their capacity, and plan your waste disposal efficiently.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-12 space-y-6">
          <div className="flex flex-col lg:flex-row gap-6 items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search hubs by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-gray-700/20 focus:outline-none focus:ring-4 focus:ring-teal-500/20 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              />
            </div>

            <div className="flex flex-wrap gap-3">
              {services.map((service) => (
                <button
                  key={service}
                  onClick={() => setSelectedService(service)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    selectedService === service
                      ? 'bg-teal-500 text-white shadow-lg'
                      : 'bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:shadow-md'
                  }`}
                >
                  {service}
                </button>
              ))}
            </div>

            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'distance' | 'rating' | 'capacity')}
                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-xl border border-white/20 dark:border-gray-700/20 px-4 py-2 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value="distance">Sort by Distance</option>
                <option value="rating">Sort by Rating</option>
                <option value="capacity">Sort by Capacity</option>
              </select>
            </div>
          </div>
        </div>

        {/* View Toggle for Mobile */}
        <div className="lg:hidden mb-8">
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-4 shadow-lg border border-white/20 dark:border-gray-700/20">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">View</span>
              <div className="flex space-x-2">
                <button 
                  onClick={() => setViewMode('list')}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    viewMode === 'list' ? 'bg-teal-500 text-white' : 'text-gray-600 dark:text-gray-400'
                  }`}
                >
                  List
                </button>
                <button 
                  onClick={() => setViewMode('map')}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    viewMode === 'map' ? 'bg-teal-500 text-white' : 'text-gray-600 dark:text-gray-400'
                  }`}
                >
                  Map
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          
          {/* Hubs List */}
          <div className={`lg:col-span-3 space-y-6 ${viewMode === 'map' ? 'hidden lg:block' : ''}`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
                Nearby Hubs <span className="text-lg lg:text-xl font-normal text-gray-500">({filteredHubs.length})</span>
              </h2>
            </div>

            <div className="space-y-6">
              {filteredHubs.map((hub, index) => (
                <motion.div
                  key={hub.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20 dark:border-gray-700/20 hover:shadow-3xl transition-all duration-300"
                >
                  <div className="grid lg:grid-cols-3 gap-8">
                    
                    {/* Hub Info */}
                    <div className="lg:col-span-2 space-y-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="text-4xl bg-gray-100 dark:bg-gray-700 rounded-2xl p-4">
                            {hub.image}
                          </div>
                          <div>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{hub.name}</h3>
                            <div className="flex items-center space-x-2 mt-1">
                              <MapPin className="h-4 w-4 text-gray-500" />
                              <span className="text-gray-600 dark:text-gray-400">{hub.address}</span>
                            </div>
                            <div className="flex items-center space-x-4 mt-2">
                              <div className="flex items-center space-x-1">
                                <Star className="h-4 w-4 text-yellow-500 fill-current" />
                                <span className="text-sm font-semibold text-gray-900 dark:text-white">{hub.rating}</span>
                                <span className="text-sm text-gray-500">({hub.reviews} reviews)</span>
                              </div>
                              <span className="text-sm font-semibold text-teal-600">{hub.distance} away</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div className="flex items-center space-x-2">
                            <Clock className="h-5 w-5 text-gray-500" />
                            <span className="text-sm text-gray-600 dark:text-gray-400">{hub.hours}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Phone className="h-5 w-5 text-gray-500" />
                            <span className="text-sm text-gray-600 dark:text-gray-400">{hub.phone}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Users className="h-5 w-5 text-gray-500" />
                            <span className="text-sm text-gray-600 dark:text-gray-400">Managed by {hub.manager}</span>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div className="flex items-center space-x-2">
                            <TrendingUp className="h-5 w-5 text-gray-500" />
                            <span className="text-sm text-gray-600 dark:text-gray-400">{hub.throughput}</span>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-600 dark:text-gray-400">Capacity</span>
                              <span className="text-sm font-semibold text-gray-900 dark:text-white">{hub.capacity}%</span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                              <div 
                                className={`h-2 rounded-full transition-all duration-500 ${
                                  hub.capacity >= 80 ? 'bg-red-500' : 
                                  hub.capacity >= 60 ? 'bg-yellow-500' : 'bg-green-500'
                                }`}
                                style={{ width: `${hub.capacity}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Services Offered:</h4>
                        <div className="flex flex-wrap gap-2">
                          {hub.services.map((service) => {
                            const IconComponent = serviceIcons[service as keyof typeof serviceIcons];
                            return (
                              <div key={service} className={`flex items-center space-x-2 px-3 py-2 rounded-lg ${serviceColors[service as keyof typeof serviceColors]}`}>
                                {IconComponent && <IconComponent className="h-4 w-4" />}
                                <span className="text-sm font-medium">{service}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {hub.specialties.length > 0 && (
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Specialties:</h4>
                          <div className="flex flex-wrap gap-2">
                            {hub.specialties.map((specialty) => (
                              <span key={specialty} className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm">
                                {specialty}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Certifications:</h4>
                        <div className="flex flex-wrap gap-2">
                          {hub.certifications.map((cert) => (
                            <div key={cert} className="flex items-center space-x-1 px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-lg text-sm">
                              <Award className="h-3 w-3" />
                              <span>{cert}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="space-y-4">
                      <button
                        onClick={() => handleGetDirections(hub)}
                        className="w-full bg-gradient-to-r from-teal-600 to-cyan-600 text-white px-6 py-4 rounded-2xl font-semibold hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 flex items-center justify-center space-x-2"
                      >
                        <Navigation className="h-5 w-5" />
                        <span>Get Directions</span>
                      </button>

                      <button className="w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-2 border-gray-300 dark:border-gray-600 px-6 py-4 rounded-2xl font-semibold hover:shadow-lg transition-all duration-200 flex items-center justify-center space-x-2">
                        <Phone className="h-5 w-5" />
                        <span>Call Hub</span>
                      </button>

                      <button className="w-full bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white px-6 py-4 rounded-2xl font-semibold hover:shadow-lg transition-all duration-200 flex items-center justify-center space-x-2">
                        <Calendar className="h-5 w-5" />
                        <span>Schedule Visit</span>
                      </button>

                      <div className="bg-gray-50 dark:bg-gray-700/30 rounded-2xl p-4">
                        <h5 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm">Quick Stats</h5>
                        <div className="space-y-2 text-xs text-gray-600 dark:text-gray-400">
                          <div className="flex justify-between">
                            <span>Wait Time:</span>
                            <span className="font-medium text-green-600">&lt; 5 min</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Status:</span>
                            <span className="font-medium text-green-600">Open</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Next Collection:</span>
                            <span className="font-medium text-gray-900 dark:text-white">2:30 PM</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            
            {/* Interactive Map */}
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/20 dark:border-gray-700/20">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Interactive Map</h3>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Live</span>
                </div>
              </div>
              <div className="h-96 rounded-2xl overflow-hidden">
                <InteractiveMap 
                  hubs={filteredHubs}
                  selectedHub={selectedHub}
                  onHubSelect={setSelectedHub}
                  userLocation={userLocation}
                />
              </div>
              
              {/* Map Stats */}
              <div className="mt-4 grid grid-cols-3 gap-4 text-center">
                <div className="bg-gray-50 dark:bg-gray-700/30 rounded-xl p-3">
                  <div className="text-lg font-bold text-gray-900 dark:text-white">{filteredHubs.filter(h => h.status === 'open').length}</div>
                  <div className="text-xs text-green-600 dark:text-green-400">Open Now</div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700/30 rounded-xl p-3">
                  <div className="text-lg font-bold text-gray-900 dark:text-white">{filteredHubs.filter(h => h.status === 'busy').length}</div>
                  <div className="text-xs text-yellow-600 dark:text-yellow-400">Busy</div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700/30 rounded-xl p-3">
                  <div className="text-lg font-bold text-gray-900 dark:text-white">
                    {Math.round(filteredHubs.reduce((acc, hub) => acc + hub.capacity, 0) / filteredHubs.length)}%
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Avg Capacity</div>
                </div>
              </div>
            </div>

            {/* Tips */}
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20 dark:border-gray-700/20">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Pro Tips</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-teal-100 dark:bg-teal-900/30 rounded-lg">
                    <Clock className="h-4 w-4 text-teal-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">Best Times</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Visit early morning or late afternoon to avoid crowds</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                    <Recycle className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">Prepare Materials</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Sort your waste before arriving to save time</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                    <Phone className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">Call Ahead</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Confirm operating hours and special requirements</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20 dark:border-gray-700/20">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full text-left p-3 bg-gray-50 dark:bg-gray-700/30 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-900 dark:text-white">Report an Issue</span>
                  <ChevronRight className="h-4 w-4 text-gray-500" />
                </button>
                
                <button className="w-full text-left p-3 bg-gray-50 dark:bg-gray-700/30 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-900 dark:text-white">Suggest New Hub</span>
                  <ChevronRight className="h-4 w-4 text-gray-500" />
                </button>
                
                <button className="w-full text-left p-3 bg-gray-50 dark:bg-gray-700/30 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-900 dark:text-white">Hub Guidelines</span>
                  <ChevronRight className="h-4 w-4 text-gray-500" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </div>
  );
}
