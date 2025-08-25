import type { Route } from "./+types/schedule";
import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Calendar as CalendarIcon, 
  Clock, 
  Trash2, 
  Plus, 
  MapPin, 
  Edit2, 
  X,
  Check
} from "lucide-react";
import { format, addDays, startOfWeek, isToday, isSameDay } from "date-fns";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Schedule Collection - EcoWaste Manager" },
    { name: "description", content: "Schedule waste collection at your convenience to reduce unnecessary pickups." },
  ];
}

interface ScheduledPickup {
  id: string;
  date: Date;
  time: string;
  wasteType: string;
  address: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  estimatedWeight: number;
}

// Mock data
const mockPickups: ScheduledPickup[] = [
  {
    id: "1",
    date: new Date(),
    time: "10:00 AM",
    wasteType: "Recyclables",
    address: "123 Green St, Eco City",
    status: "scheduled",
    estimatedWeight: 15
  },
  {
    id: "2",
    date: addDays(new Date(), 2),
    time: "2:00 PM",
    wasteType: "Organic",
    address: "123 Green St, Eco City",
    status: "scheduled",
    estimatedWeight: 8
  },
  {
    id: "3",
    date: addDays(new Date(), -2),
    time: "9:00 AM",
    wasteType: "General",
    address: "123 Green St, Eco City",
    status: "completed",
    estimatedWeight: 12
  }
];

const wasteTypes = ["General", "Recyclables", "Organic", "Hazardous", "Electronic"];
const timeSlots = ["9:00 AM", "10:00 AM", "11:00 AM", "2:00 PM", "3:00 PM", "4:00 PM"];

export default function Schedule() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [scheduledPickups, setScheduledPickups] = useState<ScheduledPickup[]>(mockPickups);
  const [showNewPickupModal, setShowNewPickupModal] = useState(false);
  const [newPickup, setNewPickup] = useState({
    date: new Date(),
    time: "10:00 AM",
    wasteType: "General",
    estimatedWeight: 10
  });

  const handleSchedulePickup = () => {
    const pickup: ScheduledPickup = {
      id: Date.now().toString(),
      date: newPickup.date,
      time: newPickup.time,
      wasteType: newPickup.wasteType,
      address: "123 Green St, Eco City", // Mock address
      status: "scheduled",
      estimatedWeight: newPickup.estimatedWeight
    };
    
    setScheduledPickups([...scheduledPickups, pickup]);
    setShowNewPickupModal(false);
    setNewPickup({
      date: new Date(),
      time: "10:00 AM",
      wasteType: "General",
      estimatedWeight: 10
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      case 'completed': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'cancelled': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400';
    }
  };

  const getWasteTypeColor = (type: string) => {
    switch (type) {
      case 'Recyclables': return 'bg-green-500';
      case 'Organic': return 'bg-yellow-500';
      case 'Hazardous': return 'bg-red-500';
      case 'Electronic': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  // Generate week view
  const weekStart = startOfWeek(selectedDate);
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  const upcomingPickups = scheduledPickups.filter(p => 
    p.status === 'scheduled' && p.date >= new Date()
  ).sort((a, b) => a.date.getTime() - b.date.getTime());

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Collection Schedule
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage your waste collection appointments
          </p>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowNewPickupModal(true)}
          className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors mt-4 sm:mt-0"
        >
          <Plus className="h-5 w-5 mr-2" />
          Schedule Pickup
        </motion.button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <CalendarIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500 dark:text-gray-400">This Week</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {scheduledPickups.filter(p => p.status === 'scheduled').length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <Check className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500 dark:text-gray-400">Completed</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {scheduledPickups.filter(p => p.status === 'completed').length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
              <Trash2 className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Weight</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {scheduledPickups.reduce((sum, p) => sum + p.estimatedWeight, 0)} kg
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Calendar Week View */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Week of {format(weekStart, 'MMM d, yyyy')}
          </h2>
          
          <div className="grid grid-cols-7 gap-2">
            {weekDays.map((day) => {
              const dayPickups = scheduledPickups.filter(p => 
                isSameDay(p.date, day) && p.status === 'scheduled'
              );
              
              return (
                <div
                  key={day.toISOString()}
                  className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
                    isToday(day) 
                      ? 'border-green-500 bg-green-50 dark:bg-green-900/20' 
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
                  onClick={() => setSelectedDate(day)}
                >
                  <div className="text-center">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      {format(day, 'EEE')}
                    </p>
                    <p className={`text-lg font-bold ${
                      isToday(day) ? 'text-green-600 dark:text-green-400' : 'text-gray-900 dark:text-white'
                    }`}>
                      {format(day, 'd')}
                    </p>
                  </div>
                  
                  <div className="mt-2 space-y-1">
                    {dayPickups.slice(0, 2).map((pickup) => (
                      <div
                        key={pickup.id}
                        className={`w-full h-1 rounded-full ${getWasteTypeColor(pickup.wasteType)}`}
                      />
                    ))}
                    {dayPickups.length > 2 && (
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        +{dayPickups.length - 2} more
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Upcoming Pickups */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Upcoming Pickups
          </h2>
          
          <div className="space-y-4">
            {upcomingPickups.map((pickup) => (
              <motion.div
                key={pickup.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-3 h-3 rounded-full ${getWasteTypeColor(pickup.wasteType)}`} />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {pickup.wasteType}
                    </p>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 space-x-4">
                      <span className="flex items-center">
                        <CalendarIcon className="h-4 w-4 mr-1" />
                        {format(pickup.date, 'MMM d, yyyy')}
                      </span>
                      <span className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {pickup.time}
                      </span>
                      <span className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {pickup.address}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(pickup.status)}`}>
                    {pickup.status}
                  </span>
                  <button className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                    <Edit2 className="h-4 w-4" />
                  </button>
                </div>
              </motion.div>
            ))}
            
            {upcomingPickups.length === 0 && (
              <div className="text-center py-8">
                <CalendarIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 dark:text-gray-400">
                  No upcoming pickups scheduled
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* New Pickup Modal */}
      {showNewPickupModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Schedule New Pickup
                </h3>
                <button
                  onClick={() => setShowNewPickupModal(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    value={format(newPickup.date, 'yyyy-MM-dd')}
                    onChange={(e) => setNewPickup({...newPickup, date: new Date(e.target.value)})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500 bg-white text-gray-900"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Time
                  </label>
                  <select
                    value={newPickup.time}
                    onChange={(e) => setNewPickup({...newPickup, time: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500 bg-white text-gray-900"
                  >
                    {timeSlots.map(time => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Waste Type
                  </label>
                  <select
                    value={newPickup.wasteType}
                    onChange={(e) => setNewPickup({...newPickup, wasteType: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500 bg-white text-gray-900"
                  >
                    {wasteTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Estimated Weight (kg)
                  </label>
                  <input
                    type="number"
                    value={newPickup.estimatedWeight}
                    onChange={(e) => setNewPickup({...newPickup, estimatedWeight: parseInt(e.target.value) || 0})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500 bg-white text-gray-900"
                    min="1"
                  />
                </div>
              </div>
              
              <div className="flex space-x-3 mt-6">
                <button
                  onClick={() => setShowNewPickupModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSchedulePickup}
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                >
                  Schedule
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
