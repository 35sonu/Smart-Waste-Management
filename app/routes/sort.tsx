import type { Route } from "./+types/sort";
import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { useDropzone } from "react-dropzone";
import { 
  Camera, 
  Upload, 
  Trash2, 
  Recycle, 
  Leaf, 
  Zap, 
  CheckCircle, 
  Clock,
  AlertTriangle,
  Info,
  Star,
  History
} from "lucide-react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "AI Waste Sorter - EcoWaste Manager" },
    { name: "description", content: "Identify recyclable, organic, and non-recyclable items through AI image recognition." },
  ];
}

interface SortingResult {
  id: string;
  image: string;
  category: string;
  confidence: number;
  instructions: string;
  tips: string[];
  ecoPoints: number;
  timestamp: Date;
}

interface ClassificationCategory {
  name: string;
  color: string;
  icon: any;
  description: string;
}

const categories: Record<string, ClassificationCategory> = {
  'recyclable': {
    name: 'Recyclable',
    color: 'bg-green-500',
    icon: Recycle,
    description: 'Can be processed and made into new products'
  },
  'organic': {
    name: 'Organic',
    color: 'bg-yellow-500',
    icon: Leaf,
    description: 'Biodegradable waste that can be composted'
  },
  'electronic': {
    name: 'Electronic',
    color: 'bg-purple-500',
    icon: Zap,
    description: 'Electronic waste requiring special disposal'
  },
  'hazardous': {
    name: 'Hazardous',
    color: 'bg-red-500',
    icon: AlertTriangle,
    description: 'Dangerous materials requiring special handling'
  },
  'general': {
    name: 'General Waste',
    color: 'bg-gray-500',
    icon: Trash2,
    description: 'Non-recyclable waste for regular disposal'
  }
};

// Mock classification responses for Indian context
const indianMockResponses: Record<string, Omit<SortingResult, 'id' | 'image' | 'timestamp'>> = {
  plastic: {
    category: 'recyclable',
    confidence: 94,
    instructions: 'Clean thoroughly and place in dry waste bin. Contact local kabadiwala or recycling center.',
    tips: [
      'Remove all food residue before disposal',
      'Separate PET bottles from other plastics',
      'Check with your local Municipal Corporation for collection timings',
      'Many plastic items can be sold to scrap dealers'
    ],
    ecoPoints: 10
  },
  paper: {
    category: 'recyclable',
    confidence: 92,
    instructions: 'Keep dry and bundle with string. Sell to local raddi-wallah or recycling vendor.',
    tips: [
      'Remove any plastic coating or staples',
      'Newspaper, magazines, and cardboard have good resale value',
      'Wet paper cannot be recycled - keep it dry',
      'Office paper fetches better price than newspaper'
    ],
    ecoPoints: 8
  },
  organic: {
    category: 'organic',
    confidence: 97,
    instructions: 'Use for composting at home or give to wet waste collection. Perfect for kitchen gardens.',
    tips: [
      'Start home composting with kitchen scraps',
      'Coconut shells can be used as planters after composting',
      'Fruit peels make excellent natural fertilizer',
      'Avoid adding cooked food to compost to prevent pests'
    ],
    ecoPoints: 15
  },
  glass: {
    category: 'recyclable',
    confidence: 89,
    instructions: 'Clean and place carefully in recycling bin. Glass bottles have good resale value.',
    tips: [
      'Beer and wine bottles can be returned to some shops',
      'Separate colored glass from clear glass',
      'Remove metal caps and lids before recycling',
      'Broken glass should be wrapped safely before disposal'
    ],
    ecoPoints: 12
  },
  electronics: {
    category: 'electronic',
    confidence: 91,
    instructions: 'Take to authorized e-waste collection centers or participating retail stores.',
    tips: [
      'Many mobile retailers accept old phones during upgrades',
      'Government e-waste collection drives happen regularly',
      'Remove personal data and SIM cards before disposal',
      'Some components contain valuable metals - never burn e-waste'
    ],
    ecoPoints: 25
  },
  battery: {
    category: 'hazardous',
    confidence: 98,
    instructions: 'Never mix with regular waste. Drop at battery collection points in electronics stores.',
    tips: [
      'Many mobile stores accept old batteries',
      'Car batteries can be exchanged at auto service centers',
      'Alkaline batteries are less toxic but still need proper disposal',
      'Never burn or bury batteries as they contaminate soil and water'
    ],
    ecoPoints: 30
  },
  metal: {
    category: 'recyclable',
    confidence: 95,
    instructions: 'Clean and sell to local scrap dealer. Metal has excellent recycling value in India.',
    tips: [
      'Aluminum cans and foil have high scrap value',
      'Separate ferrous (iron) from non-ferrous metals',
      'Clean containers fetch better prices from kabadiwala',
      'Copper and brass items have premium recycling rates'
    ],
    ecoPoints: 18
  },
  textile: {
    category: 'recyclable',
    confidence: 87,
    instructions: 'Donate wearable clothes or give to textile recyclers. Many NGOs accept cloth donations.',
    tips: [
      'Good condition clothes can be donated to NGOs or orphanages',
      'Torn clothes can be used as cleaning rags',
      'Cotton and silk can be composted after removing synthetic blends',
      'Some brands have take-back programs for old garments'
    ],
    ecoPoints: 14
  },
  sanitary: {
    category: 'hazardous',
    confidence: 93,
    instructions: 'Wrap securely and dispose in general waste. Consider switching to eco-friendly alternatives.',
    tips: [
      'Sanitary napkins take 500-800 years to decompose',
      'Consider menstrual cups or biodegradable pads',
      'Diapers should be cleaned of organic matter before disposal',
      'Never flush sanitary products as they block sewage systems'
    ],
    ecoPoints: 5
  },
  medical: {
    category: 'hazardous',
    confidence: 99,
    instructions: 'Return to pharmacy or hospital for safe disposal. Never mix with household waste.',
    tips: [
      'Expired medicines should be returned to chemist shops',
      'Syringes and needles need special biomedical waste disposal',
      'Many hospitals have medical waste collection points',
      'Never burn or bury medical waste as it can be toxic'
    ],
    ecoPoints: 35
  }
};

const getSmartClassification = (filename: string): string => {
  const name = filename.toLowerCase();
  
  // Enhanced classification based on filename and common Indian waste patterns
  if (name.includes('bottle') || name.includes('plastic') || name.includes('pet')) return 'plastic';
  if (name.includes('paper') || name.includes('book') || name.includes('cardboard')) return 'paper';
  if (name.includes('glass') || name.includes('bottle')) return 'glass';
  if (name.includes('food') || name.includes('fruit') || name.includes('vegetable') || name.includes('organic')) return 'organic';
  if (name.includes('phone') || name.includes('laptop') || name.includes('electronic') || name.includes('mobile')) return 'electronics';
  if (name.includes('battery') || name.includes('cell')) return 'battery';
  if (name.includes('metal') || name.includes('aluminum') || name.includes('steel') || name.includes('iron')) return 'metal';
  if (name.includes('cloth') || name.includes('textile') || name.includes('fabric')) return 'textile';
  if (name.includes('sanitary') || name.includes('pad') || name.includes('diaper')) return 'sanitary';
  if (name.includes('medicine') || name.includes('syringe') || name.includes('pill')) return 'medical';
  
  // Random selection if no match
  const categories = Object.keys(indianMockResponses);
  return categories[Math.floor(Math.random() * categories.length)];
};

export default function Sort() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentResult, setCurrentResult] = useState<SortingResult | null>(null);
  const [history, setHistory] = useState<SortingResult[]>([]);

  const simulateAIAnalysis = (file: File): Promise<SortingResult> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Smart classification based on filename
        const classificationKey = getSmartClassification(file.name);
        const response = indianMockResponses[classificationKey];
        
        const result: SortingResult = {
          id: Date.now().toString(),
          image: URL.createObjectURL(file),
          timestamp: new Date(),
          ...response
        };
        
        resolve(result);
      }, 2000 + Math.random() * 1000); // 2-3 seconds simulation
    });
  };

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;
    
    const file = acceptedFiles[0];
    setIsAnalyzing(true);
    setCurrentResult(null);
    
    try {
      const result = await simulateAIAnalysis(file);
      setCurrentResult(result);
      setHistory(prev => [result, ...prev.slice(0, 9)]); // Keep last 10 results
    } catch (error) {
      console.error('Analysis failed:', error);
    } finally {
      setIsAnalyzing(false);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp']
    },
    multiple: false,
    maxSize: 10 * 1024 * 1024 // 10MB
  });

  const category = currentResult ? categories[currentResult.category] : null;
  const CategoryIcon = category?.icon;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          AI Waste Sorting Assistant
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Upload or take a photo of your waste item to identify the proper disposal method
        </p>
      </div>

      {/* Upload Area */}
      <div className="max-w-2xl mx-auto">
        <motion.div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
            isDragActive 
              ? 'border-green-500 bg-green-50 dark:bg-green-900/20' 
              : 'border-gray-300 dark:border-gray-600 hover:border-green-400 dark:hover:border-green-500'
          }`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <input {...getInputProps()} />
          
          {isAnalyzing ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4"
            >
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-600 mx-auto" />
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  Analyzing your item...
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Our AI is examining the image to determine the best disposal method
                </p>
              </div>
            </motion.div>
          ) : (
            <div className="space-y-4">
              <div className="flex justify-center space-x-4">
                <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-full">
                  <Upload className="h-8 w-8 text-green-600 dark:text-green-400" />
                </div>
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                  <Camera className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  {isDragActive ? 'Drop your image here' : 'Upload or drag an image'}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 mt-1">
                  Supports JPG, PNG, GIF up to 10MB
                </p>
              </div>
              
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Choose File
              </button>
            </div>
          )}
        </motion.div>
      </div>

      {/* Results */}
      {currentResult && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="md:flex">
              {/* Image */}
              <div className="md:w-1/2">
                <img
                  src={currentResult.image}
                  alt="Analyzed waste item"
                  className="h-64 w-full object-cover md:h-full"
                />
              </div>
              
              {/* Results */}
              <div className="md:w-1/2 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    {CategoryIcon && (
                      <div className={`p-2 ${category!.color} rounded-lg`}>
                        <CategoryIcon className="h-6 w-6 text-white" />
                      </div>
                    )}
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        {category!.name}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {currentResult.confidence}% confidence
                      </p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="flex items-center text-green-600 dark:text-green-400">
                      <Star className="h-5 w-5 mr-1" />
                      <span className="font-medium">+{currentResult.ecoPoints} points</span>
                    </div>
                  </div>
                </div>
                
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {category!.description}
                </p>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white flex items-center mb-2">
                      <Info className="h-4 w-4 mr-2" />
                      Disposal Instructions
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      {currentResult.instructions}
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white flex items-center mb-2">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Eco Tips
                    </h4>
                    <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                      {currentResult.tips.map((tip, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-green-500 mr-2">•</span>
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* History */}
      {history.length > 0 && (
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center mb-4">
            <History className="h-5 w-5 text-gray-400 mr-2" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Recent Classifications
            </h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {history.map((result) => {
              const historyCategory = categories[result.category];
              const HistoryIcon = historyCategory.icon;
              
              return (
                <motion.div
                  key={result.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow"
                >
                  <img
                    src={result.image}
                    alt="Classified item"
                    className="h-32 w-full object-cover"
                  />
                  
                  <div className="p-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <div className={`p-1 ${historyCategory.color} rounded`}>
                          <HistoryIcon className="h-3 w-3 text-white" />
                        </div>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          {historyCategory.name}
                        </span>
                      </div>
                      
                      <div className="flex items-center text-green-600 dark:text-green-400">
                        <Star className="h-3 w-3 mr-1" />
                        <span className="text-xs">+{result.ecoPoints}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                      <Clock className="h-3 w-3 mr-1" />
                      {result.timestamp.toLocaleDateString()}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tips Section */}
      <div className="max-w-4xl mx-auto">
        <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Photography Tips for Better Recognition
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h3 className="font-medium text-gray-800 dark:text-gray-200">For Best Results:</h3>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>• Ensure good lighting</li>
                <li>• Place item on plain background</li>
                <li>• Include entire item in frame</li>
                <li>• Keep camera steady</li>
              </ul>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-medium text-gray-800 dark:text-gray-200">Indian Waste Categories:</h3>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>• Plastics (PET bottles, containers)</li>
                <li>• Paper & Cardboard (newspapers, books)</li>
                <li>• Electronics & E-waste</li>
                <li>• Organic kitchen scraps</li>
                <li>• Metal items & containers</li>
                <li>• Glass bottles & jars</li>
                <li>• Textiles & clothing</li>
                <li>• Medical & hazardous waste</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
