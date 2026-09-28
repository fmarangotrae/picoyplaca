import { useMemo, useState } from 'react';
import { CITIES, ALL_KINDS } from '@data/cities';
import type { CityConfig, VehicleKind } from '@types';
import {
  checkPlate,
  formatDateISO,
  parseDate
} from '@lib/pico';
import type { PlateCheckResultSummary } from '@lib/pico';

function cityLabel(c: CityConfig) {
  return `${c.name} · ${c.department}`;
}

function kindLabel(k: VehicleKind) {
  return {
    carro: '🚗 Carro particular',
    moto: '🏍️ Moto',
    taxi: '🚕 Taxi',
    carga: '🚛 Carga',
    publico: '🚌 Transporte público',
    escolar: '🚐 Escolar',
    emergencia: '🚑 Emergencia',
    electricos: '⚡ Eléctrico / 0 emisiones'
  }[k];
}

function todayISO() {
  return formatDateISO(new Date());
}

function currentTime24() {
  const d = new Date();
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
}

export default function PlateCheckerIsland() {
  const cities = CITIES as CityConfig[];
  const [citySlug, setCitySlug] = useState<string>(cities[0].slug);
  const [plate, setPlate] = useState<string>('ABC123');
  const [kind, setKind] = useState<VehicleKind>('carro');
  const [dateISO, setDateISO] = useState<string>(todayISO());
  const [time, setTime] = useState<string>(currentTime24());

  const result: PlateCheckResultSummary | null = useMemo(() => {
    const city = cities.find(c => c.slug === citySlug);
    if (!city) return null;
    if (!plate || plate.length < 3) return null;
    try {
      void parseDate(dateISO);
      return checkPlate({ city, dateISO, plate: plate.toUpperCase(), kind, time24: time });
    } catch {
      return null;
    }
  }, [citySlug, plate, kind, dateISO, time, cities]);

  const bannerClass = result
    ? result.canCirculateNow
      ? 'border-success-500/30 bg-success-50 text-success-800'
      : 'border-danger-500/40 bg-danger-50 text-danger-800'
    : 'border-slate-200 bg-slate-50 text-slate-700';

  return (
    <div id="verificador" className="card bg-white p-5 md:p-6 scroll-mt-24">
      <header className="mb-5 flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="badge bg-brand-50 text-brand-700 ring-1 ring-inset ring-brand-500/20">
            🔎 Verificador instantáneo
          </span>
          <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900">
            ¿Puedo circular HOY con mi placa?
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            Información oficial actualizada al {todayISO()}. Solo de referencia.
          </p>
        </div>
      </header>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <label className="flex flex-col gap-1 text-sm text-slate-700 lg:col-span-1">
          <span className="font-medium">Ciudad</span>
          <select
            className="input"
            value={citySlug}
            onChange={e => setCitySlug(e.target.value)}
            aria-label="Seleccionar ciudad"
          >
            {cities.map(c => (
              <option key={c.slug} value={c.slug}>
                {cityLabel(c)}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1 text-sm text-slate-700 lg:col-span-1">
          <span className="font-medium">Tipo de vehículo</span>
          <select
            className="input"
            value={kind}
            onChange={e => setKind(e.target.value as VehicleKind)}
            aria-label="Seleccionar tipo vehículo"
          >
            {ALL_KINDS.map(k => (
              <option key={k} value={k}>
                {kindLabel(k)}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1 text-sm text-slate-700 lg:col-span-1">
          <span className="font-medium">Placa</span>
          <input
            className="input font-mono uppercase tracking-widest"
            value={plate}
            onChange={e => setPlate(e.target.value)}
            placeholder="ABC123"
            maxLength={8}
            aria-label="Placa del vehículo"
          />
        </label>

        <label className="flex flex-col gap-1 text-sm text-slate-700 lg:col-span-1">
          <span className="font-medium">Fecha</span>
          <input
            type="date"
            className="input"
            value={dateISO}
            onChange={e => setDateISO(e.target.value)}
            aria-label="Fecha a consultar"
          />
        </label>

        <label className="flex flex-col gap-1 text-sm text-slate-700 lg:col-span-1">
          <span className="font-medium">Hora</span>
          <input
            type="time"
            className="input"
            value={time}
            onChange={e => setTime(e.target.value)}
            aria-label="Hora a consultar"
          />
        </label>
      </div>

      <div className={`mt-6 rounded-2xl border p-5 ring-1 ring-inset ${bannerClass}`} role="status" aria-live="polite">
        {!result && (
          <p className="text-sm">Escribe una placa válida para ver el resultado.</p>
        )}
        {result && (
          <div className="grid gap-5 md:grid-cols-[auto,1fr] md:items-start">
            <div className="text-left">
              <div className="text-5xl" aria-hidden="true">
                {result.canCirculateNow ? '✅' : '⛔'}
              </div>
            </div>
            <div>
              <h3 className="text-xl font-extrabold">
                {result.canCirculateNow
                  ? 'SÍ puedes circular en este momento'
                  : 'NO puedes circular en este momento'}
              </h3>
              <p className="mt-1 text-sm opacity-90">
                Placa <span className="font-mono font-semibold">{plate.toUpperCase()}</span> ·{' '}
                {kindLabel(result.kind)} · {result.dateISO ? '' : ''}
                fecha {dateISO} a las {time}.
              </p>
              <dl className="mt-4 grid grid-cols-2 gap-4 text-sm md:grid-cols-4">
                <div>
                  <dt className="opacity-80">Dígito utilizado</dt>
                  <dd className="font-bold tabular-nums">{result.digit === -1 ? '—' : result.digit}</dd>
                </div>
                <div>
                  <dt className="opacity-80">Restringe dígito</dt>
                  <dd className="font-semibold">{result.restrictedDigitMatch ? 'SÍ' : 'No'}</dd>
                </div>
                <div>
                  <dt className="opacity-80">Horario</dt>
                  <dd className="font-semibold">
                    {result.timeWindows.map(w => `${w.start}-${w.end}`).join(', ') || '—'}
                  </dd>
                </div>
                <div>
                  <dt className="opacity-80">Multa (2026)</dt>
                  <dd className="font-bold">{result.fineAmount}</dd>
                </div>
              </dl>
              {result.recommendations.length > 0 && (
                <ul className="mt-4 list-inside list-disc space-y-1 text-sm">
                  {result.recommendations.map((r, i) => <li key={i}>{r}</li>)}
                </ul>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
