import { useState } from 'react';
import { 
  Trophy,
  Gift,
  Star,
  Zap,
  Medal,
  Crown,
  Target,
  TrendingUp,
  Coins,
  ShoppingBag,
  CheckCircle,
  Lock,
  Sparkles,
  Award
} from 'lucide-react';
import { motion } from 'framer-motion';

const rewards = [
  {
    id: 1,
    title: 'Coffee Shop Voucher',
    points: 150,
    description: '25% off at EcoBlend Coffee',
    image: '☕',
    category: 'Food & Drink',
    available: true,
    claimed: 245
  },
  {
    id: 2,
    title: 'Reusable Water Bottle',
    points: 300,
    description: 'Premium stainless steel bottle',
    image: '🍃',
    category: 'Eco Products',
    available: true,
    claimed: 128
  },
  {
    id: 3,
    title: 'Tree Planting Certificate',
    points: 500,
    description: 'Plant a tree in your name',
    image: '🌱',
    category: 'Environmental',
    available: true,
    claimed: 89
  },
  {
    id: 4,
    title: 'Electric Scooter Ride',
    points: 200,
    description: 'Free 30-minute ride',
    image: '🛴',
    category: 'Transportation',
    available: false,
    claimed: 67
  },
  {
    id: 5,
    title: 'Organic Grocery Box',
    points: 400,
    description: 'Fresh organic produce delivery',
    image: '🥬',
    category: 'Food & Drink',
    available: true,
    claimed: 156
  },
  {
    id: 6,
    title: 'Solar Power Bank',
    points: 600,
    description: 'Eco-friendly portable charger',
    image: '⚡',
    category: 'Tech',
    available: true,
    claimed: 34
  }
];

const achievements = [
  {
    id: 1,
    title: 'First Sort',
    description: 'Complete your first waste sorting',
    icon: Target,
    completed: true,
    points: 10,
    progress: 100
  },
  {
    id: 2,
    title: 'Streak Master',
    description: 'Sort waste 7 days in a row',
    icon: Zap,
    completed: true,
    points: 50,
    progress: 100
  },
  {
    id: 3,
    title: 'Recycling Hero',
    description: 'Sort 100 recyclable items',
    icon: Medal,
    completed: false,
    points: 100,
    progress: 65
  },
  {
    id: 4,
    title: 'Eco Warrior',
    description: 'Earn 1000 total points',
    icon: Crown,
    completed: false,
    points: 200,
    progress: 45
  },
  {
    id: 5,
    title: 'Community Leader',
    description: 'Help 50 neighbors with sorting',
    icon: Award,
    completed: false,
    points: 150,
    progress: 20
  }
];

const leaderboard = [
  { rank: 1, name: 'Alex Green', points: 2450, avatar: '🌟' },
  { rank: 2, name: 'Sarah Earth', points: 2380, avatar: '🌱' },
  { rank: 3, name: 'Mike Recycle', points: 2290, avatar: '♻️' },
  { rank: 4, name: 'You', points: 1850, avatar: '🚀' },
  { rank: 5, name: 'Emma Clean', points: 1720, avatar: '✨' }
];

export default function RewardsBeautiful() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [userPoints] = useState(1850);

  const categories = ['All', 'Food & Drink', 'Eco Products', 'Environmental', 'Transportation', 'Tech'];

  const filteredRewards = selectedCategory === 'All' 
    ? rewards 
    : rewards.filter(reward => reward.category === selectedCategory);

  const handleClaimReward = (rewardId: number) => {
    // Simulate claiming reward
    console.log(`Claiming reward ${rewardId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="mx-auto h-20 w-20 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mb-8 shadow-2xl"
          >
            <Trophy className="h-10 w-10 text-white" />
          </motion.div>
          <h1 className="text-5xl md:text-6xl font-black text-gray-900 dark:text-white mb-6">
            Eco <span className="bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">Rewards</span>
          </h1>
          <p className="text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Earn points by sorting waste correctly and redeem them for amazing eco-friendly rewards!
          </p>
        </div>

        {/* User Stats */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-3xl p-8 text-white shadow-2xl"
          >
            <div className="flex items-center justify-between mb-4">
              <Coins className="h-8 w-8" />
              <Sparkles className="h-6 w-6 animate-pulse" />
            </div>
            <h3 className="text-lg font-semibold opacity-90">Your Points</h3>
            <p className="text-4xl font-black">{userPoints.toLocaleString()}</p>
            <div className="flex items-center space-x-1 mt-2">
              <TrendingUp className="h-4 w-4" />
              <span className="text-sm">+125 this week</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20 dark:border-gray-700/20"
          >
            <div className="flex items-center justify-between mb-4">
              <Medal className="h-8 w-8 text-blue-600" />
              <span className="text-2xl">🏆</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Achievements</h3>
            <p className="text-4xl font-black text-gray-900 dark:text-white">2<span className="text-lg text-gray-500">/5</span></p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Unlocked this month</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20 dark:border-gray-700/20"
          >
            <div className="flex items-center justify-between mb-4">
              <Crown className="h-8 w-8 text-purple-600" />
              <span className="text-2xl">👑</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Leaderboard</h3>
            <p className="text-4xl font-black text-gray-900 dark:text-white">#4</p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">In your community</p>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          
          {/* Rewards Section */}
          <div className="lg:col-span-2">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 space-y-4 md:space-y-0">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Available Rewards</h2>
              
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                      selectedCategory === category
                        ? 'bg-yellow-500 text-white shadow-lg'
                        : 'bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:shadow-md'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {filteredRewards.map((reward, index) => (
                <motion.div
                  key={reward.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20 dark:border-gray-700/20 hover:shadow-3xl transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-6">
                    <div className="text-6xl">{reward.image}</div>
                    <div className="flex items-center space-x-2">
                      <Coins className="h-5 w-5 text-yellow-500" />
                      <span className="text-xl font-bold text-gray-900 dark:text-white">{reward.points}</span>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{reward.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">{reward.description}</p>
                  
                  <div className="flex items-center justify-between mb-6">
                    <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs font-medium">
                      {reward.category}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {reward.claimed} claimed
                    </span>
                  </div>

                  <button
                    onClick={() => handleClaimReward(reward.id)}
                    disabled={!reward.available || userPoints < reward.points}
                    className={`w-full py-3 px-6 rounded-2xl font-semibold transition-all duration-200 flex items-center justify-center space-x-2 ${
                      !reward.available
                        ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                        : userPoints < reward.points
                        ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 cursor-not-allowed'
                        : 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white hover:shadow-xl hover:-translate-y-1'
                    }`}
                  >
                    {!reward.available ? (
                      <>
                        <Lock className="h-5 w-5" />
                        <span>Out of Stock</span>
                      </>
                    ) : userPoints < reward.points ? (
                      <>
                        <Coins className="h-5 w-5" />
                        <span>Need {reward.points - userPoints} more</span>
                      </>
                    ) : (
                      <>
                        <Gift className="h-5 w-5" />
                        <span>Claim Reward</span>
                      </>
                    )}
                  </button>
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
            
            {/* Achievements */}
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20 dark:border-gray-700/20">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <Trophy className="h-6 w-6 mr-2 text-yellow-500" />
                Achievements
              </h3>
              
              <div className="space-y-4">
                {achievements.map((achievement, index) => (
                  <div
                    key={achievement.id}
                    className={`p-4 rounded-2xl border-2 transition-all duration-300 ${
                      achievement.completed
                        ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
                        : 'bg-gray-50 dark:bg-gray-700/30 border-gray-200 dark:border-gray-600'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-xl ${
                          achievement.completed 
                            ? 'bg-green-500 text-white' 
                            : 'bg-gray-300 dark:bg-gray-600 text-gray-600 dark:text-gray-300'
                        }`}>
                          <achievement.icon className="h-4 w-4" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white text-sm">{achievement.title}</h4>
                          <p className="text-xs text-gray-600 dark:text-gray-400">{achievement.description}</p>
                        </div>
                      </div>
                      
                      {achievement.completed ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : (
                        <div className="flex items-center space-x-1 text-yellow-600">
                          <Coins className="h-4 w-4" />
                          <span className="text-xs font-medium">+{achievement.points}</span>
                        </div>
                      )}
                    </div>
                    
                    {!achievement.completed && (
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-yellow-500 to-orange-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${achievement.progress}%` }}
                        ></div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Leaderboard */}
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20 dark:border-gray-700/20">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <Star className="h-6 w-6 mr-2 text-purple-500" />
                Leaderboard
              </h3>
              
              <div className="space-y-4">
                {leaderboard.map((user, index) => (
                  <div
                    key={user.rank}
                    className={`flex items-center justify-between p-4 rounded-2xl transition-all duration-300 ${
                      user.name === 'You'
                        ? 'bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-2 border-blue-200 dark:border-blue-700'
                        : 'bg-gray-50 dark:bg-gray-700/30 hover:bg-gray-100 dark:hover:bg-gray-700/50'
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                        user.rank <= 3
                          ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white'
                          : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300'
                      }`}>
                        {user.rank <= 3 ? '👑' : user.rank}
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl">{user.avatar}</span>
                        <div>
                          <p className={`font-semibold ${
                            user.name === 'You' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-900 dark:text-white'
                          }`}>
                            {user.name}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Coins className="h-4 w-4 text-yellow-500" />
                      <span className="font-bold text-gray-900 dark:text-white">{user.points.toLocaleString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </div>
  );
}
