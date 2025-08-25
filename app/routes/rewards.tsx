import type { Route } from "./+types/rewards";
import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Trophy, 
  Star, 
  Award, 
  Gift, 
  Target,
  Crown,
  Medal,
  Zap,
  Leaf,
  Users,
  TrendingUp
} from "lucide-react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Eco Rewards - EcoWaste Manager" },
    { name: "description", content: "Earn points and badges for proper waste disposal and recycling habits." },
  ];
}

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: any;
  color: string;
  earned: boolean;
  earnedDate?: Date;
  progress?: number;
  target?: number;
}

interface LeaderboardUser {
  id: string;
  name: string;
  points: number;
  rank: number;
  avatar: string;
}

const mockBadges: Badge[] = [
  {
    id: "1",
    name: "Eco Warrior",
    description: "Complete 50 recycling actions",
    icon: Leaf,
    color: "bg-green-500",
    earned: true,
    earnedDate: new Date('2024-01-15'),
    progress: 50,
    target: 50
  },
  {
    id: "2", 
    name: "Sorting Master",
    description: "Correctly sort 100 waste items",
    icon: Target,
    color: "bg-blue-500",
    earned: true,
    earnedDate: new Date('2024-02-03'),
    progress: 100,
    target: 100
  },
  {
    id: "3",
    name: "Route Champion",
    description: "Optimize 25 collection routes",
    icon: Zap,
    color: "bg-yellow-500", 
    earned: false,
    progress: 18,
    target: 25
  },
  {
    id: "4",
    name: "Community Leader",
    description: "Invite 10 friends to join",
    icon: Users,
    color: "bg-purple-500",
    earned: false,
    progress: 6,
    target: 10
  },
  {
    id: "5",
    name: "Streak Legend",
    description: "Maintain 30-day activity streak",
    icon: TrendingUp,
    color: "bg-red-500",
    earned: false,
    progress: 23,
    target: 30
  },
  {
    id: "6",
    name: "Green King",
    description: "Save 1000kg of CO₂",
    icon: Crown,
    color: "bg-indigo-500",
    earned: false,
    progress: 750,
    target: 1000
  }
];

const mockLeaderboard: LeaderboardUser[] = [
  { id: "1", name: "Alex Green", points: 2840, rank: 1, avatar: "🌱" },
  { id: "2", name: "Sarah Eco", points: 2690, rank: 2, avatar: "🌿" },
  { id: "3", name: "Mike Recycle", points: 2450, rank: 3, avatar: "♻️" },
  { id: "4", name: "You", points: 2180, rank: 4, avatar: "🌟" },
  { id: "5", name: "Emma Clean", points: 1950, rank: 5, avatar: "🌸" },
  { id: "6", name: "John Sort", points: 1820, rank: 6, avatar: "🌊" },
  { id: "7", name: "Lisa Earth", points: 1640, rank: 7, avatar: "🌍" },
];

export default function Rewards() {
  const [activeTab, setActiveTab] = useState<'badges' | 'leaderboard' | 'rewards'>('badges');
  const currentUser = mockLeaderboard.find(user => user.name === "You")!;
  const earnedBadges = mockBadges.filter(badge => badge.earned);
  const unearned = mockBadges.filter(badge => !badge.earned);

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown className="h-5 w-5 text-yellow-500" />;
      case 2: return <Medal className="h-5 w-5 text-gray-400" />;
      case 3: return <Award className="h-5 w-5 text-orange-500" />;
      default: return <span className="text-sm font-bold text-gray-500">#{rank}</span>;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Eco Rewards
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Earn points and unlock achievements for your environmental contributions
        </p>
      </div>

      {/* Current Stats */}
      <div className="bg-gradient-to-r from-green-500 to-blue-500 rounded-xl p-6 text-white">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold">{currentUser.points}</div>
            <div className="text-green-100">Total Points</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold">#{currentUser.rank}</div>
            <div className="text-green-100">Global Rank</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold">{earnedBadges.length}</div>
            <div className="text-green-100">Badges Earned</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold">23</div>
            <div className="text-green-100">Day Streak</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="-mb-px flex space-x-8">
          {[
            { key: 'badges', label: 'Badges', icon: Award },
            { key: 'leaderboard', label: 'Leaderboard', icon: Trophy },
            { key: 'rewards', label: 'Rewards', icon: Gift },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`flex items-center px-1 py-4 border-b-2 text-sm font-medium ${
                  activeTab === tab.key
                    ? 'border-green-500 text-green-600 dark:text-green-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                <Icon className="h-5 w-5 mr-2" />
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'badges' && (
        <div className="space-y-8">
          {/* Earned Badges */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Earned Badges ({earnedBadges.length})
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {earnedBadges.map((badge) => {
                const Icon = badge.icon;
                return (
                  <motion.div
                    key={badge.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 text-center"
                  >
                    <div className={`w-16 h-16 ${badge.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                      {badge.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                      {badge.description}
                    </p>
                    <p className="text-xs text-green-600 dark:text-green-400">
                      Earned {badge.earnedDate?.toLocaleDateString()}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Progress Badges */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              In Progress ({unearned.length})
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {unearned.map((badge) => {
                const Icon = badge.icon;
                const progressPercent = ((badge.progress || 0) / (badge.target || 1)) * 100;
                
                return (
                  <motion.div
                    key={badge.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700"
                  >
                    <div className="flex items-center mb-4">
                      <div className={`w-12 h-12 ${badge.color} opacity-30 rounded-full flex items-center justify-center mr-4`}>
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {badge.name}
                        </h3>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          {badge.progress}/{badge.target}
                        </p>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                      {badge.description}
                    </p>
                    
                    <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${badge.color} transition-all duration-500`}
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>
                    
                    <p className="text-xs text-center mt-2 text-gray-500 dark:text-gray-400">
                      {Math.round(progressPercent)}% Complete
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'leaderboard' && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              Global Leaderboard
            </h2>
            
            <div className="space-y-3">
              {mockLeaderboard.map((user, index) => (
                <motion.div
                  key={user.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex items-center p-4 rounded-lg ${
                    user.name === 'You' 
                      ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800' 
                      : 'bg-gray-50 dark:bg-gray-700'
                  }`}
                >
                  <div className="flex items-center justify-center w-12 h-12 mr-4">
                    {getRankIcon(user.rank)}
                  </div>
                  
                  <div className="text-2xl mr-4">{user.avatar}</div>
                  
                  <div className="flex-1">
                    <p className={`font-medium ${
                      user.name === 'You' ? 'text-green-800 dark:text-green-400' : 'text-gray-900 dark:text-white'
                    }`}>
                      {user.name}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {user.points} points
                    </p>
                  </div>
                  
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-500 mr-1" />
                    <span className="font-medium text-gray-900 dark:text-white">
                      {user.points}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'rewards' && (
        <div className="space-y-6">
          <div className="text-center">
            <Gift className="h-16 w-16 text-green-600 dark:text-green-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Reward Store Coming Soon!
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              We're working on an amazing reward store where you can redeem your eco-points 
              for sustainable products, discounts, and exclusive environmental experiences.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 opacity-50">
            {[
              { name: "Plant a Tree", points: 500, description: "We'll plant a tree in your name" },
              { name: "Eco Tote Bag", points: 750, description: "Premium recycled material tote bag" },
              { name: "Solar Charger", points: 1200, description: "Portable solar phone charger" },
              { name: "Donation Match", points: 300, description: "$10 donation to environmental charity" },
              { name: "Green Certification", points: 2000, description: "Official eco-warrior certificate" },
              { name: "Workshop Access", points: 1500, description: "Free sustainability workshop" },
            ].map((reward, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700"
              >
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  {reward.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  {reward.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-green-600 dark:text-green-400 font-medium">
                    {reward.points} points
                  </span>
                  <button 
                    disabled
                    className="px-4 py-2 bg-gray-300 text-gray-500 rounded-md cursor-not-allowed"
                  >
                    Coming Soon
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
