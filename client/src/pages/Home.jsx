import { Link } from 'react-router-dom';
import { HOME, SEO, SITE } from '../data/content.js';
import useJsonLd from '../hooks/useJsonLd.js';
import useSeo from '../hooks/useSeo.js';
import useReveal from '../hooks/useReveal.js';
import { Icon } from '../components/Icons.jsx';
import { Band, CardGrid, Eyebrow, StatValue } from '../components/Sections.jsx';

export default function Home() {
  useSeo(SEO.home);
  useReveal();
  useJsonLd('org', {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE.name,
    url: SITE.url,
    logo: `${SITE.url}/favicon.svg`,
    email: SITE.email,
    telephone: SITE.phone,
    address: { '@type': 'PostalAddress', addressLocality: 'Kolkata', addressCountry: 'IN' },
  });
  const { hero, stats, flow, what, why, band } = HOME;

  return (
    <>
      <div className="hero">
        <div className="w g">
          <div>
            <Eyebrow>{hero.eyebrow}</Eyebrow>
            <h1>{hero.title}</h1>
            <p>{hero.text}</p>
            <Link className="btn" to={hero.primary.to}>{hero.primary.label}</Link>
            <Link className="btn o" to={hero.secondary.to}>{hero.secondary.label}</Link>
          </div>
          <div className="panel">
            <h3>{hero.panelTitle}</h3>
            <ul>
              {hero.checklist.map(([label, state]) => (
                <li key={label}>
                  <span>{label}</span>
                  <span>{state}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="stats">
        <div className="w">
          {stats.map((s) => (
            <div key={s.label}>
              <StatValue value={s.value} />
              <span>{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      <section>
        <div className="w">
          <Eyebrow>{flow.eyebrow}</Eyebrow>
          <h2>{flow.title}</h2>
          <div className="flow">
            {flow.steps.map((s, i) => (
              <FlowItem key={s.title} step={s} arrow={i < flow.steps.length - 1} />
            ))}
          </div>
        </div>
      </section>

      <section className="alt">
        <div className="w">
          <Eyebrow>{what.eyebrow}</Eyebrow>
          <h2>{what.title}</h2>
          <p className="lead">{what.lead}</p>
          <CardGrid cards={what.cards} />
          <p style={{ marginTop: 24 }}>
            <Link to={what.link.to} style={{ color: 'var(--acc)', fontWeight: 600 }}>{what.link.label}</Link>
          </p>
        </div>
      </section>

      <section>
        <div className="w">
          <Eyebrow>{why.eyebrow}</Eyebrow>
          <h2>{why.title}</h2>
          <CardGrid cards={why.cards} style={{ marginTop: 28 }} />
        </div>
      </section>

      <Band headings={band.headings} cta={band.cta} />
    </>
  );
}

function FlowItem({ step, arrow }) {
  return (
    <>
      <div data-reveal>
        <Icon name={step.icon} className="ic big" />
        <h3>{step.title}</h3>
        <p>{step.text}</p>
      </div>
      {arrow && <span className="ar" aria-hidden="true">→</span>}
    </>
  );
}
