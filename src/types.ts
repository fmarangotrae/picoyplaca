export interface TimeWindow {
  start: string;
  end: string;
}

export type WeekdayNum = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export type VehicleKind =
  | 'carro'
  | 'moto'
  | 'taxi'
  | 'carga'
  | 'publico'
  | 'escolar'
  | 'emergencia'
  | 'electricos';

export type RestrictionMode = 'par-impar' | 'digits-per-weekday' | 'holidays-only' | 'none';

export interface WeekdayDigitMap {
  [weekday: number]: number[];
}

export interface VehiclePolicy {
  vehicle: VehicleKind;
  exempt?: boolean;
  note?: string;
  timeWindows?: TimeWindow[];
  digitSource?: 'last-digit' | 'first-digit';
  mode?: RestrictionMode;
  weekdayDigits?: WeekdayDigitMap;
}

export interface HolidayEntry {
  date: string; // YYYY-MM-DD
  name: string;
}

export interface SpecialEvent {
  id: string;
  title: string;
  startDate: string;
  endDate?: string;
  description: string;
  vehiclePolicies?: VehiclePolicy[];
  citySlugs?: string[];
  sourceUrl?: string;
}

export interface RotationPeriod {
  id: string;
  label: string;
  startDate: string; // YYYY-MM-DD
  endDate: string;   // YYYY-MM-DD
  baseWeekdayDigits: WeekdayDigitMap; // sin aplicar shift
  shiftOffset: number; // 0-6
  weekdayFilter: WeekdayNum[]; // e.g. lunes-viernes [1,2,3,4,5]
  appliesToKinds: VehicleKind[];
}

export interface CityConfig {
  slug: string;
  name: string;
  department: string;
  region: string;
  lat: number;
  lng: number;
  timezone: string;
  modes: {
    default: RestrictionMode;
    perKind?: Partial<Record<VehicleKind, RestrictionMode>>;
  };
  timeWindows: {
    default: TimeWindow[];
    perKind?: Partial<Record<VehicleKind, TimeWindow[]>>;
  };
  holidayExempt: boolean;
  weekendExempt: boolean;
  exemptions: VehicleKind[];
  digitSources: Partial<Record<VehicleKind, 'last-digit' | 'first-digit'>>;
  rotations: RotationPeriod[];
  specialEvents?: string[];
  customRestrictions?: Record<string, unknown>;
  sourceUrls: string[];
  lastUpdated: string; // ISO date
}

export interface RestrictionResult {
  city: CityConfig;
  date: string;
  weekday: WeekdayNum;
  isHoliday: boolean;
  holiday?: HolidayEntry;
  isWeekend: boolean;
  effectiveMode: RestrictionMode;
  perVehicle: Record<VehicleKind, {
    canCirculate: boolean;
    restrictedDigits?: number[];
    note?: string;
    timeWindows?: TimeWindow[];
    exempt: boolean;
    shiftOffset: number;
  }>;
  specialEvents: SpecialEvent[];
  warnings: string[];
}

export interface PlateCheckResult {
  plate: string;
  kind: VehicleKind;
  city: CityConfig;
  date: string;
  time?: string;
  digitUsed: number;
  restrictedDigit: boolean;
  restrictedDay: boolean;
  restrictedTime: boolean;
  canCirculateNow: boolean;
  canCirculateFullDay: boolean;
  fineAmount: string;
  fineUvb: number;
  recommendations: string[];
}

export interface RecommendationCard {
  kind: VehicleKind;
  title: string;
  subtitle: string;
  color: 'green' | 'yellow' | 'red';
  lines: string[];
}

export type AdSlotSize =
  | 'leaderboard-728x90'
  | 'medium-rectangle-300x250'
  | 'large-rectangle-336x280'
  | 'half-page-300x600'
  | 'mobile-leaderboard-320x50'
  | 'auto-fluid';

export interface AdSlotConfig {
  id: string;
  slotId: string;         // AdSense data-ad-slot
  sizes: AdSlotSize[];
  sticky?: boolean;
  lazy?: boolean;
  pathPatterns: string[]; // rutas donde debe aparecer
  enabled: boolean;
}

export interface BannerSponsor {
  id: string;
  name: string;
  text: string;
  cta: string;
  href: string;
  utmCampaign: string;
  imageUrl?: string;
  startDate: string;
  endDate: string;
  pathPatterns: string[];
  enabled: boolean;
  position: 'top-hero' | 'side' | 'inline' | 'footer';
}

export interface BlogPostSummary {
  slug: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  publishedAt: string;
  modifiedAt?: string;
  cover?: string;
  author: string;
}

export interface ComparisonItem {
  slug: string;
  name: string;
  description: string;
  logo?: string;
  price: string;
  rating: number;
  pros: string[];
  cons: string[];
  affiliateUrl: string;
  badge?: string;
}

export interface ProLead {
  id?: number;
  company: string;
  contactName: string;
  email: string;
  phone: string;
  fleetSize: string;
  cities: string[];
  message?: string;
  createdAt?: string;
  source: string;
  consent: boolean;
}
