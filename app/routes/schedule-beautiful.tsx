import { useState } from 'react';
import { 
  Calendar,
  Clock,
  MapPin,
  Bell,
  Truck,
  Recycle,
  Leaf,
  Trash2,
  CheckCircle,
  AlertTriangle,
  Plus,
  Settings
} from 'lucide-react';
import { motion } from 'framer-motion';

const upcomingCollections = [
  {
    id: 1,
    type: 'Recyclable',
    date: '2024-02-15',
    time: '08:00 AM',
    location: 'Green Valley Community',
    status: 'scheduled',
    icon: Recycle,
    color: 'from-green-500 to-emerald-500',
    bgColor: 'bg-green-50 dark:bg-green-900/20',
    textColor: 'text-green-600 dark:text-green-400',
    items: ['Plastic bottles', 'Paper', 'Glass', 'Metal cans']
  },
  {
    id: 2,
    type: 'Organic',
    date: '2024-02-16',
    time: '09:30 AM',
    location: 'Pine Street Area',
    status: 'scheduled',
    icon: Leaf,
    color: 'from-orange-500 to-yellow-500',
    bgColor: 'bg-orange-50 dark:bg-orange-900/20',
    textColor: 'text-orange-600 dark:text-orange-400',
    items: ['Food scraps', 'Garden waste', 'Compostable materials']
  },
  {
    id: 3,
    type: 'General Waste',
    date: '2024-02-18',
    time: '07:45 AM',
    location: 'Oak Ridge District',
    status: 'in-progress',
    icon: Trash2,
    color: 'from-gray-500 to-slate-600',
    bgColor: 'bg-gray-50 dark:bg-gray-800/50',
    textColor: 'text-gray-600 dark:text-gray-400',
    items: ['Non-recyclable items', 'Mixed waste']
  },
  {
    id: 4,
    type: 'Recyclable',
    date: '2024-02-20',
    time: '08:15 AM',
    location: 'Maple Grove',
    status: 'scheduled',
    icon: Recycle,
    color: 'from-green-500 to-emerald-500',
    bgColor: 'bg-green-50 dark:bg-green-900/20',
    textColor: 'text-green-600 dark:text-green-400',
    items: ['Electronics', 'Cardboard', 'Clean plastics']
  }
];

const recentActivity = [
  { type: 'Collection Completed', location: 'Downtown Area', time: '2 hours ago', status: 'success' },
  { type: 'Schedule Updated', location: 'West Side', time: '5 hours ago', status: 'info' },
  { type: 'Route Optimized', location: 'North District', time: '1 day ago', status: 'success' },
  { type: 'Delay Reported', location: 'South End', time: '2 days ago', status: 'warning' },
];

export default function ScheduleBeautiful() {
  const [selectedDate, setSelectedDate] = useState<string>('2024-02-15');
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  const getActivityStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      default:
        return <Clock className="h-4 w-4 text-blue-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="mx-auto h-20 w-20 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mb-8 shadow-2xl"
          >
            <Calendar className="h-10 w-10 text-white" />
          </motion.div>
          <h1 className="text-5xl md:text-6xl font-black text-gray-900 dark:text-white mb-6">
            Collection <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Schedule</span>
          </h1>
          <p className="text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Stay on top of waste collection schedules, track real-time progress, and never miss a pickup again.
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 space-y-4 md:space-y-0">
          <div className="flex space-x-4">
            <button
              onClick={() => setViewMode('list')}
              className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-200 ${
                viewMode === 'list'
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                  : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-2 border-gray-300 dark:border-gray-600'
              }`}
            >
              List View
            </button>
            <button
              onClick={() => setViewMode('calendar')}
              className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-200 ${
                viewMode === 'calendar'
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                  : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-2 border-gray-300 dark:border-gray-600'
              }`}
            >
              Calendar View
            </button>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => setNotificationsEnabled(!notificationsEnabled)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-200 ${
                notificationsEnabled
                  ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'
                  : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400'
              }`}
            >
              <Bell className={`h-4 w-4 ${notificationsEnabled ? 'animate-pulse' : ''}`} />
              <span className="text-sm font-medium">Notifications</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white hover:shadow-lg transition-all duration-200">
              <Plus className="h-4 w-4" />
              <span className="text-sm font-medium">Add Collection</span>
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Upcoming Collections */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-2 space-y-6"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Upcoming Collections</h2>
            
            {upcomingCollections.map((collection, index) => (
              <motion.div
                key={collection.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className={`${collection.bgColor} rounded-3xl p-8 border-2 border-transparent hover:shadow-2xl transition-all duration-300`}
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className={`p-4 rounded-2xl bg-gradient-to-r ${collection.color} shadow-lg`}>
                      <collection.icon className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <h3 className={`text-2xl font-bold ${collection.textColor}`}>{collection.type} Collection</h3>
                      <div className="flex items-center space-x-4 mt-2 text-gray-600 dark:text-gray-400">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span className="text-sm font-medium">{collection.date}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span className="text-sm font-medium">{collection.time}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-4 w-4" />
                          <span className="text-sm font-medium">{collection.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end space-y-2">
                    <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(collection.status)}`}>
                      {collection.status === 'in-progress' ? 'In Progress' : 
                       collection.status === 'scheduled' ? 'Scheduled' : 'Completed'}
                    </span>
                    {collection.status === 'in-progress' && (
                      <div className="flex items-center space-x-1 text-yellow-600">
                        <Truck className="h-4 w-4 animate-bounce" />
                        <span className="text-sm font-medium">En Route</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="bg-white/50 dark:bg-gray-700/30 rounded-2xl p-4 mb-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Items to Collect:</h4>
                  <div className="flex flex-wrap gap-2">
                    {collection.items.map((item, itemIndex) => (
                      <span key={itemIndex} className="px-3 py-1 bg-white dark:bg-gray-700 rounded-lg text-sm text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                    <CheckCircle className="h-4 w-4" />
                    <span>Reminder set for {collection.time}</span>
                  </div>
                  <button className="flex items-center space-x-1 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
                    <Settings className="h-4 w-4" />
                    <span>Manage</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            
            {/* Quick Stats */}
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20 dark:border-gray-700/20">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">This Week</h3>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                      <Recycle className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">Recyclable</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">2 collections</p>
                    </div>
                  </div>
                  <span className="text-lg font-bold text-green-600">2</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                      <Leaf className="h-5 w-5 text-orange-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">Organic</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">1 collection</p>
                    </div>
                  </div>
                  <span className="text-lg font-bold text-orange-600">1</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
                      <Trash2 className="h-5 w-5 text-gray-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">General</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">1 collection</p>
                    </div>
                  </div>
                  <span className="text-lg font-bold text-gray-600">1</span>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20 dark:border-gray-700/20">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Recent Activity</h3>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50/50 dark:bg-gray-700/30 rounded-xl">
                    {getActivityStatusIcon(activity.status)}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">{activity.type}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{activity.location}</p>
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{activity.time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Calendar Widget */}
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20 dark:border-gray-700/20">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Quick Calendar</h3>
              <div className="grid grid-cols-7 gap-2 text-center">
                <div className="text-xs font-semibold text-gray-600 dark:text-gray-400 py-2">Sun</div>
                <div className="text-xs font-semibold text-gray-600 dark:text-gray-400 py-2">Mon</div>
                <div className="text-xs font-semibold text-gray-600 dark:text-gray-400 py-2">Tue</div>
                <div className="text-xs font-semibold text-gray-600 dark:text-gray-400 py-2">Wed</div>
                <div className="text-xs font-semibold text-gray-600 dark:text-gray-400 py-2">Thu</div>
                <div className="text-xs font-semibold text-gray-600 dark:text-gray-400 py-2">Fri</div>
                <div className="text-xs font-semibold text-gray-600 dark:text-gray-400 py-2">Sat</div>
                
                {/* Calendar days */}
                {Array.from({ length: 35 }, (_, i) => {
                  const day = i - 3; // Starting offset
                  const isToday = day === 12;
                  const hasCollection = [15, 16, 18, 20].includes(day);
                  
                  return (
                    <div
                      key={i}
                      className={`py-2 text-sm cursor-pointer rounded-lg transition-all duration-200 ${
                        isToday
                          ? 'bg-blue-600 text-white font-bold'
                          : hasCollection
                          ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 font-semibold'
                          : day > 0 && day <= 28
                          ? 'text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                          : 'text-gray-400 dark:text-gray-600'
                      }`}
                    >
                      {day > 0 && day <= 28 ? day : ''}
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </div>
  );
}
