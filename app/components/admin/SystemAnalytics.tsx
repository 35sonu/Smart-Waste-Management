import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Activity, 
  Server, 
  Database,
  Cpu,
  HardDrive,
  Wifi,
  AlertTriangle,
  CheckCircle,
  Clock,
  TrendingUp,
  TrendingDown,
  Users,
  Globe,
  Zap,
  Shield,
  RefreshCw,
  Download,
  Settings,
  BarChart3,
  PieChart,
  Monitor,
  Smartphone,
  Tablet
} from 'lucide-react';

interface SystemMetrics {
  uptime: number;
  totalRequests: number;
  activeUsers: number;
  serverLoad: number;
  memoryUsage: number;
  diskUsage: number;
  networkLatency: number;
  errorRate: number;
  throughput: number;
  responseTime: number;
}

interface AlertItem {
  id: string;
  type: 'error' | 'warning' | 'info';
  message: string;
  timestamp: string;
  component: string;
}

interface DeviceStats {
  desktop: number;
  mobile: number;
  tablet: number;
}

interface BrowserStats {
  chrome: number;
  firefox: number;
  safari: number;
  edge: number;
  other: number;
}

interface SystemAnalyticsProps {
  metrics?: SystemMetrics;
  alerts?: AlertItem[];
  deviceStats?: DeviceStats;
  browserStats?: BrowserStats;
  refreshInterval?: number;
}

const mockMetrics: SystemMetrics = {
  uptime: 99.8,
  totalRequests: 245680,
  activeUsers: 1247,
  serverLoad: 34.2,
  memoryUsage: 67.8,
  diskUsage: 45.3,
  networkLatency: 23,
  errorRate: 0.12,
  throughput: 1850,
  responseTime: 245
};

const mockAlerts: AlertItem[] = [
  {
    id: '1',
    type: 'warning',
    message: 'High memory usage detected on server node-2',
    timestamp: '5 minutes ago',
    component: 'Server Infrastructure'
  },
  {
    id: '2',
    type: 'info',
    message: 'Database backup completed successfully',
    timestamp: '1 hour ago',
    component: 'Database'
  },
  {
    id: '3',
    type: 'error',
    message: 'Failed authentication attempts from IP 192.168.1.100',
    timestamp: '2 hours ago',
    component: 'Security'
  }
];

const mockDeviceStats: DeviceStats = {
  desktop: 65.4,
  mobile: 28.7,
  tablet: 5.9
};

const mockBrowserStats: BrowserStats = {
  chrome: 58.3,
  firefox: 18.7,
  safari: 12.4,
  edge: 8.2,
  other: 2.4
};

export const SystemAnalytics: React.FC<SystemAnalyticsProps> = ({
  metrics = mockMetrics,
  alerts = mockAlerts,
  deviceStats = mockDeviceStats,
  browserStats = mockBrowserStats,
  refreshInterval = 30
}) => {
  const [selectedTab, setSelectedTab] = useState<'overview' | 'performance' | 'security' | 'logs'>('overview');
  const [autoRefresh, setAutoRefresh] = useState(true);

  const getAlertColor = (type: AlertItem['type']) => {
    const colors = {
      error: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
      warning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
      info: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
    };
    return colors[type];
  };

  const getAlertIcon = (type: AlertItem['type']) => {
    const icons = {
      error: AlertTriangle,
      warning: AlertTriangle,
      info: CheckCircle
    };
    return icons[type];
  };

  const getMetricStatus = (value: number, threshold: { good: number; warning: number }) => {
    if (value <= threshold.good) return 'good';
    if (value <= threshold.warning) return 'warning';
    return 'critical';
  };

  const getStatusColor = (status: string) => {
    const colors = {
      good: 'text-green-600 dark:text-green-400',
      warning: 'text-yellow-600 dark:text-yellow-400',
      critical: 'text-red-600 dark:text-red-400'
    };
    return colors[status as keyof typeof colors];
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
            <Activity className="h-6 w-6 text-purple-600 dark:text-purple-400" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              System Analytics
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Monitor system performance and health
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-3 mt-4 sm:mt-0">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="autoRefresh"
              checked={autoRefresh}
              onChange={(e) => setAutoRefresh(e.target.checked)}
              className="rounded border-gray-300 focus:ring-2 focus:ring-purple-500"
            />
            <label htmlFor="autoRefresh" className="text-sm text-gray-700 dark:text-gray-300">
              Auto-refresh ({refreshInterval}s)
            </label>
          </div>
          
          <button className="inline-flex items-center px-3 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors text-sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </button>
          
          <button className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors text-sm">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-1">
        <nav className="flex space-x-1">
          {[
            { id: 'overview', label: 'Overview', icon: BarChart3 },
            { id: 'performance', label: 'Performance', icon: Zap },
            { id: 'security', label: 'Security', icon: Shield },
            { id: 'logs', label: 'System Logs', icon: Database }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = selectedTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id as any)}
                className={`inline-flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-purple-600 text-white'
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
      {selectedTab === 'overview' && (
        <div className="space-y-6">
          {/* System Health Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center">
                <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                  <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-500 dark:text-gray-400">System Uptime</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {metrics.uptime}%
                  </p>
                  <p className="text-xs text-green-600 dark:text-green-400">
                    Excellent
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
                  <Users className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Active Users</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {metrics.activeUsers.toLocaleString()}
                  </p>
                  <p className="text-xs text-blue-600 dark:text-blue-400 flex items-center">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +8% from yesterday
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
                  <p className="text-sm text-gray-500 dark:text-gray-400">Total Requests</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {(metrics.totalRequests / 1000).toFixed(0)}K
                  </p>
                  <p className="text-xs text-purple-600 dark:text-purple-400 flex items-center">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +12% from last hour
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
                <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
                  <AlertTriangle className="h-8 w-8 text-red-600 dark:text-red-400" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Error Rate</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {metrics.errorRate}%
                  </p>
                  <p className="text-xs text-green-600 dark:text-green-400 flex items-center">
                    <TrendingDown className="h-3 w-3 mr-1" />
                    -2% from last hour
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* System Resources */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                System Resources
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Cpu className="h-4 w-4 text-blue-500" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">CPU Usage</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${metrics.serverLoad}%` }}
                      ></div>
                    </div>
                    <span className={`text-sm font-medium ${getStatusColor(getMetricStatus(metrics.serverLoad, { good: 50, warning: 80 }))}`}>
                      {metrics.serverLoad}%
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Server className="h-4 w-4 text-green-500" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">Memory Usage</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-green-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${metrics.memoryUsage}%` }}
                      ></div>
                    </div>
                    <span className={`text-sm font-medium ${getStatusColor(getMetricStatus(metrics.memoryUsage, { good: 70, warning: 85 }))}`}>
                      {metrics.memoryUsage}%
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <HardDrive className="h-4 w-4 text-purple-500" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">Disk Usage</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${metrics.diskUsage}%` }}
                      ></div>
                    </div>
                    <span className={`text-sm font-medium ${getStatusColor(getMetricStatus(metrics.diskUsage, { good: 60, warning: 80 }))}`}>
                      {metrics.diskUsage}%
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Wifi className="h-4 w-4 text-yellow-500" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">Network Latency</span>
                  </div>
                  <span className={`text-sm font-medium ${getStatusColor(getMetricStatus(metrics.networkLatency, { good: 50, warning: 100 }))}`}>
                    {metrics.networkLatency}ms
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Traffic Analytics
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Throughput</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {metrics.throughput} req/min
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Avg Response Time</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {metrics.responseTime}ms
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Device Distribution</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Monitor className="h-4 w-4 text-blue-500" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">Desktop</span>
                      </div>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {deviceStats.desktop}%
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Smartphone className="h-4 w-4 text-green-500" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">Mobile</span>
                      </div>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {deviceStats.mobile}%
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Tablet className="h-4 w-4 text-purple-500" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">Tablet</span>
                      </div>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {deviceStats.tablet}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* System Alerts */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Recent System Alerts
              </h3>
            </div>
            
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {alerts.map((alert) => {
                const AlertIcon = getAlertIcon(alert.type);
                return (
                  <div key={alert.id} className="p-6">
                    <div className="flex items-start space-x-3">
                      <div className={`p-1 rounded-full ${alert.type === 'error' ? 'bg-red-100 dark:bg-red-900/30' : alert.type === 'warning' ? 'bg-yellow-100 dark:bg-yellow-900/30' : 'bg-blue-100 dark:bg-blue-900/30'}`}>
                        <AlertIcon className={`h-4 w-4 ${alert.type === 'error' ? 'text-red-600 dark:text-red-400' : alert.type === 'warning' ? 'text-yellow-600 dark:text-yellow-400' : 'text-blue-600 dark:text-blue-400'}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getAlertColor(alert.type)}`}>
                            {alert.type}
                          </span>
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            {alert.component}
                          </span>
                        </div>
                        <p className="text-sm text-gray-900 dark:text-white mt-1">
                          {alert.message}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {alert.timestamp}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Placeholder for other tabs */}
      {selectedTab !== 'overview' && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-12 text-center">
          <div className="space-y-4">
            {selectedTab === 'performance' && <Zap className="h-16 w-16 text-gray-400 mx-auto" />}
            {selectedTab === 'security' && <Shield className="h-16 w-16 text-gray-400 mx-auto" />}
            {selectedTab === 'logs' && <Database className="h-16 w-16 text-gray-400 mx-auto" />}
            
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              {selectedTab.charAt(0).toUpperCase() + selectedTab.slice(1)} Monitoring
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              This section would contain detailed {selectedTab} monitoring and analysis tools.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SystemAnalytics;
