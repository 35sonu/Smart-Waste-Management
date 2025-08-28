import express from 'express';
import { protect } from '../middleware/auth';

const router = express.Router();

// Classification interfaces and functions
interface ClassificationResult {
  category: string;
  confidence: number;
  matchedKeywords: string[];
}

interface WasteResponse {
  category: string;
  confidence: number;
  instructions: string;
  tips: string[];
  ecoPoints: number;
}

// Enhanced classification responses with comprehensive Indian context
const wasteResponses: Record<string, WasteResponse> = {
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
      'Wet paper cannot be recycled - keep it dry'
    ],
    ecoPoints: 8
  },
  organic: {
    category: 'organic',
    confidence: 97,
    instructions: 'Use for composting at home or give to wet waste collection.',
    tips: [
      'Start home composting with kitchen scraps',
      'Fruit peels make excellent natural fertilizer',
      'Avoid adding cooked food to compost to prevent pests'
    ],
    ecoPoints: 15
  },
  general: {
    category: 'general',
    confidence: 65,
    instructions: 'Dispose in regular waste bin. Contact local waste management for pickup timings.',
    tips: [
      'Try to minimize general waste by choosing recyclable alternatives',
      'Separate wet and dry waste as per local regulations'
    ],
    ecoPoints: 2
  }
};

function getSmartClassification(filename: string, file?: { size: number }): ClassificationResult {
  const name = filename.toLowerCase();
  let bestMatch = { category: '', confidence: 0, matchedKeywords: [] as string[] };
  
  const patterns = {
    plastic: {
      keywords: ['bottle', 'plastic', 'pet', 'polythene', 'wrapper', 'cup', 'container', 'bag'],
      baseConfidence: 85
    },
    paper: {
      keywords: ['paper', 'book', 'cardboard', 'newspaper', 'magazine', 'document'],
      baseConfidence: 88
    },
    organic: {
      keywords: ['food', 'fruit', 'vegetable', 'peel', 'scraps', 'kitchen', 'organic'],
      baseConfidence: 92
    }
  };

  Object.entries(patterns).forEach(([category, pattern]) => {
    let score = 0;
    const matchedKeywords: string[] = [];
    
    pattern.keywords.forEach(keyword => {
      if (name.includes(keyword)) {
        score += 15;
        matchedKeywords.push(keyword);
      }
    });
    
    if (file && file.size > 500000 && file.size < 5000000) {
      score += 5;
    }
    
    const confidence = Math.min(pattern.baseConfidence + score, 99);
    
    if (confidence > bestMatch.confidence && matchedKeywords.length > 0) {
      bestMatch = { category, confidence, matchedKeywords };
    }
  });
  
  return bestMatch.confidence > 0 ? bestMatch : {
    category: 'general',
    confidence: 50,
    matchedKeywords: ['default']
  };
}

function getWasteResponse(category: string): WasteResponse {
  return wasteResponses[category] || wasteResponses['general'];
}

// All routes are protected
router.use(protect);

// @desc    Classify waste item
// @route   POST /api/waste/classify
// @access  Private
router.post('/classify', async (req, res) => {
  try {
    const { filename, fileSize, imageData } = req.body;
    
    if (!filename) {
      return res.status(400).json({ error: 'Filename is required' });
    }
    
    // Enhanced classification algorithm (similar to frontend)
    const classificationResult = getSmartClassification(filename, { size: fileSize || 0 });
    const response = getWasteResponse(classificationResult.category);
    
    const result = {
      category: response.category,
      confidence: classificationResult.confidence,
      instructions: response.instructions,
      tips: [
        ...response.tips,
        `Classification based on: ${classificationResult.matchedKeywords.join(', ')}`,
        fileSize ? `File size: ${(fileSize / 1024).toFixed(1)} KB` : 'File size not provided'
      ],
      ecoPoints: Math.floor(response.ecoPoints * (classificationResult.confidence / 100)),
      timestamp: new Date()
    };
    
    res.json(result);
  } catch (error) {
    console.error('Classification error:', error);
    res.status(500).json({ error: 'Failed to classify waste item' });
  }
});

// @desc    Get waste classification history
// @route   GET /api/waste/history
// @access  Private
router.get('/history', async (req, res) => {
  try {
    // In a real implementation, this would fetch from database
    // For now, return sample data structure
    const sampleHistory = [
      {
        id: '1',
        category: 'recyclable',
        confidence: 94,
        ecoPoints: 10,
        timestamp: new Date(Date.now() - 86400000), // 1 day ago
        filename: 'plastic_bottle.jpg'
      },
      {
        id: '2', 
        category: 'organic',
        confidence: 97,
        ecoPoints: 15,
        timestamp: new Date(Date.now() - 172800000), // 2 days ago
        filename: 'fruit_peels.jpg'
      }
    ];
    
    res.json({ 
      history: sampleHistory,
      totalPoints: sampleHistory.reduce((sum, item) => sum + item.ecoPoints, 0)
    });
  } catch (error) {
    console.error('History fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch classification history' });
  }
});

export default router;
