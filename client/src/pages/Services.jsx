import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { SERVICES, SEO } from '../data/content.js';
import useJsonLd from '../hooks/useJsonLd.js';
import useSeo from '../hooks/useSeo.js';
import useReveal from '../hooks/useReveal.js';
import { CardGrid, Eyebrow, PageHeader } from '../components/Sections.jsx';

export default function Services() {
  useSeo(SEO.services);
  useReveal();
  const { prepress, production, faq } = SERVICES;
  const faqRef = useRef(null);
  const setAll = (open) => faqRef.current && faqRef.current.querySelectorAll('details').forEach((d) => { d.open = open; });

  useJsonLd('faq', {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.items.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  });

  return (
    <>
      <nav className="subnav" aria-label="On this page">
        <div className="w">
          <Link to="#prepress">Prepress &amp; Premedia</Link>
          <Link to="#production">Packaging Design &amp; Production</Link>
          <Link to="#faq">FAQ</Link>
        </div>
      </nav>
      <PageHeader id="prepress" {...prepress.header} />
      <section>
        <div className="w">
          <CardGrid cards={prepress.cards} />
        </div>
      </section>

      <PageHeader id="production" {...production.header} />
      <section>
        <div className="w">
          <CardGrid cards={production.cards} />
        </div>
      </section>

      <section id="faq">
        <div className="w">
          <Eyebrow>{faq.eyebrow}</Eyebrow>
          <h2>{faq.title}</h2>
          <div className="faqbar"><button type="button" className="lnk" onClick={() => setAll(true)}>Expand all</button><button type="button" className="lnk" onClick={() => setAll(false)}>Collapse all</button></div>
          <div className="faq" ref={faqRef} style={{ maxWidth: 760, marginTop: 8 }}>
            {faq.items.map((f) => (
              <details key={f.q}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
