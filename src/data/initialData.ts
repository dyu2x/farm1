import { FingerlingProduct, InquiryOrder, BlogArticle, MonthlySalesSummary, FarmSettings } from '../types';
import logoImg from '../assets/images/mesina_farms_logo_1785996451263.jpg';
import starterImg from '../assets/images/clarias_starter_1785996462634.jpg';
import standardImg from '../assets/images/clarias_standard_1785996472204.jpg';
import advanceImg from '../assets/images/clarias_advance_1785996482236.jpg';
import jumboImg from '../assets/images/clarias_jumbo_1785996494324.jpg';
import pondWaterImg from '../assets/images/clarias_pond_water_1785996946806.jpg';

export const INITIAL_FARM_SETTINGS: FarmSettings = {
  farmName: 'Mesina Farms',
  tagline: 'Premium Clarias Batrachus Hatchery & Grower',
  species: 'Clarias batrachus (Philippine Native Walking Catfish / Hito)',
  farmAddress: 'Megastation Access Road, Brgy. San Jose, Santa Rita 2002, Pampanga, Philippines',
  coordinates: {
    lat: 15.0003,
    lng: 120.6152,
  },
  primaryEmail: 'support@mesina.farm',
  supportPhone: '+63 962 527 9820',
  operatingHours: 'Mon - Sat: 6:00 AM - 5:00 PM | Sun: 7:00 AM - 12:00 PM',
  lowStockThreshold: 5000,
  oxygenPackingCapacityPerBag: 500,
  logoUrl: logoImg,
};

export const INITIAL_PRODUCTS: FingerlingProduct[] = [
  {
    id: 'starter-1',
    name: 'Starter Fingerlings',
    sizeInInches: '1.0 - 1.5 in',
    sizeInCm: '2.5 - 3.8 cm',
    image: starterImg,
    stockCount: 65000,
    basePrice: 2.50,
    priceTiers: [
      { minQty: 100, maxQty: 1000, pricePerPc: 2.50 },
      { minQty: 1001, maxQty: 5000, pricePerPc: 2.20 },
      { minQty: 5001, maxQty: null, pricePerPc: 1.95 },
    ],
    description: 'Freshly nursed Clarias batrachus fry acclimated for nursery ponds and concrete tanks. High survival rate with proper feeding.',
    growthPeriodDays: 120,
    survivalRateEstimate: '96 - 98%',
    bestFor: 'Nursery ponds, hapa nets, and nursery tanks',
  },
  {
    id: 'standard-2',
    name: 'Standard Grow-out',
    sizeInInches: '2.0 - 2.5 in',
    sizeInCm: '5.0 - 6.3 cm',
    image: standardImg,
    stockCount: 42000,
    basePrice: 3.80,
    priceTiers: [
      { minQty: 100, maxQty: 1000, pricePerPc: 3.80 },
      { minQty: 1001, maxQty: 5000, pricePerPc: 3.35 },
      { minQty: 5001, maxQty: null, pricePerPc: 2.90 },
    ],
    description: 'Commercial standard size ready for grow-out earthen ponds and tarpaulin tanks. Fast feeding response and uniform size grading.',
    growthPeriodDays: 95,
    survivalRateEstimate: '97 - 99%',
    bestFor: 'Earthen grow-out ponds & high-density tarpaulin systems',
  },
  {
    id: 'advance-3',
    name: 'Advance Stocker',
    sizeInInches: '3.0 - 3.5 in',
    sizeInCm: '7.6 - 8.9 cm',
    image: advanceImg,
    stockCount: 18500,
    basePrice: 5.50,
    priceTiers: [
      { minQty: 100, maxQty: 1000, pricePerPc: 5.50 },
      { minQty: 1001, maxQty: 5000, pricePerPc: 4.85 },
      { minQty: 5001, maxQty: null, pricePerPc: 4.20 },
    ],
    description: 'Robust fingerlings with superior immunity and vigor. Significantly reduces harvest cycle and mortality risk during weather changes.',
    growthPeriodDays: 75,
    survivalRateEstimate: '98 - 99.5%',
    bestFor: 'Quick harvest cycles & integrated aquaculture ponds',
  },
  {
    id: 'jumbo-4',
    name: 'Jumbo Stocker',
    sizeInInches: '4.0 - 5.0 in',
    sizeInCm: '10.2 - 12.7 cm',
    image: jumboImg,
    stockCount: 4200, // Triggers Low Stock Alert (< 5000)
    basePrice: 8.00,
    priceTiers: [
      { minQty: 100, maxQty: 1000, pricePerPc: 8.00 },
      { minQty: 1001, maxQty: 5000, pricePerPc: 7.20 },
      { minQty: 5001, maxQty: null, pricePerPc: 6.40 },
    ],
    description: 'Premium heavy-grade stockers for rapid market turn-around. Highly disease resilient and aggressively feeds on commercial diets.',
    growthPeriodDays: 55,
    survivalRateEstimate: '99 - 100%',
    bestFor: 'Express harvest cycles & high-value market demand',
  },
];

export const INITIAL_ORDERS: InquiryOrder[] = [
  {
    id: 'ord-101',
    referenceNo: 'MF-2026-8801',
    customerName: 'Eduardo Santos',
    phone: '+63 917 882 1290',
    email: 'ed.santos.farms@gmail.com',
    townCity: 'Dinalupihan',
    province: 'Bataan',
    deliveryOption: 'pickup',
    preferredDate: '2026-08-08',
    items: [
      {
        product: INITIAL_PRODUCTS[1], // Standard Grow-out
        quantity: 5000,
        calculatedUnitPrice: 3.35,
        totalPrice: 16750,
      },
    ],
    totalQuantity: 5000,
    totalAmount: 16750,
    status: 'Confirmed',
    createdAt: '2026-08-01T09:30:00Z',
    notes: 'Requested pickup at 7:00 AM with 10 oxygenated bags prepared.',
  },
  {
    id: 'ord-102',
    referenceNo: 'MF-2026-8802',
    customerName: 'Maria Clara Cruz',
    phone: '+63 928 554 1092',
    email: 'mc.cruz@pampanga-aquaculture.ph',
    townCity: 'Lubao',
    province: 'Pampanga',
    deliveryOption: 'delivery',
    preferredDate: '2026-08-10',
    items: [
      {
        product: INITIAL_PRODUCTS[0], // Starter Fingerlings
        quantity: 10000,
        calculatedUnitPrice: 1.95,
        totalPrice: 19500,
      },
      {
        product: INITIAL_PRODUCTS[2], // Advance Stocker
        quantity: 2000,
        calculatedUnitPrice: 4.85,
        totalPrice: 9700,
      },
    ],
    totalQuantity: 12000,
    totalAmount: 29200,
    status: 'Pending',
    createdAt: '2026-08-03T14:15:00Z',
    notes: 'Farm delivery to Lubao pond site. Requires insulated transport container.',
  },
  {
    id: 'ord-103',
    referenceNo: 'MF-2026-8803',
    customerName: 'Ramon Garcia',
    phone: '+63 945 112 9981',
    email: 'ramon.garcia@pampanga-agri.com',
    townCity: 'Santa Rita',
    province: 'Pampanga',
    deliveryOption: 'pickup',
    preferredDate: '2026-08-05',
    items: [
      {
        product: INITIAL_PRODUCTS[3], // Jumbo Stocker
        quantity: 1500,
        calculatedUnitPrice: 7.20,
        totalPrice: 10800,
      },
    ],
    totalQuantity: 1500,
    totalAmount: 10800,
    status: 'Completed',
    createdAt: '2026-08-04T11:00:00Z',
    notes: 'Picked up on time. Payment settled in cash.',
  },
  {
    id: 'ord-104',
    referenceNo: 'MF-2026-8804',
    customerName: 'Juan Dela Cruz',
    phone: '+63 908 334 2211',
    email: 'j.delacruz@bulacan-fish.ph',
    townCity: 'Calumpit',
    province: 'Bulacan',
    deliveryOption: 'delivery',
    preferredDate: '2026-08-12',
    items: [
      {
        product: INITIAL_PRODUCTS[1], // Standard Grow-out
        quantity: 8000,
        calculatedUnitPrice: 2.90,
        totalPrice: 23200,
      },
    ],
    totalQuantity: 8000,
    totalAmount: 23200,
    status: 'Contacted',
    createdAt: '2026-08-05T08:45:00Z',
    notes: 'Customer called to inquire about oxygen transport endurance.',
  },
];

export const INITIAL_MONTHLY_SUMMARIES: MonthlySalesSummary[] = [
  {
    month: 'Jan 2026',
    year: 2026,
    totalOrders: 18,
    totalFingerlingsSold: 85000,
    totalRevenue: 272000,
    topSellingSize: 'Standard Grow-out (2.0-2.5 in)',
    fulfillmentRate: 98.2,
  },
  {
    month: 'Feb 2026',
    year: 2026,
    totalOrders: 22,
    totalFingerlingsSold: 110000,
    totalRevenue: 341000,
    topSellingSize: 'Standard Grow-out (2.0-2.5 in)',
    fulfillmentRate: 99.0,
  },
  {
    month: 'Mar 2026',
    year: 2026,
    totalOrders: 26,
    totalFingerlingsSold: 135000,
    totalRevenue: 418000,
    topSellingSize: 'Starter Fingerlings (1.0-1.5 in)',
    fulfillmentRate: 97.5,
  },
  {
    month: 'Apr 2026',
    year: 2026,
    totalOrders: 29,
    totalFingerlingsSold: 148000,
    totalRevenue: 462000,
    topSellingSize: 'Standard Grow-out (2.0-2.5 in)',
    fulfillmentRate: 98.8,
  },
  {
    month: 'May 2026',
    year: 2026,
    totalOrders: 31,
    totalFingerlingsSold: 162000,
    totalRevenue: 512000,
    topSellingSize: 'Advance Stocker (3.0-3.5 in)',
    fulfillmentRate: 99.1,
  },
  {
    month: 'Jun 2026',
    year: 2026,
    totalOrders: 34,
    totalFingerlingsSold: 175000,
    totalRevenue: 548000,
    topSellingSize: 'Standard Grow-out (2.0-2.5 in)',
    fulfillmentRate: 98.6,
  },
  {
    month: 'Jul 2026',
    year: 2026,
    totalOrders: 38,
    totalFingerlingsSold: 192000,
    totalRevenue: 598000,
    topSellingSize: 'Standard Grow-out (2.0-2.5 in)',
    fulfillmentRate: 99.4,
  },
  {
    month: 'Aug 2026',
    year: 2026,
    totalOrders: 15,
    totalFingerlingsSold: 78000,
    totalRevenue: 245000,
    topSellingSize: 'Starter Fingerlings (1.0-1.5 in)',
    fulfillmentRate: 100.0,
  },
];

export const INITIAL_BLOG_ARTICLES: BlogArticle[] = [
  {
    id: 'blog-1',
    slug: 'water-quality-management-clarias-batrachus',
    title: 'Optimal Water Quality Parameters for Native Clarias Batrachus Fingerlings',
    category: 'Water Quality',
    readTime: '5 min read',
    date: 'Aug 2, 2026',
    author: 'Engr. Nelson Mesina (Master Hatchery Specialist)',
    image: pondWaterImg,
    excerpt: 'Discover the exact pH, dissolved oxygen, and un-ionized ammonia limits needed to maintain 98%+ survival rates in Central Luzon earthen ponds.',
    content: `
      # Optimal Water Quality Parameters for Native Clarias Batrachus

      *Clarias batrachus* (commonly known as the Asian Walking Catfish or native hito in the Philippines) possesses an accessory breathing organ (suprabranchial organ) that allows it to tolerate lower dissolved oxygen levels than most freshwater species. However, maintaining optimal water quality during the fingerling and nursery stages is vital to prevent bacterial gill infections, erratic swim behavior, and slow growth.

      ## Key Water Parameters to Monitor Daily

      ### 1. pH Range (Ideal: 6.8 - 8.2)
      In Santa Rita and greater Pampanga pond systems, rainwater acidity can cause soil pH to drop below 6.5. 
      - **Symptom of low pH (<6.0):** Excessive mucus secretion, sluggish feeding.
      - **Correction:** Apply agricultural lime (calcium carbonate, $CaCO_3$) at $20$-$30\\text{ g/m}^2$.

      ### 2. Dissolved Oxygen (DO) (Ideal: >3.5 mg/L)
      While adult *Clarias batrachus* gulp atmospheric oxygen at the water surface, young fingerlings rely heavily on branchial respiration.
      - Keep evening dissolved oxygen levels above 3.5 mg/L to prevent energy expenditure on frequent surface gulping.

      ### 3. Total Ammonia Nitrogen (TAN) & Un-ionized Ammonia ($NH_3$)
      Un-ionized ammonia ($NH_3$) should be strictly kept under **0.02 mg/L**. High water temperature combined with high pH converts non-toxic ammonium ($NH_4^+$) into toxic $NH_3$.
      - Flush 10-15% of bottom pond water weekly and avoid overfeeding.
    `,
    keyTakeaways: [
      'Maintain pH between 6.8 and 8.2 with agricultural lime treatment.',
      'Keep un-ionized ammonia strictly under 0.02 mg/L.',
      'Perform 10-15% weekly water refreshes for concrete and tarpaulin tanks.',
    ],
  },
  {
    id: 'blog-2',
    slug: 'acclimatization-stocking-protocol',
    title: 'Mastering Fingerling Acclimatization: How to Prevent Transport Shock',
    category: 'Stocking',
    readTime: '6 min read',
    date: 'Jul 28, 2026',
    author: 'Mesina Farms Technical Team',
    image: starterImg,
    excerpt: 'Step-by-step guide on receiving oxygenated plastic transport bags, temperature equalizing, and gradual water mixing for zero-mortality stocking.',
    content: `
      # Zero-Mortality Fingerling Acclimatization Protocol

      Transporting fingerlings in sealed oxygenated bags creates a pressurized environment with elevated dissolved oxygen and mild carbon dioxide buildup. Abruptly releasing fingerlings directly into destination pond water causes osmotic shock and high early mortality.

      ## Step-by-Step Acclimatization Guide

      ### Step 1: Shade & Temperature Equalization (15-20 Mins)
      Float the unopened oxygenated bags on the surface of your receiving pond or nursery tank in a shaded corner. Allow 15 to 20 minutes for the water temperature inside the bag to match the pond temperature.

      ### Step 2: Gradual Water Equalization
      Open the top of the bag and roll down the plastic edges so it floats upright. Slowly splash pond water into the bag (about 25% of the bag volume every 5 minutes). This equalizes pH and mineral salinity.

      ### Step 3: Self-Release Behavior
      Submerge the mouth of the bag gently into the water and allow the *Clarias batrachus* fingerlings to swim out at their own pace. Never pour or dump fingerlings forcefully.
    `,
    keyTakeaways: [
      'Float sealed bags in shade for 15-20 minutes to equalize temperature.',
      'Mix pond water gradually into bags over 10-15 minutes.',
      'Allow fingerlings to swim out voluntarily — never shake or force them.',
    ],
  },
  {
    id: 'blog-3',
    slug: 'high-growth-feeding-strategies-clarias-batrachus',
    title: 'High-Efficiency Feeding Strategies for Maximum FCR in Catfish Farming',
    category: 'Feeding',
    readTime: '7 min read',
    date: 'Jul 15, 2026',
    author: 'Dr. Roberto Mendoza (Aquaculture Nutritionist)',
    image: advanceImg,
    excerpt: 'Calculate exact body-weight feeding percentages, optimize feeding schedules, and lower Food Conversion Ratio (FCR) below 1.15.',
    content: `
      # Feeding Strategies for Native Catfish (*Clarias batrachus*)

      Feed accounts for 65-70% of total grow-out operational costs. Achieving a Feed Conversion Ratio (FCR) of **1.10 - 1.20** requires precise ration control and high-protein commercial floating feeds tailored to the growth stage.

      ## Protein Requirements by Fingerling Stage

      | Fingerling Size | Feed Type | Crude Protein % | Daily Feeding Rate (% Body Weight) | Frequency |
      |---|---|---|---|---|
      | Starter (1.0 - 1.5 in) | Micro-Crumble / Fry Feed | 42 - 45% | 8 - 10% | 4x daily |
      | Standard (2.0 - 2.5 in) | Starter Floating Pellet (1.5mm) | 38 - 40% | 5 - 6% | 3x daily |
      | Advance (3.0 - 3.5 in) | Grower Floating Pellet (2.0mm) | 34 - 36% | 3 - 4% | 2x daily |
      | Jumbo (4.0 - 5.0 in) | Finisher Floating Pellet (3.0mm) | 30 - 32% | 2.5 - 3% | 2x daily |

      ## The 15-Minute Observation Rule
      Feed fingerlings until feeding activity slows down. Any uneaten feed remaining after 15 minutes leads to ammonia accumulation and water spoilage. Adjust the next ration accordingly!
    `,
    keyTakeaways: [
      'Starter fingerlings require high crude protein (42-45%) crumble feed.',
      'Feed 3-4 times daily in cooler morning and evening hours.',
      'Apply the 15-minute observation rule to avoid overfeeding and water pollution.',
    ],
  },
];
