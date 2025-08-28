import { 
  BarChart3, 
  Recycle, 
  Leaf, 
  Trophy,
  Calendar,
  TrendingUp,
  Award,
  Users
} from "lucide-react";

const demoUser = {
  name: "Demo User",
  ecoPoints: 2450,
  level: 5,
  wasteRecycled: 125.5,
  co2Saved: 67.8
};

const recentActivity = [
  { id: 1, type: "recycle", message: "Recycled 5kg of plastic bottles", points: 50, time: "2 hours ago" },
  { id: 2, type: "schedule", message: "Scheduled pickup for tomorrow", points: 10, time: "1 day ago" },
  { id: 3, type: "sort", message: "Correctly sorted mixed waste", points: 25, time: "2 days ago" },
  { id: 4, type: "reward", message: "Earned 'Eco Warrior' badge", points: 100, time: "3 days ago" },
];

const monthlyStats = [
  { month: "Jan", recycled: 15, co2: 8 },
  { month: "Feb", recycled: 22, co2: 12 },
  { month: "Mar", recycled: 31, co2: 18 },
  { month: "Apr", recycled: 28, co2: 15 },
  { month: "May", recycled: 35, co2: 20 },
  { month: "Jun", recycled: 42, co2: 25 },
];

export default function DashboardSimple() {
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-3xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome back, {demoUser.name}! 🌱</h1>
            <p className="text-green-100 text-lg">You're making a real difference in the environment</p>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold">{demoUser.ecoPoints}</div>
            <div className="text-green-100">Eco Points</div>
            <div className="mt-2 bg-white/20 px-4 py-2 rounded-full text-sm">
              Level {demoUser.level}
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="bg-green-100 dark:bg-green-900 p-3 rounded-xl">
              <Recycle className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{demoUser.wasteRecycled}kg</p>
              <p className="text-gray-600 dark:text-gray-400">Waste Recycled</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-xl">
              <Leaf className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{demoUser.co2Saved}kg</p>
              <p className="text-gray-600 dark:text-gray-400">CO₂ Saved</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="bg-yellow-100 dark:bg-yellow-900 p-3 rounded-xl">
              <Trophy className="h-8 w-8 text-yellow-600 dark:text-yellow-400" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{demoUser.ecoPoints}</p>
              <p className="text-gray-600 dark:text-gray-400">Total Points</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-xl">
              <Award className="h-8 w-8 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900 dark:text-white">Level {demoUser.level}</p>
              <p className="text-gray-600 dark:text-gray-400">Eco Level</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Monthly Progress */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <BarChart3 className="h-6 w-6 mr-3 text-green-600" />
            Monthly Progress
          </h3>
          <div className="space-y-4">
            {monthlyStats.slice(-3).map((stat) => (
              <div key={stat.month} className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">{stat.month}</span>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <div className="w-20 bg-gray-200 dark:bg-gray-700 rounded-full h-2 mr-2">
                      <div 
                        className="bg-green-600 h-2 rounded-full"
                        style={{ width: `${(stat.recycled / 50) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">{stat.recycled}kg</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <TrendingUp className="h-6 w-6 mr-3 text-blue-600" />
            Recent Activity
          </h3>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3">
                <div className="bg-green-100 dark:bg-green-900 p-2 rounded-lg">
                  {activity.type === 'recycle' && <Recycle className="h-4 w-4 text-green-600 dark:text-green-400" />}
                  {activity.type === 'schedule' && <Calendar className="h-4 w-4 text-blue-600 dark:text-blue-400" />}
                  {activity.type === 'sort' && <BarChart3 className="h-4 w-4 text-purple-600 dark:text-purple-400" />}
                  {activity.type === 'reward' && <Trophy className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />}
                </div>
                <div className="flex-1">
                  <p className="text-gray-900 dark:text-white font-medium">{activity.message}</p>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-sm text-gray-600 dark:text-gray-400">{activity.time}</span>
                    <span className="text-sm font-medium text-green-600 dark:text-green-400">+{activity.points} points</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <a 
            href="/sort"
            className="bg-gradient-to-r from-green-500 to-emerald-500 text-white p-6 rounded-xl text-center hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1"
          >
            <Recycle className="h-8 w-8 mx-auto mb-2" />
            <p className="font-medium">Sort Waste</p>
          </a>
          
          <a 
            href="/schedule"
            className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white p-6 rounded-xl text-center hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1"
          >
            <Calendar className="h-8 w-8 mx-auto mb-2" />
            <p className="font-medium">Schedule Pickup</p>
          </a>
          
          <a 
            href="/recycling-hubs"
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6 rounded-xl text-center hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1"
          >
            <Users className="h-8 w-8 mx-auto mb-2" />
            <p className="font-medium">Find Centers</p>
          </a>
          
          <a 
            href="/rewards"
            className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white p-6 rounded-xl text-center hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1"
          >
            <Trophy className="h-8 w-8 mx-auto mb-2" />
            <p className="font-medium">View Rewards</p>
          </a>
        </div>
      </div>
    </div>
  );
}
