export interface PriceTier {
  minQty: number;
  maxQty: number | null; // null means "and above"
  pricePerPc: number;
}

export interface FingerlingProduct {
  id: string;
  name: string; // e.g. "Starter Fingerlings"
  sizeInInches: string; // e.g. "1.0 - 1.5 in"
  sizeInCm: string; // e.g. "2.5 - 3.8 cm"
  image: string;
  stockCount: number;
  basePrice: number;
  priceTiers: PriceTier[];
  description: string;
  growthPeriodDays: number; // e.g. 90-120 days to harvest
  survivalRateEstimate: string; // e.g. "95-98%"
  bestFor: string; // e.g. "Nursery ponds & concrete tanks"
  isCustomAdded?: boolean;
}

export interface InquiryItem {
  product: FingerlingProduct;
  quantity: number;
  calculatedUnitPrice: number;
  totalPrice: number;
}

export type OrderStatus = 'Pending' | 'Contacted' | 'Confirmed' | 'Completed' | 'Cancelled';

export interface InquiryOrder {
  id: string;
  referenceNo: string;
  customerName: string;
  phone: string;
  email: string;
  townCity: string;
  province: string;
  deliveryOption: 'pickup' | 'delivery';
  preferredDate: string;
  items: InquiryItem[];
  totalQuantity: number;
  totalAmount: number;
  status: OrderStatus;
  createdAt: string;
  notes?: string;
}

export interface BlogArticle {
  id: string;
  slug: string;
  title: string;
  category: 'Water Quality' | 'Feeding' | 'Pond Prep' | 'Health' | 'Stocking';
  readTime: string;
  date: string;
  author: string;
  excerpt: string;
  content: string;
  image: string;
  keyTakeaways: string[];
}

export interface MonthlySalesSummary {
  month: string; // e.g. "Jan 2026"
  year: number;
  totalOrders: number;
  totalFingerlingsSold: number;
  totalRevenue: number;
  topSellingSize: string;
  fulfillmentRate: number; // percentage
}

export interface FarmSettings {
  farmName: string;
  tagline: string;
  species: string;
  farmAddress: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  primaryEmail: string;
  supportPhone: string;
  operatingHours: string;
  lowStockThreshold: number; // e.g. 5000 pcs
  oxygenPackingCapacityPerBag: number; // e.g. 500 pcs/bag
  logoUrl?: string;
}
