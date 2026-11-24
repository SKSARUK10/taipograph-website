import { useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from './Icons.jsx';

export function PageHeader({ eyebrow, title, text, children, id }) {
  return (
    <div className="ph" id={id}>
      <div className="w">
        <div className="eye">{eyebrow}</div>
        {children || <h1>{title}</h1>}
        <p>{text}</p>
      </div>
    </div>
  );
}

export function Eyebrow({ children }) {
  return <div className="eye">{children}</div>;
}

export function CardGrid({ cards, style }) {
  return (
    <div className="grid" style={style}>
      {cards.map((c) => (
        <div className="card" key={c.title} data-reveal>
          {c.icon && <Icon name={c.icon} />}
          {c.num && <div className="num">{c.num}</div>}
          <h3>{c.title}</h3>
          <p>{c.text}</p>
        </div>
      ))}
    </div>
  );
}

export function Steps({ steps }) {
  return (
    <div className="steps">
      {steps.map((s, i) => (
        <div key={s.title} data-reveal>
          <Icon name={s.icon} />
          <b>{i + 1}</b>
          <h4>{s.title}</h4>
          <p>{s.text}</p>
        </div>
      ))}
    </div>
  );
}

export function Band({ headings, cta }) {
  return (
    <div className="band">
      <div className="w">
        {headings.map((h) => (
          <h2 key={h}>{h}</h2>
        ))}
        <Link className="btn" to={cta.to}>{cta.label}</Link>
      </div>
    </div>
  );
}

/* Count-up for plain numbers ("4", "100%"); other values ("13–30", "Overnight") show as-is.
   The markup always contains the final value (good for crawlers / no-JS); the animation
   resets to 0 just before first paint and counts up when the stat scrolls into view. */
export function StatValue({ value }) {
  const m = /^(\d+)(%?)$/.exec(value);
  const [shown, setShown] = useState(m ? Number(m[1]) : null);
  const ref = useRef(null);

  useLayoutEffect(() => {
    if (!m) return undefined;
    const target = Number(m[1]);
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || !('IntersectionObserver' in window)) return undefined;

    setShown(0);
    let raf;
    const io = new IntersectionObserver(([en]) => {
      if (!en.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const step = (t) => {
        const p = Math.min((t - start) / 900, 1);
        setShown(Math.round(target * (1 - Math.pow(1 - p, 3))));
        if (p < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    }, { threshold: 0.6 });
    if (ref.current) io.observe(ref.current);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      setShown(target);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return <b ref={ref}>{m ? `${shown}${m[2]}` : value}</b>;
}
