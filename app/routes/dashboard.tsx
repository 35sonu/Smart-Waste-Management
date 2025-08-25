import type { Route } from "./+types/dashboard";
import { useState } from "react";
import { motion } from "framer-motion";
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Activity,
  Users,
  Trash2,
  Recycle,
  Leaf,
  Calendar,
  Globe,
  Award,
  Target,
  ArrowUp,
  ArrowDown
} from "lucide-react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Analytics Dashboard - EcoWaste Manager" },
    { name: "description", content: "Monitor waste generation, collection efficiency, and recycling rates with comprehensive analytics." },
  ];
}

interface KPICard {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: any;
  color: string;
}

const kpiData: KPICard[] = [
  {
    title: "Total Waste Collected",
    value: "2,847 kg",
    change: "+12.5%",
    trend: "up",
    icon: Trash2,
    color: "text-blue-600 dark:text-blue-400"
  },
  {
    title: "Recycling Rate",
    value: "73.2%",
    change: "+8.1%",
    trend: "up", 
    icon: Recycle,
    color: "text-green-600 dark:text-green-400"
  },
  {
    title: "CO₂ Saved",
    value: "1,234 kg",
    change: "+15.3%",
    trend: "up",
    icon: Leaf,
    color: "text-emerald-600 dark:text-emerald-400"
  },
  {
    title: "Active Users",
    value: "12,456",
    change: "-2.1%",
    trend: "down",
    icon: Users,
    color: "text-purple-600 dark:text-purple-400"
  }
];

export default function Dashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState<'7d' | '30d' | '90d' | '1y'>('30d');

  const chartData = {
    wasteCollection: [
      { month: 'Jan', general: 140, recyclable: 98, organic: 45 },
      { month: 'Feb', general: 152, recyclable: 108, organic: 52 },
      { month: 'Mar', general: 148, recyclable: 115, organic: 58 },
      { month: 'Apr', general: 167, recyclable: 125, organic: 64 },
      { month: 'May', general: 175, recyclable: 138, organic: 71 },
      { month: 'Jun', general: 162, recyclable: 142, organic: 68 },
    ],
    recyclingData: [
      { category: 'Plastic', percentage: 28, amount: 1256 },
      { category: 'Paper', percentage: 24, amount: 1074 },
      { category: 'Glass', percentage: 18, amount: 805 },
      { category: 'Metal', percentage: 15, amount: 671 },
      { category: 'Organic', percentage: 15, amount: 671 }
    ]
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Analytics Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Monitor waste management performance and environmental impact
          </p>
        </div>
        
        <div className="mt-4 sm:mt-0">
          <div className="flex rounded-md shadow-sm">
            {[
              { key: '7d', label: '7D' },
              { key: '30d', label: '30D' },
              { key: '90d', label: '90D' },
              { key: '1y', label: '1Y' },
            ].map((period) => (
              <button
                key={period.key}
                onClick={() => setSelectedPeriod(period.key as any)}
                className={`px-4 py-2 text-sm font-medium border ${
                  selectedPeriod === period.key
                    ? 'bg-green-600 text-white border-green-600'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                } ${
                  period.key === '7d' ? 'rounded-l-md' : 
                  period.key === '1y' ? 'rounded-r-md' : ''
                }`}
              >
                {period.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi, index) => {
          const Icon = kpi.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center justify-between mb-2">
                <Icon className={`h-8 w-8 ${kpi.color}`} />
                <div className={`flex items-center text-sm font-medium ${
                  kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {kpi.trend === 'up' ? <ArrowUp className="h-4 w-4 mr-1" /> : <ArrowDown className="h-4 w-4 mr-1" />}
                  {kpi.change}
                </div>
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                {kpi.value}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {kpi.title}
              </p>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Waste Collection Trends */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Waste Collection Trends
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Monthly collection by waste type
            </p>
          </div>
          
          <div className="p-6">
            {/* Mock Chart */}
            <div className="h-64 flex items-end justify-between space-x-2">
              {chartData.wasteCollection.map((data, index) => (
                <div key={data.month} className="flex-1 flex flex-col items-center">
                  <div className="w-full flex flex-col space-y-1 mb-2">
                    <div 
                      className="bg-gray-500 rounded-t"
                      style={{ height: `${(data.general / 200) * 100}px` }}
                    />
                    <div 
                      className="bg-green-500"
                      style={{ height: `${(data.recyclable / 200) * 100}px` }}
                    />
                    <div 
                      className="bg-yellow-500 rounded-b"
                      style={{ height: `${(data.organic / 200) * 100}px` }}
                    />
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {data.month}
                  </span>
                </div>
              ))}
            </div>
            
            {/* Legend */}
            <div className="flex justify-center space-x-6 mt-4">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-gray-500 rounded mr-2" />
                <span className="text-sm text-gray-600 dark:text-gray-400">General</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded mr-2" />
                <span className="text-sm text-gray-600 dark:text-gray-400">Recyclable</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-yellow-500 rounded mr-2" />
                <span className="text-sm text-gray-600 dark:text-gray-400">Organic</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recycling Distribution */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Recycling Distribution
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Breakdown by material type
            </p>
          </div>
          
          <div className="p-6">
            {/* Mock Donut Chart */}
            <div className="relative h-48 w-48 mx-auto mb-6">
              <div className="absolute inset-0 rounded-full border-8 border-gray-200 dark:border-gray-600">
                {/* This would be replaced with actual chart library */}
                <div className="absolute inset-4 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">73.2%</div>
                    <div className="text-sm text-white opacity-90">Recycled</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Recycling Breakdown */}
            <div className="space-y-3">
              {chartData.recyclingData.map((item, index) => (
                <div key={item.category} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div 
                      className={`w-3 h-3 rounded mr-3 ${
                        index === 0 ? 'bg-green-500' :
                        index === 1 ? 'bg-blue-500' :
                        index === 2 ? 'bg-purple-500' :
                        index === 3 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                    />
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {item.category}
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {item.percentage}%
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {item.amount} kg
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Environmental Impact */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Environmental Impact
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Positive environmental contributions this month
          </p>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <Globe className="h-12 w-12 text-green-600 dark:text-green-400 mx-auto mb-4" />
              <div className="text-2xl font-bold text-green-800 dark:text-green-400 mb-1">
                1,234 kg
              </div>
              <div className="text-sm text-green-600 dark:text-green-300">
                CO₂ Emissions Saved
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                Equivalent to 15 trees planted
              </div>
            </div>
            
            <div className="text-center p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <Activity className="h-12 w-12 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
              <div className="text-2xl font-bold text-blue-800 dark:text-blue-400 mb-1">
                89.2%
              </div>
              <div className="text-sm text-blue-600 dark:text-blue-300">
                Collection Efficiency
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                Above 85% target
              </div>
            </div>
            
            <div className="text-center p-6 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <Award className="h-12 w-12 text-purple-600 dark:text-purple-400 mx-auto mb-4" />
              <div className="text-2xl font-bold text-purple-800 dark:text-purple-400 mb-1">
                47
              </div>
              <div className="text-sm text-purple-600 dark:text-purple-300">
                Badges Earned
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                Community achievements
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Recent Activity
          </h2>
        </div>
        
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {[
            {
              action: "Scheduled pickup completed",
              location: "123 Main St",
              time: "2 hours ago",
              icon: Calendar,
              color: "text-green-600 dark:text-green-400"
            },
            {
              action: "Route optimized successfully",
              location: "Downtown area",
              time: "4 hours ago", 
              icon: Target,
              color: "text-blue-600 dark:text-blue-400"
            },
            {
              action: "New user registered",
              location: "EcoWaste platform",
              time: "6 hours ago",
              icon: Users,
              color: "text-purple-600 dark:text-purple-400"
            },
            {
              action: "Waste sorting completed",
              location: "AI Classification",
              time: "8 hours ago",
              icon: Recycle,
              color: "text-yellow-600 dark:text-yellow-400"
            }
          ].map((activity, index) => {
            const Icon = activity.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-6 flex items-center"
              >
                <Icon className={`h-8 w-8 ${activity.color} mr-4`} />
                <div className="flex-1">
                  <p className="font-medium text-gray-900 dark:text-white">
                    {activity.action}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {activity.location}
                  </p>
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {activity.time}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
