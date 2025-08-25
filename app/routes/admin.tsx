import type { Route } from "./+types/admin";
import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Users, 
  Trash2, 
  TrendingUp, 
  MapPin, 
  Calendar, 
  AlertTriangle,
  CheckCircle,
  Clock,
  Phone,
  Mail,
  Filter,
  Download,
  Settings,
  BarChart3,
  PieChart,
  Activity,
  Globe,
  Recycle,
  Truck,
  UserCheck,
  DollarSign,
  Target,
  Zap,
  FileText,
  Database,
  Shield,
  Monitor
} from "lucide-react";

// Import admin components
import UserManagement from "../components/admin/UserManagement";
import WasteAnalytics from "../components/admin/WasteAnalytics";
import SystemAnalytics from "../components/admin/SystemAnalytics";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Admin Dashboard - EcoWaste Manager" },
    { name: "description", content: "Administrative control panel for waste management system." },
  ];
}

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  status: 'active' | 'inactive';
  joinDate: string;
  totalWaste: number;
  rewardPoints: number;
}

interface WasteCollection {
  id: string;
  userId: string;
  date: string;
  type: string;
  weight: number;
  status: 'scheduled' | 'collected' | 'processing' | 'recycled';
  collectorId: string;
  location: string;
}

interface SystemStats {
  totalUsers: number;
  activeCollections: number;
  totalWasteCollected: number;
  recyclingRate: number;
  co2Saved: number;
  revenue: number;
  efficiency: number;
  hubsOperational: number;
}

// Mock data
const mockUsers: User[] = [
  {
    id: "1",
    name: "Priya Sharma",
    email: "priya.sharma@email.com",
    phone: "+91 98765 43210",
    city: "Mumbai",
    status: "active",
    joinDate: "2024-01-15",
    totalWaste: 245.5,
    rewardPoints: 1250
  },
  {
    id: "2",
    name: "Raj Patel",
    email: "raj.patel@email.com",
    phone: "+91 87654 32109",
    city: "Delhi",
    status: "active",
    joinDate: "2024-02-20",
    totalWaste: 189.2,
    rewardPoints: 980
  },
  {
    id: "3",
    name: "Ananya Singh",
    email: "ananya.singh@email.com",
    phone: "+91 76543 21098",
    city: "Bangalore",
    status: "inactive",
    joinDate: "2024-03-10",
    totalWaste: 67.8,
    rewardPoints: 340
  }
];

const mockCollections: WasteCollection[] = [
  {
    id: "1",
    userId: "1",
    date: "2024-08-25",
    type: "Recyclables",
    weight: 12.5,
    status: "scheduled",
    collectorId: "C001",
    location: "Andheri East, Mumbai"
  },
  {
    id: "2",
    userId: "2",
    date: "2024-08-25",
    type: "Organic",
    weight: 8.3,
    status: "collected",
    collectorId: "C002",
    location: "Connaught Place, Delhi"
  }
];

const mockStats: SystemStats = {
  totalUsers: 12547,
  activeCollections: 89,
  totalWasteCollected: 2847.6,
  recyclingRate: 87.3,
  co2Saved: 2400,
  revenue: 45680,
  efficiency: 94.2,
  hubsOperational: 45
};

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'collections' | 'waste-analytics' | 'system-analytics' | 'reports' | 'settings'>('overview');
  const [selectedPeriod, setSelectedPeriod] = useState('week');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
      case 'collected':
      case 'recycled':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'scheduled':
      case 'processing':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      case 'inactive':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Admin Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage your waste management system
          </p>
        </div>
        
        <div className="flex items-center gap-3 mt-4 sm:mt-0">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-900 text-sm"
          >
            <option value="day">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="year">This Year</option>
          </select>
          
          <button className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-sm">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-1">
        <nav className="flex space-x-1 overflow-x-auto">
          {[
            { id: 'overview', label: 'Overview', icon: BarChart3 },
            { id: 'users', label: 'User Management', icon: Users },
            { id: 'collections', label: 'Collections', icon: Truck },
            { id: 'waste-analytics', label: 'Waste Analytics', icon: Recycle },
            { id: 'system-analytics', label: 'System Health', icon: Monitor },
            { id: 'reports', label: 'Reports', icon: FileText },
            { id: 'settings', label: 'Settings', icon: Settings }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
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
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <Users className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Total Users</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {mockStats.totalUsers.toLocaleString()}
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
                <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                  <Trash2 className="h-8 w-8 text-green-600 dark:text-green-400" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Waste Collected</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {mockStats.totalWasteCollected.toLocaleString()} kg
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
                  <Recycle className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Recycling Rate</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {mockStats.recyclingRate}%
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
                  <Globe className="h-8 w-8 text-yellow-600 dark:text-yellow-400" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-500 dark:text-gray-400">CO₂ Saved</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {mockStats.co2Saved.toLocaleString()} kg
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Charts and Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Chart Section */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Collection Trends
              </h3>
              <div className="h-64 bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-700 dark:to-gray-600 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <TrendingUp className="h-16 w-16 text-green-600 dark:text-green-400 mx-auto mb-4" />
                  <p className="text-gray-600 dark:text-gray-300 font-medium">Analytics Chart</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Chart integration would display here</p>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Recent Activity
              </h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900 dark:text-white">New collection scheduled</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Andheri East, Mumbai • 2 min ago</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900 dark:text-white">Collection completed</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">HSR Layout, Bangalore • 15 min ago</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900 dark:text-white">New user registered</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Priya Kumar from Chennai • 1 hour ago</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900 dark:text-white">Route optimized</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Sector 44, Gurgaon • 2 hours ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Users Tab */}
      {activeTab === 'users' && <UserManagement />}

      {/* Collections Tab */}
      {activeTab === 'collections' && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Collection Management
            </h3>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Collection ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Date & Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Type & Weight
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {mockCollections.map((collection) => (
                  <tr key={collection.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      #{collection.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {collection.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white">{collection.type}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{collection.weight} kg</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {collection.location}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(collection.status)}`}>
                        {collection.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300 mr-3">
                        Track
                      </button>
                      <button className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300">
                        Update
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Waste Analytics Tab */}
      {activeTab === 'waste-analytics' && (
        <WasteAnalytics 
          dateRange={selectedPeriod}
          onDateRangeChange={setSelectedPeriod}
        />
      )}

      {/* System Analytics Tab */}
      {activeTab === 'system-analytics' && <SystemAnalytics />}

      {/* Reports Tab */}
      {activeTab === 'reports' && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-12 text-center">
          <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Advanced Reports
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            Generate detailed reports and export data in various formats.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
            <button className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <BarChart3 className="h-8 w-8 text-blue-500 mx-auto mb-2" />
              <h4 className="font-medium text-gray-900 dark:text-white">Usage Report</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">System usage analytics</p>
            </button>
            
            <button className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <Users className="h-8 w-8 text-green-500 mx-auto mb-2" />
              <h4 className="font-medium text-gray-900 dark:text-white">User Report</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">User activity summary</p>
            </button>
            
            <button className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <Globe className="h-8 w-8 text-purple-500 mx-auto mb-2" />
              <h4 className="font-medium text-gray-900 dark:text-white">Impact Report</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">Environmental impact</p>
            </button>
          </div>
        </div>
      )}

      {/* Settings Tab */}
      {activeTab === 'settings' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                System Configuration
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Collection Rate (per kg)
                  </label>
                  <input
                    type="number"
                    defaultValue={15}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-900"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Reward Points Multiplier
                  </label>
                  <input
                    type="number"
                    defaultValue={10}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-900"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Maximum Collection Distance (km)
                  </label>
                  <input
                    type="number"
                    defaultValue={25}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-900"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Notification Settings
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700 dark:text-gray-300">Email Notifications</span>
                  <input type="checkbox" defaultChecked className="rounded" />
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700 dark:text-gray-300">SMS Alerts</span>
                  <input type="checkbox" defaultChecked className="rounded" />
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700 dark:text-gray-300">Push Notifications</span>
                  <input type="checkbox" className="rounded" />
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700 dark:text-gray-300">Weekly Reports</span>
                  <input type="checkbox" defaultChecked className="rounded" />
                </div>
              </div>
            </div>
          </div>
          
          {/* Additional Admin Tools */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Admin Tools
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button className="flex items-center justify-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <Database className="h-6 w-6 text-blue-500 mr-3" />
                <span className="text-sm font-medium text-gray-900 dark:text-white">Backup Data</span>
              </button>
              
              <button className="flex items-center justify-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <Shield className="h-6 w-6 text-green-500 mr-3" />
                <span className="text-sm font-medium text-gray-900 dark:text-white">Security Audit</span>
              </button>
              
              <button className="flex items-center justify-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <Activity className="h-6 w-6 text-purple-500 mr-3" />
                <span className="text-sm font-medium text-gray-900 dark:text-white">System Health</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
