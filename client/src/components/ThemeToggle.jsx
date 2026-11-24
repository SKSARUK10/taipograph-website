import { useEffect, useState } from 'react';
import { Icon } from './Icons.jsx';

const prefersDark = () =>
  typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

function currentTheme() {
  const attr = document.documentElement.getAttribute('data-theme');
  return attr === 'dark' || attr === 'light' ? attr : prefersDark() ? 'dark' : 'light';
}

// Extra: manual light/dark switch. Defaults to the visitor's OS setting (as the original did).
export default function ThemeToggle() {
  const [theme, setTheme] = useState(currentTheme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    try {
      localStorage.setItem('tp-theme', next);
    } catch {
      /* storage unavailable: theme still applies for this visit */
    }
  };

  return (
    <button type="button" className="tt" onClick={toggle} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`} title="Toggle theme">
      <Icon name={theme === 'dark' ? 'sun' : 'moon'} className="ic tti" />
    </button>
  );
}
