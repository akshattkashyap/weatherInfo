import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = 'wi:dark';

export function useDarkMode() {
  const [isDark, setIsDark] = useState<boolean>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === 'true') return true;
      if (stored === 'false') return false;
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch {
      return false;
    }
  });

  // Apply class to root
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) root.classList.add('dark');
    else root.classList.remove('dark');
    try { localStorage.setItem(STORAGE_KEY, String(isDark)); } catch {}
  }, [isDark]);

  // Sync with system changes if user hasn't explicitly chosen (only initial load scenario)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const listener = (e: MediaQueryListEvent) => {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored === null) setIsDark(e.matches);
      } catch {}
    };
    mq.addEventListener('change', listener);
    return () => mq.removeEventListener('change', listener);
  }, []);

  const toggle = useCallback(() => setIsDark(d => !d), []);

  return { isDark, toggle };
}
