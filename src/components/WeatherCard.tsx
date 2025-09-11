import { type FC, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'

// DO NOT change prop count (requirement): keep exactly these four optional props
interface WeatherCardProps {
  city?: string;
  country?: string;
  temp?: number;       // Celsius
  feels_like?: number; // Celsius
}

export const WeatherCard: FC<WeatherCardProps> = ({
  city = "Delhi",
  country = "IN",
  temp = 34,
  feels_like = 45,
}) => {
  // derive a simple tier to influence colors / icon
  const tier = useMemo(() => {
    if (temp == null) return 'na';
    if (temp >= 35) return 'hot';
    if (temp >= 25) return 'warm';
    if (temp >= 15) return 'mild';
    if (temp >= 5) return 'cool';
    return 'cold';
  }, [temp]);

  const icon = useMemo(() => {
    const base = 'h-12 w-12 drop-shadow-sm';
    switch (tier) {
      case 'hot':
        return (
          <svg viewBox="0 0 24 24" className={cn(base, 'text-orange-500')} fill="currentColor" aria-hidden>
            <path d="M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z" />
            <path fillRule="evenodd" d="M12 1.25a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0V2A.75.75 0 0 1 12 1.25Zm0 17.5a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0V19.5a.75.75 0 0 1 .75-.75ZM4.397 4.397a.75.75 0 0 1 1.06 0l1.062 1.061a.75.75 0 0 1-1.06 1.06L4.397 5.458a.75.75 0 0 1 0-1.06Zm12.084 12.084a.75.75 0 0 1 1.06 0l1.062 1.061a.75.75 0 0 1-1.06 1.06l-1.062-1.06a.75.75 0 0 1 0-1.061ZM1.25 12a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 0 1.5H2A.75.75 0 0 1 1.25 12Zm17.5 0a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 0 1.5H19.5a.75.75 0 0 1-.75-.75ZM5.458 18.543a.75.75 0 0 1 0-1.061l1.061-1.062a.75.75 0 0 1 1.06 1.06L6.52 18.543a.75.75 0 0 1-1.06 0Zm12.084-12.084a.75.75 0 0 1 0-1.06l1.061-1.062a.75.75 0 1 1 1.06 1.06l-1.06 1.062a.75.75 0 0 1-1.061 0Z" clipRule="evenodd" />
          </svg>
        );
      case 'warm':
        return (
          <svg viewBox="0 0 24 24" className={cn(base, 'text-amber-400')} fill="currentColor" aria-hidden>
            <circle cx="12" cy="12" r="5" />
          </svg>
        );
      case 'mild':
        return (
          <svg viewBox="0 0 24 24" className={cn(base, 'text-emerald-400')} fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
            <circle cx="12" cy="12" r="5" />
          </svg>
        );
      case 'cool':
        return (
          <svg viewBox="0 0 24 24" className={cn(base, 'text-sky-400')} fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
            <path d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6 5.6 18.4" />
          </svg>
        );
      case 'cold':
        return (
          <svg viewBox="0 0 24 24" className={cn(base, 'text-blue-500')} fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
            <path d="M12 2v20m6-10H6m9 7.5L6 12l9-7.5" />
          </svg>
        );
      default:
        return (
          <svg viewBox="0 0 24 24" className={cn(base, 'text-muted-foreground')} fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
            <circle cx="12" cy="12" r="9" />
            <path d="M8 12h8" />
          </svg>
        );
    }
  }, [tier]);

  const mainTemp = temp != null ? `${Math.round(temp)}°C` : '--';
  const feels = feels_like != null ? `${Math.round(feels_like)}°C` : '--';

  return (
    <Card
      className={cn(
        'w-full h-full relative overflow-hidden group transition-all duration-500',
        'border border-border/60 hover:shadow-xl',
        'before:absolute before:inset-0 before:bg-gradient-to-br before:from-stone-50 before:via-slate-50 before:to-stone-100 dark:before:from-slate-800 dark:before:via-slate-900 dark:before:to-slate-900 before:opacity-95 before:pointer-events-none',
        'after:absolute after:inset-0 after:bg-[radial-gradient(circle_at_70%_30%,rgba(100,116,139,0.18),transparent_60%)] dark:after:bg-[radial-gradient(circle_at_70%_30%,rgba(148,163,184,0.10),transparent_60%)] after:opacity-50 group-hover:after:opacity-70 after:transition-opacity'
      )}
      aria-label={`Weather summary for ${city}${country ? ', ' + country : ''}`}
    >
      {/* subtle inner border */}
      <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-black/5 dark:ring-white/10" />
      <CardHeader className="relative z-10 pb-0 flex flex-row items-start justify-between gap-4">
        <div className="flex flex-col gap-1">
          <CardTitle className="text-lg font-semibold tracking-tight flex items-center gap-2">
            <span className="truncate max-w-[10rem]" title={city}>{city}</span>
            <span className="text-muted-foreground text-xs font-medium">{country}</span>
          </CardTitle>
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider font-medium text-muted-foreground">
            <span className={cn('inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/5 dark:bg-white/10 backdrop-blur-sm',
              tier === 'hot' && 'text-amber-700 dark:text-amber-300',
              tier === 'warm' && 'text-amber-600 dark:text-amber-300',
              tier === 'mild' && 'text-emerald-600 dark:text-emerald-300',
              tier === 'cool' && 'text-slate-600 dark:text-slate-300',
              tier === 'cold' && 'text-sky-600 dark:text-sky-300'
            )}>
              <span className="h-1.5 w-1.5 rounded-full bg-current animate-pulse" />
              {tier}
            </span>
          </div>
        </div>
        <div className="relative shrink-0">
          <div className="absolute inset-0 blur-xl rounded-full opacity-60 bg-gradient-to-br from-white/60 to-transparent dark:from-white/10" />
          {icon}
        </div>
      </CardHeader>
      <CardContent className="relative z-10 mt-4">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="text-5xl font-semibold leading-none tracking-tight bg-clip-text text-transparent bg-gradient-to-br from-slate-700 via-slate-600 to-slate-500 dark:from-slate-200 dark:via-slate-300 dark:to-slate-400 drop-shadow-sm">
                <span className="bg-clip-text text-transparent bg-gradient-to-br from-slate-700 via-slate-600 to-slate-500 dark:from-slate-200 dark:via-slate-300 dark:to-slate-400">{mainTemp}</span>
              </div>
            </div>
            <div className="flex flex-col gap-1 text-xs uppercase tracking-wider text-muted-foreground">
              <span className="font-medium">Feels like <span className="text-foreground text-sm font-semibold ml-1">{feels}</span></span>
              <span className="font-medium">Delta <span className="font-semibold ml-1">{(temp!=null && feels_like!=null) ? `${Math.round(feels_like - temp)}°` : '--'}</span></span>
            </div>
          </div>
          <div className="flex gap-2 items-center text-[11px] text-muted-foreground">
            <span className="hidden sm:inline">Updated just now</span>
            <button
              type="button"
              className="relative overflow-hidden rounded-md px-3 py-1 font-medium text-[11px] tracking-wide bg-slate-800 text-slate-50 dark:bg-slate-200 dark:text-slate-900 shadow-sm hover:shadow transition-colors active:scale-[0.97] focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 dark:focus-visible:ring-slate-300"
              aria-label="Refresh weather"
            >
              Refresh
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}