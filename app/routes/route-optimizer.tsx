import type { Route } from "./+types/route-optimizer";
import { useState } from "react";
import { motion } from "framer-motion";
import { 
  MapPin, 
  Route as RouteIcon, 
  Plus, 
  Navigation, 
  Clock, 
  Fuel,
  Leaf,
  Trash2
} from "lucide-react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Route Optimizer - EcoWaste Manager" },
    { name: "description", content: "Optimize waste collection routes to reduce fuel consumption and emissions." },
  ];
}

interface PickupPoint {
  id: string;
  address: string;
  wasteType: string;
  estimatedWeight: number;
  priority: 'high' | 'medium' | 'low';
}

const mockPickupPoints: PickupPoint[] = [
  {
    id: "1",
    address: "123 Main St, Eco City",
    wasteType: "General",
    estimatedWeight: 15,
    priority: "high"
  },
  {
    id: "2", 
    address: "456 Oak Ave, Eco City",
    wasteType: "Recyclables",
    estimatedWeight: 8,
    priority: "medium"
  },
  {
    id: "3",
    address: "789 Pine Rd, Eco City", 
    wasteType: "Organic",
    estimatedWeight: 12,
    priority: "low"
  }
];

export default function RouteOptimizer() {
  const [pickupPoints] = useState<PickupPoint[]>(mockPickupPoints);
  const [optimizedRoute, setOptimizedRoute] = useState<PickupPoint[] | null>(null);
  const [isOptimizing, setIsOptimizing] = useState(false);

  const optimizeRoute = async () => {
    setIsOptimizing(true);
    // Simulate optimization
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Simple optimization: sort by priority then weight
    const sorted = [...pickupPoints].sort((a, b) => {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority] || b.estimatedWeight - a.estimatedWeight;
    });
    
    setOptimizedRoute(sorted);
    setIsOptimizing(false);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Route Optimizer
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Optimize waste collection routes to reduce fuel consumption and emissions
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <MapPin className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500 dark:text-gray-400">Pickup Points</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{pickupPoints.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <Navigation className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500 dark:text-gray-400">Est. Distance</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">24.5 km</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
              <Clock className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500 dark:text-gray-400">Est. Time</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">2h 15m</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
              <Fuel className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500 dark:text-gray-400">Fuel Saved</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">18%</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Pickup Points */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Pickup Points
              </h2>
              <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
                <Plus className="h-4 w-4 mr-2 inline" />
                Add Point
              </button>
            </div>
          </div>
          
          <div className="p-6 space-y-4">
            {pickupPoints.map((point, index) => (
              <motion.div
                key={point.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {point.address}
                    </p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                      <span>{point.wasteType}</span>
                      <span>{point.estimatedWeight} kg</span>
                    </div>
                  </div>
                </div>
                
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(point.priority)}`}>
                  {point.priority}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Route Visualization */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Optimized Route
              </h2>
              <button
                onClick={optimizeRoute}
                disabled={isOptimizing}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                {isOptimizing ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    Optimizing...
                  </div>
                ) : (
                  <>
                    <RouteIcon className="h-4 w-4 mr-2 inline" />
                    Optimize Route
                  </>
                )}
              </button>
            </div>
          </div>
          
          <div className="p-6">
            {!optimizedRoute && (
              <div className="text-center py-8">
                <RouteIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 dark:text-gray-400">
                  Click "Optimize Route" to generate the most efficient path
                </p>
              </div>
            )}
            
            {optimizedRoute && (
              <div className="space-y-4">
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                  <div className="flex items-center">
                    <Leaf className="h-5 w-5 text-green-600 dark:text-green-400 mr-2" />
                    <div>
                      <p className="font-medium text-green-800 dark:text-green-400">
                        Route Optimized Successfully!
                      </p>
                      <p className="text-sm text-green-600 dark:text-green-300">
                        Estimated 18% fuel reduction and 25 minutes time saved
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  {optimizedRoute.map((point, index) => (
                    <motion.div
                      key={point.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                    >
                      <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-medium">
                        {index + 1}
                      </div>
                      <div className="ml-3 flex-1">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {point.address}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {point.wasteType} • {point.estimatedWeight} kg
                        </p>
                      </div>
                      <Navigation className="h-4 w-4 text-gray-400" />
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
