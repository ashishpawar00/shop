const express = require('express');
const Product = require('../models/Product');
const { HINDI, CROP_LABELS_HI, SYMPTOM_LABELS_HI, ISSUE_AREA_LABELS_HI } = require('./cropDoctorHindi');

const router = express.Router();

const CROP_LABELS = {
  wheat: 'Wheat',
  rice: 'Rice',
  cotton: 'Cotton',
  sugarcane: 'Sugarcane',
  vegetables: 'Vegetables',
  fruits: 'Fruits',
  pulses: 'Pulses',
  oilseeds: 'Oilseeds',
  all: 'Mixed crops',
};

const SYMPTOM_LABELS = {
  yellowing: 'Leaf yellowing',
  brown_spots: 'Brown or black spots',
  holes_or_bites: 'Holes or bite marks',
  curling: 'Leaf curling',
  white_powder: 'White powder or fungal layer',
  wilting: 'Wilting or drooping',
  stunted_growth: 'Slow or stunted growth',
  stem_damage: 'Stem damage',
  insect_presence: 'Visible insects',
  root_rot: 'Root rot or foul smell',
};

const ISSUE_AREA_LABELS = {
  leaf: 'Leaf',
  stem: 'Stem',
  root: 'Root',
  fruit: 'Fruit or pod',
  whole_plant: 'Whole plant',
};

const DIAGNOSES = [
  {
    id: 'leaf-blight',
    title: 'Leaf Blight Risk',
    category: 'pesticides',
    severity: 'high',
    crops: ['wheat', 'rice'],
    issueAreas: ['leaf', 'whole_plant'],
    symptoms: ['yellowing', 'brown_spots', 'wilting'],
    keywords: ['spot', 'blight', 'lesion', 'brown', 'yellow patch'],
    summary: 'The crop is showing a pattern commonly linked with fungal leaf blight pressure.',
    cause: 'Long leaf wetness, humidity, and unmanaged fungal load often trigger this problem.',
    immediateActions: [
      'Remove badly infected leaves or tillers from the field edge.',
      'Avoid overhead irrigation for the next watering cycle.',
      'Improve airflow and keep the canopy from staying wet for long periods.',
    ],
    treatment: [
      'Use a broad-spectrum fungicide recommended for blight control as per label guidance.',
      'Repeat the spray only if symptoms continue to expand after the recommended interval.',
      'Monitor nearby plants for new lesions during the next 3 to 5 days.',
    ],
    prevention: [
      'Start with clean seed and balanced nutrition.',
      'Avoid dense canopy growth from excessive nitrogen.',
      'Rotate chemistry classes if repeated sprays are needed.',
    ],
  },
  {
    id: 'stem-borer',
    title: 'Stem Borer or Chewing Pest Attack',
    category: 'pesticides',
    severity: 'high',
    crops: ['rice', 'sugarcane'],
    issueAreas: ['stem', 'whole_plant'],
    symptoms: ['holes_or_bites', 'stem_damage', 'wilting', 'insect_presence'],
    keywords: ['dead heart', 'borer', 'hole in stem', 'chewed'],
    summary: 'The reported damage pattern matches stem-boring or internal chewing pests.',
    cause: 'Larvae feeding inside stems weaken the crop and block nutrient movement.',
    immediateActions: [
      'Inspect the central whorl and split a few affected stems to confirm larval activity.',
      'Remove heavily damaged plants from small patches when infestation is localized.',
      'Use light traps or field scouting at dusk to estimate pest pressure.',
    ],
    treatment: [
      'Apply a labeled insecticide for stem borers based on crop stage and infestation level.',
      'Follow the exact per-acre dose from the product label or agronomist guidance.',
      'Recheck the field after 4 to 5 days for fresh entry holes.',
    ],
    prevention: [
      'Destroy crop residue that can harbor larvae.',
      'Use pheromone or light traps during the risk period.',
      'Keep field scouting active once every few days during vulnerable growth stages.',
    ],
  },
  {
    id: 'sap-sucking-pests',
    title: 'Aphid / Whitefly / Jassid Pressure',
    category: 'pesticides',
    severity: 'medium',
    crops: ['cotton', 'vegetables', 'fruits'],
    issueAreas: ['leaf', 'whole_plant'],
    symptoms: ['yellowing', 'curling', 'insect_presence', 'stunted_growth'],
    keywords: ['sticky', 'aphid', 'whitefly', 'jassid', 'small insects'],
    summary: 'The symptoms point toward sap-sucking insects affecting leaf health and growth.',
    cause: 'These pests feed on sap, curl the leaves, and weaken plant vigor quickly.',
    immediateActions: [
      'Check the underside of leaves for clustered insects or eggs.',
      'Separate badly infested leaves in nursery or kitchen garden patches.',
      'Avoid excess nitrogen that can attract fresh pest pressure.',
    ],
    treatment: [
      'Use a labeled systemic or contact insecticide suitable for sap-sucking pests.',
      'Spray during calm weather and target the lower leaf surface well.',
      'Repeat scouting before repeating any spray.',
    ],
    prevention: [
      'Use yellow sticky traps where practical.',
      'Encourage natural predators by avoiding unnecessary broad sprays.',
      'Keep weeds around the crop under control.',
    ],
  },
  {
    id: 'powdery-mildew',
    title: 'Powdery Mildew Risk',
    category: 'pesticides',
    severity: 'medium',
    crops: ['vegetables', 'fruits', 'oilseeds'],
    issueAreas: ['leaf', 'fruit'],
    symptoms: ['white_powder', 'curling', 'yellowing'],
    keywords: ['powder', 'white layer', 'dusty'],
    summary: 'The visible signs resemble powdery mildew, especially on leaves and tender growth.',
    cause: 'Powdery mildew thrives when humidity is high and airflow is poor.',
    immediateActions: [
      'Prune crowded foliage where possible to improve air movement.',
      'Avoid late-evening irrigation that keeps foliage damp.',
      'Isolate severely affected leaves in kitchen garden or nursery setups.',
    ],
    treatment: [
      'Use a crop-safe fungicide labeled for powdery mildew.',
      'Maintain the spray interval only as advised on the label.',
      'Track whether new white patches keep appearing on fresh growth.',
    ],
    prevention: [
      'Maintain spacing and airflow.',
      'Avoid overuse of nitrogen fertilizer.',
      'Scout the crop early once weather turns humid.',
    ],
  },
  {
    id: 'root-rot',
    title: 'Root Rot or Water Stress',
    category: 'pesticides',
    severity: 'high',
    crops: ['vegetables', 'fruits', 'pulses', 'cotton'],
    issueAreas: ['root', 'whole_plant'],
    symptoms: ['wilting', 'yellowing', 'root_rot', 'stunted_growth'],
    keywords: ['foul smell', 'black root', 'rotting root', 'waterlogged'],
    summary: 'Wilting with root-zone damage suggests root rot or severe waterlogging stress.',
    cause: 'Poor drainage and infected root zones reduce uptake and trigger collapse.',
    immediateActions: [
      'Check soil moisture before the next irrigation cycle.',
      'Open drainage channels if standing water is present.',
      'Pull one affected plant to inspect the root color and smell.',
    ],
    treatment: [
      'Use a root-zone fungicidal drench only if root rot symptoms are confirmed.',
      'Reduce irrigation frequency until the upper soil profile recovers.',
      'Support plant recovery with balanced nutrition after stress reduces.',
    ],
    prevention: [
      'Improve drainage before the next planting cycle.',
      'Avoid repeated irrigation on already wet soil.',
      'Use treated planting material when available.',
    ],
  },
  {
    id: 'nutrient-deficiency',
    title: 'Nutrient Deficiency or General Crop Stress',
    category: 'fertilizers',
    severity: 'medium',
    crops: ['all'],
    issueAreas: ['leaf', 'whole_plant'],
    symptoms: ['yellowing', 'stunted_growth', 'wilting'],
    keywords: ['pale', 'weak growth', 'no insects', 'uniform yellowing'],
    summary: 'The field signs are consistent with nutritional imbalance or broad stress rather than a specific pest.',
    cause: 'Uneven feeding, soil stress, or irrigation imbalance can slow growth and fade foliage.',
    immediateActions: [
      'Review the last fertilizer dose and irrigation timing.',
      'Inspect whether yellowing is uniform across the field or limited to patches.',
      'Check for secondary pest pressure before applying a spray.',
    ],
    treatment: [
      'Use a balanced nutrient correction based on crop stage and visible deficiency pattern.',
      'Consider micronutrient support if the crop shows interveinal yellowing or pale young leaves.',
      'Reassess plant color after the next irrigation cycle.',
    ],
    prevention: [
      'Feed in smaller, timely doses instead of one heavy application.',
      'Use soil testing for recurring deficiency issues.',
      'Avoid stress from overwatering or long dry gaps.',
    ],
  },
];

function normalizeInput(body) {
  return {
    cropType: String(body.cropType || '').trim().toLowerCase(),
    issueArea: String(body.issueArea || '').trim().toLowerCase(),
    symptoms: Array.isArray(body.symptoms)
      ? body.symptoms.map((symptom) => String(symptom || '').trim().toLowerCase()).filter(Boolean)
      : [],
    notes: String(body.notes || '').trim().toLowerCase(),
    hasImage: Boolean(body.imageData),
    language: String(body.language || 'en').trim().toLowerCase(),
  };
}

function scoreDiagnosis(input, diagnosis) {
  let score = 0;
  const matchedSymptoms = [];
  const keywordHits = [];

  if (diagnosis.crops.includes('all') || diagnosis.crops.includes(input.cropType)) {
    score += 4;
  }

  if (input.issueArea && diagnosis.issueAreas.includes(input.issueArea)) {
    score += 2;
  }

  input.symptoms.forEach((symptom) => {
    if (diagnosis.symptoms.includes(symptom)) {
      matchedSymptoms.push(symptom);
      score += 3;
    }
  });

  diagnosis.keywords.forEach((keyword) => {
    if (input.notes.includes(keyword)) {
      keywordHits.push(keyword);
      score += 1;
    }
  });

  if (input.hasImage) {
    score += 1;
  }

  return { score, matchedSymptoms, keywordHits };
}

function confidenceFromScore(score) {
  return Number(Math.min(0.94, Math.max(0.38, 0.28 + score / 20)).toFixed(2));
}

async function loadRecommendedProducts(category, cropType) {
  const projection = 'name brand price unit image category cropType';

  let products = await Product.find({
    category,
    inStock: true,
    cropType: { $in: [cropType, 'all'] },
  })
    .sort({ featured: -1, createdAt: -1 })
    .limit(3)
    .select(projection);

  if (!products.length) {
    products = await Product.find({ category, inStock: true })
      .sort({ featured: -1, createdAt: -1 })
      .limit(3)
      .select(projection);
  }

  return products.map((product) => ({
    id: product._id,
    name: product.name,
    brand: product.brand || 'Trusted brand',
    price: product.price,
    unit: product.unit || 'unit',
    image: product.image,
    category: product.category,
  }));
}

router.post('/analyze', async (req, res) => {
  try {
    const input = normalizeInput(req.body);

    if (!input.cropType) {
      return res.status(400).json({ message: 'Crop type is required for diagnosis.' });
    }

    const ranked = DIAGNOSES.map((diagnosis) => {
      const result = scoreDiagnosis(input, diagnosis);
      return { diagnosis, ...result };
    }).sort((left, right) => right.score - left.score);

    const bestMatch = ranked[0];

    const isHindi = input.language === 'hi';
    const fb = HINDI.fallback;

    if (!bestMatch || bestMatch.score <= 0) {
      return res.status(200).json({
        diagnosis: {
          title: isHindi ? fb.title : 'Field inspection recommended',
          crop: isHindi ? (CROP_LABELS_HI[input.cropType] || input.cropType) : (CROP_LABELS[input.cropType] || input.cropType),
          severity: 'medium',
          confidence: 0.38,
          summary: isHindi ? fb.summary : 'The current signals are too limited for a confident match.',
          cause: isHindi ? fb.cause : 'Please add a clearer symptom description or contact the store for manual review.',
          immediateActions: isHindi ? fb.immediateActions : [
            'Take close photos of the affected leaf, stem, and full plant.',
            'Add notes about irrigation, insects, and how quickly the issue spread.',
            'Reach out for a manual field recommendation before spraying.',
          ],
          treatment: isHindi ? fb.treatment : [
            'Do not over-apply pesticides until the issue is confirmed.',
            'Keep the crop under observation for the next 24 hours.',
          ],
          prevention: isHindi ? fb.prevention : [
            'Capture symptoms early and keep field records.',
          ],
        },
        matchedSymptoms: input.symptoms.map((symptom) => (isHindi ? SYMPTOM_LABELS_HI[symptom] : SYMPTOM_LABELS[symptom]) || symptom),
        issueArea: isHindi ? (ISSUE_AREA_LABELS_HI[input.issueArea] || '') : (ISSUE_AREA_LABELS[input.issueArea] || ''),
        recommendedProducts: [],
        disclaimer: isHindi ? HINDI.disclaimer : 'This is a decision-support recommendation and should be confirmed on-field before major spray decisions.',
      });
    }

    const diagnosis = bestMatch.diagnosis;
    const hi = HINDI[diagnosis.id];
    const recommendedProducts = await loadRecommendedProducts(diagnosis.category, input.cropType);

    res.json({
      diagnosis: {
        id: diagnosis.id,
        title: isHindi && hi ? hi.title : diagnosis.title,
        crop: isHindi ? (CROP_LABELS_HI[input.cropType] || input.cropType) : (CROP_LABELS[input.cropType] || input.cropType),
        severity: diagnosis.severity,
        confidence: confidenceFromScore(bestMatch.score),
        summary: isHindi && hi ? hi.summary : diagnosis.summary,
        cause: isHindi && hi ? hi.cause : diagnosis.cause,
        immediateActions: isHindi && hi ? hi.immediateActions : diagnosis.immediateActions,
        treatment: isHindi && hi ? hi.treatment : diagnosis.treatment,
        prevention: isHindi && hi ? hi.prevention : diagnosis.prevention,
      },
      matchedSymptoms: bestMatch.matchedSymptoms.map((symptom) => (isHindi ? SYMPTOM_LABELS_HI[symptom] : SYMPTOM_LABELS[symptom]) || symptom),
      noteSignals: bestMatch.keywordHits,
      issueArea: isHindi ? (ISSUE_AREA_LABELS_HI[input.issueArea] || '') : (ISSUE_AREA_LABELS[input.issueArea] || ''),
      recommendedProducts,
      disclaimer: isHindi ? HINDI.disclaimer : 'This is a decision-support recommendation and should be confirmed on-field before major spray decisions.',
    });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Unable to analyze crop sample.' });
  }
});

module.exports = router;
