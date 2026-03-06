import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  addDoc,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore';
import { db } from './firebase';
import type {
  UserProfile,
  Farm,
  BiomassListing,
  CarbonProject,
  CarbonCredit,
  Order,
  Message,
  Notification,
  CO2Listing,
  CO2Order,
  VerificationRecord,
  ProcessingMetrics,
  PickupRequest,
  EquipmentListing,
  EquipmentRental,
  Wallet,
  WalletTransaction,
  CarbonMarketData,
  CarbonTrade,
} from './types';

// ---- Users ----
export async function createUserProfile(profile: UserProfile) {
  await setDoc(doc(db, 'users', profile.uid), profile);
}

export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  const snap = await getDoc(doc(db, 'users', uid));
  return snap.exists() ? (snap.data() as UserProfile) : null;
}

export async function updateUserProfile(uid: string, data: Partial<UserProfile>) {
  await updateDoc(doc(db, 'users', uid), data);
}

export async function getUsersByRole(role: string): Promise<UserProfile[]> {
  const q = query(collection(db, 'users'), where('role', '==', role));
  const snap = await getDocs(q);
  return snap.docs.map((d) => d.data() as UserProfile);
}

// ---- Farms ----
export async function createFarm(farm: Omit<Farm, 'id'>): Promise<string> {
  const ref = await addDoc(collection(db, 'farms'), farm);
  return ref.id;
}

export async function getFarmsByFarmer(farmerId: string): Promise<Farm[]> {
  const q = query(collection(db, 'farms'), where('farmerId', '==', farmerId));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Farm));
}

export async function getAllFarms(): Promise<Farm[]> {
  const snap = await getDocs(collection(db, 'farms'));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Farm));
}

// ---- Biomass Listings ----
export async function createListing(listing: Omit<BiomassListing, 'id'>): Promise<string> {
  const ref = await addDoc(collection(db, 'biomassListings'), listing);
  return ref.id;
}

export async function getListings(filters?: { type?: string; status?: string }): Promise<BiomassListing[]> {
  let q = query(collection(db, 'biomassListings'), where('status', '==', 'available'));
  if (filters?.type) {
    q = query(collection(db, 'biomassListings'), where('type', '==', filters.type), where('status', '==', 'available'));
  }
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as BiomassListing));
}

export async function getListingsByFarmer(farmerId: string): Promise<BiomassListing[]> {
  const q = query(collection(db, 'biomassListings'), where('farmerId', '==', farmerId));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as BiomassListing));
}

export async function updateListing(id: string, data: Partial<BiomassListing>) {
  await updateDoc(doc(db, 'biomassListings', id), data);
}

// ---- Carbon Projects ----
export async function createCarbonProject(project: Omit<CarbonProject, 'id'>): Promise<string> {
  const ref = await addDoc(collection(db, 'carbonProjects'), project);
  return ref.id;
}

export async function getCarbonProjectsByFarmer(farmerId: string): Promise<CarbonProject[]> {
  const q = query(collection(db, 'carbonProjects'), where('farmerId', '==', farmerId));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as CarbonProject));
}

export async function getAllCarbonProjects(): Promise<CarbonProject[]> {
  const snap = await getDocs(collection(db, 'carbonProjects'));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as CarbonProject));
}

export async function updateCarbonProject(id: string, data: Partial<CarbonProject>) {
  await updateDoc(doc(db, 'carbonProjects', id), data);
}

// ---- Carbon Credits ----
export async function createCarbonCredit(credit: Omit<CarbonCredit, 'id'>): Promise<string> {
  const ref = await addDoc(collection(db, 'carbonCredits'), credit);
  return ref.id;
}

export async function getAvailableCredits(): Promise<CarbonCredit[]> {
  const q = query(collection(db, 'carbonCredits'), where('status', '==', 'available'));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as CarbonCredit));
}

export async function getCreditsByFarmer(farmerId: string): Promise<CarbonCredit[]> {
  const q = query(collection(db, 'carbonCredits'), where('farmerId', '==', farmerId));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as CarbonCredit));
}

export async function updateCarbonCredit(id: string, data: Partial<CarbonCredit>) {
  await updateDoc(doc(db, 'carbonCredits', id), data);
}

// ---- Orders ----
export async function createOrder(order: Omit<Order, 'id'>): Promise<string> {
  const ref = await addDoc(collection(db, 'orders'), order);
  return ref.id;
}

export async function getOrdersByBuyer(buyerId: string): Promise<Order[]> {
  const q = query(collection(db, 'orders'), where('buyerId', '==', buyerId));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Order));
}

export async function getOrdersBySeller(sellerId: string): Promise<Order[]> {
  const q = query(collection(db, 'orders'), where('sellerId', '==', sellerId));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Order));
}

export async function updateOrder(id: string, data: Partial<Order>) {
  await updateDoc(doc(db, 'orders', id), data);
}

// ---- Messages ----
export async function sendMessage(message: Omit<Message, 'id'>): Promise<string> {
  const ref = await addDoc(collection(db, 'messages'), message);
  return ref.id;
}

export async function getMessages(userId1: string, userId2: string): Promise<Message[]> {
  const q = query(
    collection(db, 'messages'),
    where('senderId', 'in', [userId1, userId2])
  );
  const snap = await getDocs(q);
  return snap.docs
    .map((d) => ({ id: d.id, ...d.data() } as Message))
    .filter((m) => (m.senderId === userId1 && m.receiverId === userId2) || (m.senderId === userId2 && m.receiverId === userId1))
    .sort((a, b) => a.createdAt.localeCompare(b.createdAt));
}

// ---- Notifications ----
export async function createNotification(notification: Omit<Notification, 'id'>): Promise<string> {
  const ref = await addDoc(collection(db, 'notifications'), notification);
  return ref.id;
}

export async function getNotifications(userId: string): Promise<Notification[]> {
  const q = query(collection(db, 'notifications'), where('userId', '==', userId));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Notification));
}

export async function markNotificationRead(id: string) {
  await updateDoc(doc(db, 'notifications', id), { read: true });
}

// ---- CO2 Listings ----
export async function createCO2Listing(listing: Omit<CO2Listing, 'id'>): Promise<string> {
  const ref = await addDoc(collection(db, 'co2Listings'), listing);
  return ref.id;
}

export async function getAvailableCO2Listings(): Promise<CO2Listing[]> {
  const q = query(collection(db, 'co2Listings'), where('status', '==', 'available'));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as CO2Listing));
}

export async function getCO2ListingsByProcessor(processorId: string): Promise<CO2Listing[]> {
  const q = query(collection(db, 'co2Listings'), where('processorId', '==', processorId));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as CO2Listing));
}

export async function updateCO2Listing(id: string, data: Partial<CO2Listing>) {
  await updateDoc(doc(db, 'co2Listings', id), data);
}

// ---- CO2 Orders ----
export async function createCO2Order(order: Omit<CO2Order, 'id'>): Promise<string> {
  const ref = await addDoc(collection(db, 'co2Orders'), order);
  return ref.id;
}

export async function getCO2OrdersByBuyer(buyerId: string): Promise<CO2Order[]> {
  const q = query(collection(db, 'co2Orders'), where('buyerId', '==', buyerId));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as CO2Order));
}

export async function getCO2OrdersBySeller(sellerId: string): Promise<CO2Order[]> {
  const q = query(collection(db, 'co2Orders'), where('sellerId', '==', sellerId));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as CO2Order));
}

export async function updateCO2Order(id: string, data: Partial<CO2Order>) {
  await updateDoc(doc(db, 'co2Orders', id), data);
}

// ---- Verification Records ----
export async function createVerificationRecord(record: Omit<VerificationRecord, 'id'>): Promise<string> {
  const ref = await addDoc(collection(db, 'verificationRecords'), record);
  return ref.id;
}

export async function getAllVerificationRecords(): Promise<VerificationRecord[]> {
  const snap = await getDocs(collection(db, 'verificationRecords'));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as VerificationRecord));
}

export async function getVerificationsByProject(projectId: string): Promise<VerificationRecord[]> {
  const q = query(collection(db, 'verificationRecords'), where('projectId', '==', projectId));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as VerificationRecord));
}

export async function updateVerificationRecord(id: string, data: Partial<VerificationRecord>) {
  await updateDoc(doc(db, 'verificationRecords', id), data);
}

// ---- Processing Metrics ----
export async function addProcessingMetrics(metrics: Omit<ProcessingMetrics, 'id'>): Promise<string> {
  const ref = await addDoc(collection(db, 'processingMetrics'), metrics);
  return ref.id;
}

export async function getProcessingMetrics(processorId: string): Promise<ProcessingMetrics[]> {
  const q = query(collection(db, 'processingMetrics'), where('processorId', '==', processorId));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as ProcessingMetrics));
}

// ---- Pickup Requests (Smart Parali Collection) ----
export async function createPickupRequest(request: Omit<PickupRequest, 'id'>): Promise<string> {
  const ref = await addDoc(collection(db, 'pickupRequests'), request);
  return ref.id;
}

export async function getPickupRequestsByFarmer(farmerId: string): Promise<PickupRequest[]> {
  const q = query(collection(db, 'pickupRequests'), where('farmerId', '==', farmerId));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as PickupRequest));
}

export async function getPendingPickupRequests(): Promise<PickupRequest[]> {
  const q = query(collection(db, 'pickupRequests'), where('status', '==', 'pending'));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as PickupRequest));
}

export async function updatePickupRequest(id: string, data: Partial<PickupRequest>) {
  await updateDoc(doc(db, 'pickupRequests', id), data);
}

// ---- Equipment Listings (Farm Machinery) ----
export async function createEquipmentListing(listing: Omit<EquipmentListing, 'id'>): Promise<string> {
  const ref = await addDoc(collection(db, 'equipmentListings'), listing);
  return ref.id;
}

export async function getAvailableEquipment(): Promise<EquipmentListing[]> {
  const q = query(collection(db, 'equipmentListings'), where('available', '==', true));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as EquipmentListing));
}

export async function getEquipmentByOwner(ownerId: string): Promise<EquipmentListing[]> {
  const q = query(collection(db, 'equipmentListings'), where('ownerId', '==', ownerId));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as EquipmentListing));
}

export async function updateEquipmentListing(id: string, data: Partial<EquipmentListing>) {
  await updateDoc(doc(db, 'equipmentListings', id), data);
}

// ---- Equipment Rentals ----
export async function createEquipmentRental(rental: Omit<EquipmentRental, 'id'>): Promise<string> {
  const ref = await addDoc(collection(db, 'equipmentRentals'), rental);
  return ref.id;
}

export async function getRentalsByRenter(renterId: string): Promise<EquipmentRental[]> {
  const q = query(collection(db, 'equipmentRentals'), where('renterId', '==', renterId));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as EquipmentRental));
}

export async function getRentalsByOwner(ownerId: string): Promise<EquipmentRental[]> {
  const q = query(collection(db, 'equipmentRentals'), where('ownerId', '==', ownerId));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as EquipmentRental));
}

export async function updateEquipmentRental(id: string, data: Partial<EquipmentRental>) {
  await updateDoc(doc(db, 'equipmentRentals', id), data);
}

// ---- Wallet ----
export async function getOrCreateWallet(userId: string): Promise<Wallet> {
  const snap = await getDoc(doc(db, 'wallets', userId));
  if (snap.exists()) return { id: snap.id, ...snap.data() } as Wallet;
  const wallet: Omit<Wallet, 'id'> = {
    userId,
    balance: 0,
    totalEarnings: 0,
    totalWithdrawals: 0,
    carbonCreditEarnings: 0,
    biomassSalesEarnings: 0,
    co2SalesEarnings: 0,
    equipmentRentalEarnings: 0,
    currency: 'INR',
    updatedAt: new Date().toISOString(),
  };
  await setDoc(doc(db, 'wallets', userId), wallet);
  return { id: userId, ...wallet };
}

export async function updateWallet(userId: string, data: Partial<Wallet>) {
  await updateDoc(doc(db, 'wallets', userId), { ...data, updatedAt: new Date().toISOString() });
}

export async function addWalletTransaction(tx: Omit<WalletTransaction, 'id'>): Promise<string> {
  const ref = await addDoc(collection(db, 'walletTransactions'), tx);
  return ref.id;
}

export async function getWalletTransactions(userId: string): Promise<WalletTransaction[]> {
  const q = query(collection(db, 'walletTransactions'), where('userId', '==', userId), orderBy('createdAt', 'desc'), limit(50));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as WalletTransaction));
}

// ---- Carbon Market Data ----
export async function getCarbonMarketData(): Promise<CarbonMarketData[]> {
  const snap = await getDocs(collection(db, 'carbonMarketData'));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as CarbonMarketData));
}

export async function addCarbonMarketData(data: Omit<CarbonMarketData, 'id'>): Promise<string> {
  const ref = await addDoc(collection(db, 'carbonMarketData'), data);
  return ref.id;
}

// ---- Carbon Trades (Global Exchange) ----
export async function createCarbonTrade(trade: Omit<CarbonTrade, 'id'>): Promise<string> {
  const ref = await addDoc(collection(db, 'carbonTrades'), trade);
  return ref.id;
}

export async function getOpenCarbonTrades(): Promise<CarbonTrade[]> {
  const q = query(collection(db, 'carbonTrades'), where('status', '==', 'open'));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as CarbonTrade));
}

export async function getCarbonTradesByUser(userId: string): Promise<CarbonTrade[]> {
  const q = query(collection(db, 'carbonTrades'), where('sellerId', '==', userId));
  const snap = await getDocs(q);
  const sellerTrades = snap.docs.map((d) => ({ id: d.id, ...d.data() } as CarbonTrade));
  const q2 = query(collection(db, 'carbonTrades'), where('buyerId', '==', userId));
  const snap2 = await getDocs(q2);
  const buyerTrades = snap2.docs.map((d) => ({ id: d.id, ...d.data() } as CarbonTrade));
  return [...sellerTrades, ...buyerTrades];
}

export async function updateCarbonTrade(id: string, data: Partial<CarbonTrade>) {
  await updateDoc(doc(db, 'carbonTrades', id), data);
}

// ---- All Collections Query (Admin) ----
export async function getAllPickupRequests(): Promise<PickupRequest[]> {
  const snap = await getDocs(collection(db, 'pickupRequests'));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as PickupRequest));
}

export async function getAllEquipment(): Promise<EquipmentListing[]> {
  const snap = await getDocs(collection(db, 'equipmentListings'));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as EquipmentListing));
}

export async function getAllCarbonTrades(): Promise<CarbonTrade[]> {
  const snap = await getDocs(collection(db, 'carbonTrades'));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as CarbonTrade));
}
