import type { Route } from "./+types/recycling-hubs";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { 
  MapPin, 
  Clock, 
  Phone, 
  Star, 
  Filter,
  Navigation,
  Recycle,
  Battery,
  Smartphone,
  Leaf,
  Search,
  ExternalLink,
  Route as RouteIcon
} from "lucide-react";
import { Map } from '../components/Map';

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Recycling Hubs - EcoWaste Manager" },
    { name: "description", content: "Locate nearby recycling centers and drop-off points in your area." },
  ];
}

interface RecyclingHub {
  id: string;
  name: string;
  address: string;
  distance: number;
  rating: number;
  phone: string;
  hours: string;
  acceptedMaterials: string[];
  lat: number;
  lng: number;
  type: 'center' | 'drop-off' | 'specialized';
}

const mockHubs: RecyclingHub[] = [
  {
    id: "1",
    name: "Mumbai Municipal Corporation Recycling Center",
    address: "Plot No. 45, MIDC Industrial Area, Andheri East, Mumbai - 400093",
    distance: 1.2,
    rating: 4.5,
    phone: "+91 98765 43210",
    hours: "Mon-Sat 8AM-6PM",
    acceptedMaterials: ["Plastic", "Paper", "Glass", "Metal", "Organic"],
    lat: 19.1136,
    lng: 72.8697,
    type: "center"
  },
  {
    id: "2",
    name: "Attero E-Waste Management",
    address: "E-26, Sector 8, Noida Industrial Area, Noida - 201301", 
    distance: 2.3,
    rating: 4.7,
    phone: "+91 99887 76543",
    hours: "Mon-Fri 9AM-6PM, Sat 10AM-4PM",
    acceptedMaterials: ["Electronics", "Batteries", "Mobile Phones", "Laptops"],
    lat: 28.5355,
    lng: 77.3910,
    type: "specialized"
  },
  {
    id: "3",
    name: "Saahas Zero Waste Collection Point",
    address: "HSR Layout, 27th Main Rd, Sector 2, Bengaluru - 560102",
    distance: 0.8,
    rating: 4.6,
    phone: "+91 80 4040 5555", 
    hours: "24/7 Self-Service Drop-off",
    acceptedMaterials: ["Plastic", "Glass", "Organic", "Paper"],
    lat: 12.9141,
    lng: 77.6320,
    type: "drop-off"
  },
  {
    id: "4",
    name: "Chennai Corporation Waste-to-Energy Plant",
    address: "Perungudi, IT Expressway, Chennai - 600096",
    distance: 4.2,
    rating: 4.3,
    phone: "+91 44 2498 5000",
    hours: "Mon-Sat 7AM-5PM",
    acceptedMaterials: ["Organic", "Mixed Waste", "Plastic"],
    lat: 12.9676,
    lng: 80.2448,
    type: "center"
  },
  {
    id: "5",
    name: "Kabadiwalla Connect Hub",
    address: "Sector 44, Gurugram, Haryana - 122003",
    distance: 3.1,
    rating: 4.8,
    phone: "+91 93123 45678",
    hours: "Mon-Sun 8AM-8PM",
    acceptedMaterials: ["Paper", "Plastic", "Metal", "Glass", "Electronics"],
    lat: 28.4595,
    lng: 77.0266,
    type: "center"
  },
  {
    id: "6",
    name: "Toxics Link E-Waste Collection",
    address: "H-2, Jangpura Extension, New Delhi - 110014",
    distance: 5.5,
    rating: 4.4,
    phone: "+91 11 2432 1747",
    hours: "Mon-Fri 10AM-5PM",
    acceptedMaterials: ["Electronics", "Batteries", "CFL Bulbs", "Mobile Phones"],
    lat: 28.5706,
    lng: 77.2434,
    type: "specialized"
  },
  {
    id: "7",
    name: "Raddi Connect - Paper Recycling",
    address: "Bandra Kurla Complex, Mumbai - 400051",
    distance: 2.7,
    rating: 4.2,
    phone: "+91 98200 12345",
    hours: "Mon-Sat 9AM-7PM",
    acceptedMaterials: ["Paper", "Cardboard", "Books", "Newspapers"],
    lat: 19.0596,
    lng: 72.8656,
    type: "specialized"
  },
  {
    id: "8",
    name: "Green Yatra Organic Waste Center",
    address: "Electronic City Phase 1, Bengaluru - 560100",
    distance: 1.9,
    rating: 4.5,
    phone: "+91 80 2783 4567",
    hours: "Daily 6AM-8PM",
    acceptedMaterials: ["Organic", "Kitchen Waste", "Garden Waste"],
    lat: 12.8456,
    lng: 77.6603,
    type: "specialized"
  }
];

const materialFilters = [
  { name: "All Materials", value: "all", icon: Recycle },
  { name: "Electronics", value: "Electronics", icon: Smartphone },
  { name: "Batteries", value: "Batteries", icon: Battery },
  { name: "Organic", value: "Organic", icon: Leaf },
  { name: "Plastic", value: "Plastic", icon: Recycle },
  { name: "Paper", value: "Paper", icon: Recycle },
  { name: "Glass", value: "Glass", icon: Recycle },
  { name: "Metal", value: "Metal", icon: Recycle },
];

export default function RecyclingHubs() {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedHub, setSelectedHub] = useState<RecyclingHub | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  // Load Leaflet on component mount
  useEffect(() => {
    if (typeof window !== 'undefined' && !window.L) {
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
      script.onload = () => setMapLoaded(true);
      document.head.appendChild(script);
    } else if (window.L) {
      setMapLoaded(true);
    }
  }, []);

  const handleGetDirections = (hub: RecyclingHub) => {
    const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(hub.address)}&destination_place_id=${hub.lat},${hub.lng}`;
    window.open(googleMapsUrl, '_blank');
  };

  const handleCallHub = (phone: string) => {
    window.location.href = `tel:${phone}`;
  };

  const handleHubSelectFromMap = (hubId: string) => {
    const hub = filteredHubs.find(h => h.id === hubId);
    if (hub) {
      setSelectedHub(hub);
    }
  };

  const filteredHubs = mockHubs.filter(hub => {
    const matchesFilter = selectedFilter === "all" || 
      hub.acceptedMaterials.some(material => 
        material.toLowerCase().includes(selectedFilter.toLowerCase())
      );
    
    const matchesSearch = searchQuery === "" ||
      hub.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hub.address.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  const getHubTypeColor = (type: string) => {
    switch (type) {
      case 'center': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'specialized': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400';
      case 'drop-off': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400';
    }
  };

  const getHubTypeLabel = (type: string) => {
    switch (type) {
      case 'center': return 'Recycling Center';
      case 'specialized': return 'Specialized';
      case 'drop-off': return 'Drop-off Point';
      default: return 'Unknown';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Recycling Hubs Near You
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Find the nearest recycling centers and drop-off points for your waste materials
        </p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name or address..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>
          
          {/* Material Filter */}
          <div className="flex flex-wrap gap-2">
            {materialFilters.map((filter) => {
              const Icon = filter.icon;
              const isActive = selectedFilter === filter.value;
              
              return (
                <button
                  key={filter.value}
                  onClick={() => setSelectedFilter(filter.value)}
                  className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                  }`}
                >
                  <Icon className="h-4 w-4 mr-1" />
                  {filter.name}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="lg:grid lg:grid-cols-3 lg:gap-6 space-y-6 lg:space-y-0">
        {/* Hubs List */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="font-semibold text-gray-900 dark:text-white">
                Found {filteredHubs.length} locations
              </h2>
            </div>
            
            <div className="divide-y divide-gray-200 dark:divide-gray-700 max-h-96 overflow-y-auto">
              {filteredHubs.map((hub) => (
                <motion.div
                  key={hub.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={`p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                    selectedHub?.id === hub.id ? 'bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500' : ''
                  }`}
                  onClick={() => setSelectedHub(hub)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      {hub.name}
                    </h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getHubTypeColor(hub.type)}`}>
                      {getHubTypeLabel(hub.type)}
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                    {hub.address}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center text-gray-500 dark:text-gray-400">
                      <Navigation className="h-4 w-4 mr-1" />
                      {hub.distance} mi
                    </div>
                    
                    <div className="flex items-center text-yellow-500">
                      <Star className="h-4 w-4 mr-1 fill-current" />
                      {hub.rating}
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mt-2">
                    {hub.acceptedMaterials.slice(0, 3).map((material) => (
                      <span
                        key={material}
                        className="px-2 py-1 bg-gray-100 dark:bg-gray-600 text-xs rounded text-gray-600 dark:text-gray-300"
                      >
                        {material}
                      </span>
                    ))}
                    {hub.acceptedMaterials.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 dark:bg-gray-600 text-xs rounded text-gray-600 dark:text-gray-300">
                        +{hub.acceptedMaterials.length - 3} more
                      </span>
                    )}
                  </div>
                </motion.div>
              ))}
              
              {filteredHubs.length === 0 && (
                <div className="p-8 text-center">
                  <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 dark:text-gray-400">
                    No recycling hubs found matching your criteria
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Map and Details */}
        <div className="lg:col-span-2">
          {/* Interactive Map */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            {mapLoaded ? (
              <Map 
                hubs={filteredHubs.map(hub => ({
                  id: hub.id,
                  name: hub.name,
                  lat: hub.lat,
                  lng: hub.lng,
                  type: hub.type
                }))}
                selectedHub={selectedHub ? {
                  id: selectedHub.id,
                  lat: selectedHub.lat,
                  lng: selectedHub.lng
                } : null}
                onHubSelect={handleHubSelectFromMap}
                center={{ lat: 19.0760, lng: 72.8777 }}
              />
            ) : (
              <div className="h-64 lg:h-96 bg-gradient-to-br from-green-100 to-blue-100 dark:from-gray-700 dark:to-gray-600 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-16 w-16 text-green-600 dark:text-green-400 mx-auto mb-4 animate-pulse" />
                  <p className="text-gray-600 dark:text-gray-300 font-medium">
                    Loading Interactive Map...
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Please wait while we load the map
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Selected Hub Details */}
          {selectedHub && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {selectedHub.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {selectedHub.address}
                  </p>
                </div>
                
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getHubTypeColor(selectedHub.type)}`}>
                  {getHubTypeLabel(selectedHub.type)}
                </span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="flex items-center">
                  <Navigation className="h-5 w-5 text-gray-400 mr-2" />
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    {selectedHub.distance} miles away
                  </span>
                </div>
                
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-gray-400 mr-2" />
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    {selectedHub.hours}
                  </span>
                </div>
                
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-gray-400 mr-2" />
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    {selectedHub.phone}
                  </span>
                </div>
              </div>
              
              <div className="mb-4">
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                  Accepted Materials
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedHub.acceptedMaterials.map((material) => (
                    <span
                      key={material}
                      className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 text-sm rounded-full"
                    >
                      {material}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-500 mr-1 fill-current" />
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {selectedHub.rating} rating
                  </span>
                </div>
                
                <div className="flex space-x-2">
                  <button 
                    onClick={() => handleGetDirections(selectedHub)}
                    className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-sm"
                  >
                    <RouteIcon className="h-4 w-4 mr-1" />
                    Get Directions
                  </button>
                  <button 
                    onClick={() => handleCallHub(selectedHub.phone)}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm"
                  >
                    <Phone className="h-4 w-4 mr-1" />
                    Call Now
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
