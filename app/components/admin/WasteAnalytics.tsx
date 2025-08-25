import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Trash2, 
  TrendingUp, 
  TrendingDown,
  Calendar,
  BarChart3,
  PieChart,
  MapPin,
  Recycle,
  AlertTriangle,
  CheckCircle,
  Clock,
  Truck,
  Filter,
  Download,
  RefreshCw,
  Package,
  Globe,
  Target,
  DollarSign
} from 'lucide-react';

interface WasteData {
  id: string;
  date: string;
  type: 'organic' | 'recyclable' | 'hazardous' | 'electronic' | 'mixed';
  weight: number;
  location: string;
  status: 'collected' | 'processing' | 'recycled' | 'disposed';
  collectorId: string;
  cost: number;
  co2Impact: number;
}

interface WasteStats {
  totalWaste: number;
  recycledWaste: number;
  organicWaste: number;
  hazardousWaste: number;
  electronicWaste: number;
  recyclingRate: number;
  co2Saved: number;
  totalRevenue: number;
  averageCollectionTime: number;
  activeRoutes: number;
}

interface WasteAnalyticsProps {
  wasteData?: WasteData[];
  stats?: WasteStats;
  dateRange?: string;
  onDateRangeChange?: (range: string) => void;
}

const mockWasteData: WasteData[] = [
  {
    id: '1',
    date: '2024-08-25',
    type: 'recyclable',
    weight: 45.2,
    location: 'Andheri East, Mumbai',
    status: 'recycled',
    collectorId: 'C001',
    cost: 180,
    co2Impact: 12.5
  },
  {
    id: '2',
    date: '2024-08-25',
    type: 'organic',
    weight: 67.8,
    location: 'Connaught Place, Delhi',
    status: 'processing',
    collectorId: 'C002',
    cost: 203,
    co2Impact: 18.9
  },
  {
    id: '3',
    date: '2024-08-24',
    type: 'electronic',
    weight: 12.4,
    location: 'HSR Layout, Bangalore',
    status: 'collected',
    collectorId: 'C003',
    cost: 95,
    co2Impact: 8.7
  }
];

const mockStats: WasteStats = {
  totalWaste: 2847.6,
  recycledWaste: 2485.2,
  organicWaste: 1456.8,
  hazardousWaste: 234.6,
  electronicWaste: 156.2,
  recyclingRate: 87.3,
  co2Saved: 2400,
  totalRevenue: 45680,
  averageCollectionTime: 3.2,
  activeRoutes: 12
};

export const WasteAnalytics: React.FC<WasteAnalyticsProps> = ({
  wasteData = mockWasteData,
  stats = mockStats,
  dateRange = 'week',
  onDateRangeChange
}) => {
  const [selectedView, setSelectedView] = useState<'overview' | 'trends' | 'map' | 'reports'>('overview');
  const [selectedWasteType, setSelectedWasteType] = useState<'all' | WasteData['type']>('all');

  const getWasteTypeColor = (type: WasteData['type']) => {
    const colors = {
      organic: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
      recyclable: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
      hazardous: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
      electronic: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
      mixed: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400'
    };
    return colors[type];
  };

  const getStatusColor = (status: WasteData['status']) => {
    const colors = {
      collected: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
      processing: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
      recycled: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
      disposed: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400'
    };
    return colors[status];
  };

  const getWasteTypeIcon = (type: WasteData['type']) => {
    const icons = {
      organic: '🌱',
      recyclable: '♻️',
      hazardous: '☢️',
      electronic: '💻',
      mixed: '🗂️'
    };
    return icons[type];
  };

  const filteredWasteData = selectedWasteType === 'all' 
    ? wasteData 
    : wasteData.filter(item => item.type === selectedWasteType);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
            <BarChart3 className="h-6 w-6 text-green-600 dark:text-green-400" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Waste Analytics
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Track waste collection and environmental impact
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-3 mt-4 sm:mt-0">
          <select
            value={dateRange}
            onChange={(e) => onDateRangeChange?.(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-900 text-sm focus:ring-2 focus:ring-green-500"
          >
            <option value="day">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
          </select>
          
          <button className="inline-flex items-center px-3 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors text-sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </button>
          
          <button className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </button>
        </div>
      </div>

      {/* View Tabs */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-1">
        <nav className="flex space-x-1">
          {[
            { id: 'overview', label: 'Overview', icon: BarChart3 },
            { id: 'trends', label: 'Trends', icon: TrendingUp },
            { id: 'map', label: 'Collection Map', icon: MapPin },
            { id: 'reports', label: 'Reports', icon: PieChart }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = selectedView === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedView(tab.id as any)}
                className={`inline-flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-green-600 text-white'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <Icon className="h-4 w-4 mr-2" />
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Overview Tab */}
      {selectedView === 'overview' && (
        <div className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center">
                <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                  <Package className="h-8 w-8 text-green-600 dark:text-green-400" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Total Waste</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stats.totalWaste.toLocaleString()} kg
                  </p>
                  <p className="text-xs text-green-600 dark:text-green-400 flex items-center">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +12% from last period
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <Recycle className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Recycling Rate</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stats.recyclingRate}%
                  </p>
                  <p className="text-xs text-blue-600 dark:text-blue-400 flex items-center">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +5% from last period
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                  <Globe className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-500 dark:text-gray-400">CO₂ Saved</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stats.co2Saved.toLocaleString()} kg
                  </p>
                  <p className="text-xs text-purple-600 dark:text-purple-400 flex items-center">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +8% from last period
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center">
                <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
                  <DollarSign className="h-8 w-8 text-yellow-600 dark:text-yellow-400" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Revenue</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    ₹{stats.totalRevenue.toLocaleString()}
                  </p>
                  <p className="text-xs text-yellow-600 dark:text-yellow-400 flex items-center">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +15% from last period
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Waste Type Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Waste Type Distribution
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">🌱</span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">Organic</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: '51%' }}></div>
                    </div>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {stats.organicWaste.toLocaleString()} kg
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">♻️</span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">Recyclable</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '87%' }}></div>
                    </div>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {stats.recycledWaste.toLocaleString()} kg
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">💻</span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">Electronic</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div className="bg-purple-600 h-2 rounded-full" style={{ width: '5%' }}></div>
                    </div>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {stats.electronicWaste.toLocaleString()} kg
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">☢️</span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">Hazardous</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div className="bg-red-600 h-2 rounded-full" style={{ width: '8%' }}></div>
                    </div>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {stats.hazardousWaste.toLocaleString()} kg
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Collection Performance
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-blue-500" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">Avg Collection Time</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {stats.averageCollectionTime}h
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Truck className="h-4 w-4 text-green-500" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">Active Routes</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {stats.activeRoutes}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Target className="h-4 w-4 text-purple-500" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">Efficiency Rate</span>
                  </div>
                  <span className="text-sm font-medium text-green-600 dark:text-green-400">
                    94.2%
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">Successful Collections</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    98.7%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Recent Collections */}
      {selectedView === 'overview' && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Recent Collections
              </h3>
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-gray-400" />
                <select
                  value={selectedWasteType}
                  onChange={(e) => setSelectedWasteType(e.target.value as typeof selectedWasteType)}
                  className="px-3 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-green-500"
                >
                  <option value="all">All Types</option>
                  <option value="organic">Organic</option>
                  <option value="recyclable">Recyclable</option>
                  <option value="hazardous">Hazardous</option>
                  <option value="electronic">Electronic</option>
                  <option value="mixed">Mixed</option>
                </select>
              </div>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Type & Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Weight & Location
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Environmental Impact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Revenue
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {filteredWasteData.map((item) => (
                  <tr key={item.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className="text-lg mr-3">{getWasteTypeIcon(item.type)}</span>
                        <div>
                          <div className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getWasteTypeColor(item.type)}`}>
                            {item.type}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            {item.date}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white font-medium">
                        {item.weight} kg
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {item.location}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(item.status)}`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-green-600 dark:text-green-400">
                        <Globe className="h-4 w-4 mr-1" />
                        -{item.co2Impact} kg CO₂
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      ₹{item.cost}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Placeholder for other tabs */}
      {selectedView !== 'overview' && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-12 text-center">
          <div className="space-y-4">
            {selectedView === 'trends' && <TrendingUp className="h-16 w-16 text-gray-400 mx-auto" />}
            {selectedView === 'map' && <MapPin className="h-16 w-16 text-gray-400 mx-auto" />}
            {selectedView === 'reports' && <PieChart className="h-16 w-16 text-gray-400 mx-auto" />}
            
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              {selectedView.charAt(0).toUpperCase() + selectedView.slice(1)} View
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              This section would contain detailed {selectedView} analytics and visualizations.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default WasteAnalytics;
