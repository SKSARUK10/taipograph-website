import { Link } from 'react-router-dom';
import { PORTFOLIO, SEO } from '../data/content.js';
import useSeo from '../hooks/useSeo.js';
import useReveal from '../hooks/useReveal.js';
import { CardGrid, Eyebrow, PageHeader } from '../components/Sections.jsx';

export default function Portfolio() {
  useSeo(SEO.portfolio);
  useReveal();
  const { header, experience, cases } = PORTFOLIO;

  return (
    <>
      <PageHeader {...header} />
      <section>
        <div className="w">
          <Eyebrow>{experience.eyebrow}</Eyebrow>
          <h2>{experience.title}</h2>
          <CardGrid cards={experience.cards} style={{ marginTop: 28 }} />
        </div>
      </section>
      <section className="alt">
        <div className="w">
          <Eyebrow>{cases.eyebrow}</Eyebrow>
          <h2>{cases.title}</h2>
          <p className="lead">{cases.lead}</p>
          <Link className="btn" to={cases.cta.to}>{cases.cta.label}</Link>
        </div>
      </section>
    </>
  );
}
