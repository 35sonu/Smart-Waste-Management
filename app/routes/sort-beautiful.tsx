import { useState } from 'react';
import { 
  Camera, 
  Upload, 
  Trash2, 
  Recycle, 
  Leaf, 
  CheckCircle,
  AlertCircle,
  Sparkles,
  Trophy,
  Star
} from 'lucide-react';
import { motion } from 'framer-motion';

const wasteTypes = [
  {
    name: 'Recyclable',
    icon: Recycle,
    color: 'from-green-500 to-emerald-500',
    bgColor: 'bg-green-50 dark:bg-green-900/20',
    textColor: 'text-green-600 dark:text-green-400',
    items: ['Plastic bottles', 'Glass containers', 'Paper', 'Cardboard', 'Metal cans']
  },
  {
    name: 'Organic',
    icon: Leaf,
    color: 'from-orange-500 to-yellow-500',
    bgColor: 'bg-orange-50 dark:bg-orange-900/20',
    textColor: 'text-orange-600 dark:text-orange-400',
    items: ['Food scraps', 'Garden waste', 'Paper towels', 'Compostable bags']
  },
  {
    name: 'General Waste',
    icon: Trash2,
    color: 'from-gray-500 to-slate-600',
    bgColor: 'bg-gray-50 dark:bg-gray-800/50',
    textColor: 'text-gray-600 dark:text-gray-400',
    items: ['Non-recyclable plastic', 'Broken ceramics', 'Mixed materials']
  }
];

const recentSorts = [
  { item: 'Plastic Water Bottle', category: 'Recyclable', confidence: 98, points: 10 },
  { item: 'Apple Core', category: 'Organic', confidence: 95, points: 5 },
  { item: 'Pizza Box', category: 'Recyclable', confidence: 87, points: 8 },
  { item: 'Banana Peel', category: 'Organic', confidence: 99, points: 5 },
];

export default function SortBeautiful() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [sortResult, setSortResult] = useState<any>(null);

  const handleImageUpload = () => {
    setIsScanning(true);
    // Simulate AI processing
    setTimeout(() => {
      setSortResult({
        item: 'Plastic Water Bottle',
        category: 'Recyclable',
        confidence: 96,
        points: 10,
        tips: ['Remove the cap and label', 'Rinse clean', 'Place in recycling bin']
      });
      setIsScanning(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="mx-auto h-20 w-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mb-8 shadow-2xl"
          >
            <Sparkles className="h-10 w-10 text-white" />
          </motion.div>
          <h1 className="text-5xl md:text-6xl font-black text-gray-900 dark:text-white mb-6">
            AI Waste <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Sorting</span>
          </h1>
          <p className="text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Let our advanced AI identify your waste and guide you to the perfect disposal method. 
            Earn eco-points and help save the planet!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          
          {/* AI Scanner */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20 dark:border-gray-700/20"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 flex items-center">
              <Camera className="h-8 w-8 mr-3 text-blue-600" />
              Smart Scanner
            </h2>

            {/* Upload Area */}
            <div className="relative mb-8">
              <div className={`border-2 border-dashed rounded-3xl p-12 text-center transition-all duration-300 ${
                isScanning 
                  ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-900/20' 
                  : 'border-gray-300 dark:border-gray-600 hover:border-blue-400 hover:bg-blue-50/30 dark:hover:bg-blue-900/10'
              }`}>
                {isScanning ? (
                  <div className="space-y-6">
                    <div className="mx-auto w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    <div>
                      <p className="text-xl font-semibold text-blue-600 dark:text-blue-400">AI Analyzing...</p>
                      <p className="text-gray-600 dark:text-gray-400 mt-2">Processing waste classification</p>
                    </div>
                  </div>
                ) : sortResult ? (
                  <div className="space-y-6">
                    <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{sortResult.item}</h3>
                      <p className={`text-lg font-semibold mt-2 ${
                        sortResult.category === 'Recyclable' ? 'text-green-600' : 
                        sortResult.category === 'Organic' ? 'text-orange-600' : 'text-gray-600'
                      }`}>
                        {sortResult.category} ({sortResult.confidence}% confidence)
                      </p>
                      <div className="flex items-center justify-center space-x-2 mt-4 bg-yellow-100 dark:bg-yellow-900/20 px-4 py-2 rounded-2xl">
                        <Trophy className="h-5 w-5 text-yellow-600" />
                        <span className="text-yellow-800 dark:text-yellow-200 font-semibold">+{sortResult.points} Eco Points</span>
                      </div>
                      <div className="mt-6 text-left">
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Disposal Tips:</h4>
                        <ul className="space-y-2">
                          {sortResult.tips.map((tip: string, index: number) => (
                            <li key={index} className="flex items-start space-x-2">
                              <CheckCircle className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                              <span className="text-gray-600 dark:text-gray-300 text-sm">{tip}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <Upload className="mx-auto h-16 w-16 text-gray-400" />
                    <div>
                      <p className="text-xl font-semibold text-gray-900 dark:text-white">Upload or Capture Waste Image</p>
                      <p className="text-gray-600 dark:text-gray-400 mt-2">Our AI will identify it in seconds</p>
                    </div>
                  </div>
                )}
              </div>
              
              {!isScanning && !sortResult && (
                <div className="flex gap-4 mt-6">
                  <button
                    onClick={handleImageUpload}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-4 rounded-2xl font-semibold hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 flex items-center justify-center space-x-2"
                  >
                    <Camera className="h-5 w-5" />
                    <span>Take Photo</span>
                  </button>
                  <button
                    onClick={handleImageUpload}
                    className="flex-1 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-2 border-gray-300 dark:border-gray-600 px-6 py-4 rounded-2xl font-semibold hover:shadow-lg transition-all duration-200 flex items-center justify-center space-x-2"
                  >
                    <Upload className="h-5 w-5" />
                    <span>Upload</span>
                  </button>
                </div>
              )}

              {sortResult && (
                <button
                  onClick={() => setSortResult(null)}
                  className="w-full mt-6 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-4 rounded-2xl font-semibold hover:shadow-xl transition-all duration-200"
                >
                  Sort Another Item
                </button>
              )}
            </div>
          </motion.div>

          {/* Waste Categories */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Waste Categories</h2>
            
            {wasteTypes.map((type, index) => (
              <motion.div
                key={type.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                className={`${type.bgColor} rounded-3xl p-6 border-2 border-transparent hover:border-opacity-50 transition-all duration-300 cursor-pointer ${
                  selectedCategory === type.name ? 'ring-4 ring-opacity-30' : ''
                }`}
                onClick={() => setSelectedCategory(selectedCategory === type.name ? null : type.name)}
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className={`p-3 rounded-2xl bg-gradient-to-r ${type.color} shadow-lg`}>
                    <type.icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className={`text-xl font-bold ${type.textColor}`}>{type.name}</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">{type.items.length} common items</p>
                  </div>
                </div>
                
                {selectedCategory === type.name && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 space-y-2"
                  >
                    {type.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex items-center space-x-2 text-sm">
                        <CheckCircle className={`h-4 w-4 ${type.textColor}`} />
                        <span className="text-gray-700 dark:text-gray-300">{item}</span>
                      </div>
                    ))}
                  </motion.div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Recent Sorts */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20 dark:border-gray-700/20"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 flex items-center">
            <Star className="h-8 w-8 mr-3 text-yellow-500" />
            Recent Sorts
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {recentSorts.map((sort, index) => (
              <div key={index} className="bg-gray-50 dark:bg-gray-700/50 rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center justify-between mb-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    sort.category === 'Recyclable' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' :
                    sort.category === 'Organic' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300' :
                    'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'
                  }`}>
                    {sort.category}
                  </span>
                  <span className="text-xs text-gray-500">{sort.confidence}%</span>
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{sort.item}</h3>
                <div className="flex items-center space-x-2 text-yellow-600">
                  <Trophy className="h-4 w-4" />
                  <span className="text-sm font-medium">+{sort.points} points</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  );
}
