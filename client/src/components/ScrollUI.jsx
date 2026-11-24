import { useEffect, useState } from 'react';
import { Icon } from './Icons.jsx';

// Thin progress bar under the header + back-to-top button.
export default function ScrollUI() {
  const [pct, setPct] = useState(0);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setPct(max > 0 ? Math.min(100, (window.scrollY / max) * 100) : 0);
      setShowTop(window.scrollY > 600);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div className="prog" style={{ width: `${pct}%` }} aria-hidden="true" />
      <button
        type="button"
        className={`totop${showTop ? ' show' : ''}`}
        aria-label="Back to top"
        tabIndex={showTop ? 0 : -1}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <Icon name="up" className="ic tti" />
      </button>
    </>
  );
}
