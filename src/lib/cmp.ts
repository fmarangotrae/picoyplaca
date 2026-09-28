export type CmpCategory = 'necessary' | 'analytics' | 'marketing';

export interface CmpDecision {
  version: 'ppc-cmp-v1';
  decidedAt: string;
  categories: Record<CmpCategory, boolean>;
  updatedAt?: string;
}

const STORAGE_KEY = 'ppc-cmp-v1';
const DECIDED_COOKIE = 'ppc-cmp-decided';
const CATEGORIES: CmpCategory[] = ['necessary', 'analytics', 'marketing'];

export const CMP_LABELS: Record<CmpCategory, { title: string; description: string; required: boolean; toggleable: boolean }> = {
  necessary: {
    title: '🍪 Necesarias',
    description: 'Siempre activas: sesiones, decisiones de consentimiento, Turnstile anti-spam, modo tema oscuro/claro.',
    required: true,
    toggleable: false
  },
  analytics: {
    title: '📊 Analítica',
    description: 'Google Analytics 4 con IP anónimo. Ayuda a medir audiencias para mejorar el contenido sin datos publicitarios.',
    required: false,
    toggleable: true
  },
  marketing: {
    title: '💸 Marketing',
    description: 'Google AdSense, Ezoic (por umbral) y banners patrocinados. Permite personalizar anuncios relevantes para ti en este y otros sitios.',
    required: false,
    toggleable: true
  }
};

export function defaultDecision(): CmpDecision {
  return {
    version: 'ppc-cmp-v1',
    decidedAt: new Date().toISOString(),
    categories: { necessary: true, analytics: false, marketing: false }
  };
}

export function readCmpDecision(): CmpDecision | null {
  if (typeof localStorage === 'undefined') return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as CmpDecision;
    if (parsed.version !== 'ppc-cmp-v1') return null;
    for (const c of CATEGORIES) if (typeof parsed.categories?.[c] !== 'boolean') return null;
    parsed.categories.necessary = true;
    return parsed;
  } catch {
    return null;
  }
}

export function writeCmpDecision(decision: CmpDecision): void {
  if (typeof localStorage === 'undefined') return;
  decision.categories.necessary = true;
  decision.updatedAt = new Date().toISOString();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(decision));
  try {
    document.cookie = `${DECIDED_COOKIE}=1; path=/; max-age=${365 * 24 * 3600}; SameSite=Lax`;
  } catch { /* ignore */ }
  window.dispatchEvent(new CustomEvent<CmpDecision>('ppc:cmp-decision', { detail: decision }));
}

export function acceptAll(): CmpDecision {
  const d = defaultDecision();
  d.categories.analytics = true;
  d.categories.marketing = true;
  writeCmpDecision(d);
  return d;
}

export function rejectAll(): CmpDecision {
  const d = defaultDecision();
  d.categories.analytics = false;
  d.categories.marketing = false;
  writeCmpDecision(d);
  return d;
}

export function isCategoryEnabled(cat: Exclude<CmpCategory, 'necessary'>, decision?: CmpDecision | null): boolean {
  const d = decision ?? readCmpDecision();
  if (!d) return false;
  return !!d.categories[cat];
}

export function hasDecided(): boolean {
  return !!readCmpDecision();
}

export function openCmpPanel(): void {
  const el = document.getElementById('ppc-cmp-banner') as HTMLElement | null;
  if (el) el.style.display = '';
  const panel = document.getElementById('ppc-cmp-panel') as HTMLElement | null;
  if (panel) {
    panel.classList.remove('hidden');
    panel.classList.add('flex');
  }
}

declare global {
  interface Window {
    __ppcCmpLoaded?: boolean;
    __ppcApplyDecision?: (d: CmpDecision) => void;
    __ppcOpenCmp?: () => void;
  }
}
