export type UserRole = 'farmer' | 'industry' | 'company' | 'admin' | 'verifier';

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  role: UserRole;
  phone?: string;
  location?: string;
  avatar?: string;
  photoURL?: string;
  createdAt: string;
  verified: boolean;
  status?: string;
}

export interface Farm {
  id: string;
  farmerId: string;
  farmerName: string;
  name: string;
  location: string;
  lat: number;
  lng: number;
  area: number; // in acres
  cropType: string;
  practices: string[];
  residueAvailable: number; // in tons
  createdAt: string;
}

export interface BiomassListing {
  id: string;
  farmerId: string;
  farmerName: string;
  farmId: string;
  type: 'crop_residue' | 'biochar' | 'biomass' | 'agricultural_waste';
  cropType: string;
  quantity: number; // in tons
  pricePerTon: number;
  location: string;
  lat: number;
  lng: number;
  description: string;
  status: 'available' | 'reserved' | 'sold';
  images?: string[];
  createdAt: string;
}

export interface CarbonProject {
  id: string;
  farmerId: string;
  farmId: string;
  farmName: string;
  practice: string;
  area: number;
  estimatedCredits: number;
  verificationStatus: 'pending' | 'in_review' | 'verified' | 'rejected';
  verifierId?: string;
  startDate: string;
  createdAt: string;
}

export interface CarbonCredit {
  id: string;
  projectId: string;
  farmerId: string;
  amount: number; // in tCO2e
  pricePerCredit: number;
  status: 'available' | 'reserved' | 'sold';
  vintage: string;
  certificationBody: string;
  createdAt: string;
}

export interface Transaction {
  id: string;
  buyerId: string;
  sellerId: string;
  type: 'biomass' | 'carbon_credit';
  itemId: string;
  quantity: number;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: string;
}

export interface Order {
  id: string;
  buyerId: string;
  sellerId: string;
  listingId: string;
  quantity: number;
  totalPrice: number;
  status: 'pending' | 'accepted' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  read: boolean;
  createdAt: string;
}

export interface ChatRoom {
  id: string;
  participants: string[];
  lastMessage: string;
  lastMessageAt: string;
  createdAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'order' | 'credit' | 'verification' | 'message' | 'system';
  read: boolean;
  createdAt: string;
}

// ---- CO2 Marketplace ----
export interface CO2Listing {
  id: string;
  processorId: string;
  processorName: string;
  co2Purity: number; // percentage
  quantity: number; // in tons
  pricePerTon: number;
  location: string;
  lat: number;
  lng: number;
  captureMethod: 'biomass_gasification' | 'pyrolysis' | 'direct_air' | 'fermentation';
  storageType: 'compressed_gas' | 'liquid' | 'solid' | 'supercritical';
  transportOptions: string[];
  description: string;
  status: 'available' | 'reserved' | 'sold';
  createdAt: string;
}

export interface CO2Order {
  id: string;
  buyerId: string;
  sellerId: string;
  listingId: string;
  quantity: number;
  totalPrice: number;
  industry: 'beverage' | 'greenhouse' | 'dry_ice' | 'welding' | 'chemical' | 'synthetic_fuel' | 'other';
  status: 'pending' | 'accepted' | 'in_transit' | 'delivered' | 'cancelled';
  createdAt: string;
}

// ---- Satellite Farm Monitoring ----
export interface SatelliteFarmData {
  farmId: string;
  ndvi: number; // vegetation index 0-1
  soilMoisture: number; // percentage
  residueBurning: boolean;
  soilCarbonEstimate: number; // tCO2e per hectare
  biomassCollected: number; // tons
  lastUpdated: string;
  carbonReductionStatus: 'on_track' | 'needs_attention' | 'critical';
}

// ---- AI Carbon Intelligence ----
export interface CarbonIntelligenceResult {
  estimatedCredits: number;
  co2CapturePotential: number;
  biomassProductionPotential: number;
  estimatedRevenue: number;
  confidenceScore: number;
  recommendations: string[];
}

// ---- Climate Verification (Verra/Gold Standard style) ----
export interface VerificationRecord {
  id: string;
  projectId: string;
  projectName: string;
  farmerId: string;
  verifierId?: string;
  baselineEmissions: number; // tCO2e
  emissionsReduced: number; // tCO2e
  creditsIssued: number;
  methodology: string;
  monitoringPeriod: { start: string; end: string };
  status: 'registered' | 'monitoring' | 'pending_verification' | 'verified' | 'rejected';
  documents: string[];
  registryId?: string;
  createdAt: string;
  updatedAt: string;
}

// ---- Processing Plant ----
export interface ProcessingMetrics {
  id: string;
  processorId: string;
  date: string;
  biomassInput: number; // tons
  co2Captured: number; // tons
  co2Stored: number; // tons
  co2Sold: number; // tons
  biocharProduced: number; // tons
  energyGenerated: number; // MWh
  efficiency: number; // percentage
}

// ---- Platform Stats ----
export interface PlatformStats {
  totalCO2Captured: number;
  totalCreditsIssued: number;
  totalBiomassProcessed: number;
  activeFarms: number;
  activeProcessors: number;
  totalRevenue: number;
}

// ---- Smart Parali Collection Network ----
export interface PickupRequest {
  id: string;
  farmerId: string;
  farmerName: string;
  farmId: string;
  residueType: string;
  quantity: number; // tons
  lat: number;
  lng: number;
  address: string;
  preferredDate: string;
  status: 'pending' | 'accepted' | 'in_transit' | 'collected' | 'cancelled';
  logisticsProviderId?: string;
  logisticsProviderName?: string;
  pickupRoute?: { lat: number; lng: number }[];
  notes?: string;
  createdAt: string;
  updatedAt?: string;
}

// ---- Farm Machinery Marketplace ----
export interface EquipmentListing {
  id: string;
  ownerId: string;
  ownerName: string;
  name: string;
  type: 'happy_seeder' | 'straw_baler' | 'mulcher' | 'shredder' | 'rotavator' | 'other';
  description: string;
  pricePerDay: number;
  pricePerAcre?: number;
  location: string;
  lat: number;
  lng: number;
  available: boolean;
  images?: string[];
  rating?: number;
  totalRentals?: number;
  createdAt: string;
}

export interface EquipmentRental {
  id: string;
  equipmentId: string;
  equipmentName: string;
  renterId: string;
  renterName: string;
  ownerId: string;
  startDate: string;
  endDate: string;
  totalCost: number;
  acres?: number;
  status: 'requested' | 'confirmed' | 'active' | 'completed' | 'cancelled';
  createdAt: string;
}

// ---- Carbon Revenue Wallet ----
export interface Wallet {
  id: string;
  userId: string;
  balance: number;
  totalEarnings: number;
  totalWithdrawals: number;
  carbonCreditEarnings: number;
  biomassSalesEarnings: number;
  co2SalesEarnings: number;
  equipmentRentalEarnings: number;
  currency: string;
  updatedAt: string;
}

export interface WalletTransaction {
  id: string;
  walletId: string;
  userId: string;
  type: 'credit' | 'debit';
  category: 'carbon_credit_sale' | 'biomass_sale' | 'co2_sale' | 'equipment_rental' | 'withdrawal' | 'bonus' | 'subsidy';
  amount: number;
  description: string;
  referenceId?: string;
  balanceAfter: number;
  createdAt: string;
}

// ---- Carbon Market Data ----
export interface CarbonMarketData {
  id: string;
  date: string;
  creditType: 'VCS' | 'GS' | 'CDM' | 'ACR' | 'CAR';
  pricePerTon: number;
  volume: number;
  region: string;
  change24h: number; // percentage
  high24h: number;
  low24h: number;
  marketCap: number;
}

// ---- Global Carbon Exchange ----
export interface CarbonTrade {
  id: string;
  sellerId: string;
  sellerName: string;
  sellerCountry: string;
  buyerId?: string;
  buyerName?: string;
  buyerCountry?: string;
  creditType: string;
  quantity: number;
  pricePerCredit: number;
  totalValue: number;
  status: 'open' | 'matched' | 'settled' | 'cancelled';
  vintage: string;
  methodology: string;
  createdAt: string;
  settledAt?: string;
}

// ---- ACIN Intelligence ----
export interface CarbonIntelligencePrediction {
  farmId: string;
  region: string;
  cropType: string;
  farmSize: number;
  residueVolume: number;
  carbonCreditsPotential: number;
  co2CapturePotential: number;
  biomassSupply: number;
  projectedRevenue: number;
  confidenceScore: number;
  timestamp: string;
}

export interface GlobalCarbonSupplyRegion {
  region: string;
  country: string;
  lat: number;
  lng: number;
  carbonPotential: number;
  activeFarms: number;
  residueAvailable: number;
  creditPrice: number;
}

// ---- Government Schemes ----
export interface GovernmentScheme {
  id: string;
  name: string;
  ministry: string;
  description: string;
  eligibility: string[];
  benefits: string[];
  applicationDeadline?: string;
  maxSubsidy: number;
  category: 'agriculture' | 'environment' | 'energy' | 'machinery' | 'carbon';
  state?: string;
  url?: string;
}

// ---- Climate Digital Twin ----
export interface DigitalTwinNode {
  id: string;
  type: 'farm' | 'collection' | 'processing' | 'co2_capture' | 'credit_issuance' | 'buyer';
  label: string;
  value: number;
  unit: string;
  lat?: number;
  lng?: number;
  status: 'active' | 'idle' | 'processing';
}

export interface DigitalTwinFlow {
  from: string;
  to: string;
  volume: number;
  unit: string;
  active: boolean;
}
